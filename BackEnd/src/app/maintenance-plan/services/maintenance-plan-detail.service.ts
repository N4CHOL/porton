import { IMaintenancePlanDetail, MaintenancePlanDetail } from "../models/maintenance-plan-detail.model";
import * as profileService from '../../profile/services/profile.service';
import * as assetService from '../../assets/services/asset.service';
import * as woStateService from '../../maintenance-plan/services/wostate.service';
import * as worService from '../../assets/services/observation.service';
import { Profile } from "../../profile/models/profile.model";
import { Asset } from "../../assets/models/asset.model";
import { WOState } from "../models/wostate.model";
import { Activity, IActivity } from "../../activities/models/activity.model";
import { Task } from "../../activities/models/task.model";
//import { ActivityTemplate } from "../../activitiesTemplates/models/activityTemplate.model";
import { ActState } from "../../activities/models/actstate.model";
import { Op, Sequelize } from "sequelize";
import { User } from "../../user/models/user.model";
import { Priority } from "../../shared/classes/priority.model";
import { SuspensionReason } from "../../activities/models/suspensionReason.model";
import * as activitySrv from "../../activities/services/activities.service";
// import * as WOStateService from '../../maintenance-plan/services/wostate.service';
import { Composite } from "../../assets/models/composite.model";
import { Category } from "../../shared/models/category.model";
import { DaysOfWeek, IDaysOfWeek } from "../../shared/classes/daysOfWeek.model";
import { MaintenancePlanDetailDaysOfWeek } from "../../shared/classes/MaintenancePlanDetailDaysOfWeek.model";
import e, { Request, Response } from 'express';
import * as daysOfWeekService from '../../shared/services/daysOfWeek.service';
import { log } from "console";







export const saveMaintenancePlanDetail = async (maintenancePlan: IMaintenancePlanDetail, worId?: string): Promise<MaintenancePlanDetail> => {

    const manPlanD: MaintenancePlanDetail = new MaintenancePlanDetail({ ...maintenancePlan });
    await manPlanD.save()
    const arrayCategories: Category[] = [];


    try {

        //Asignarle el Encargado.
        if (!maintenancePlan.asignee) throw 'No hay asignado';
        if (!maintenancePlan.asignee.user) throw 'No hay usuario';
        if (!maintenancePlan.asignee.user.userId) throw 'El usuario no tiene ID';
        const asignee: Profile | null = await profileService.findProfileByUserId(maintenancePlan.asignee.user.userId);
        if (!asignee) throw 'El usuario no existe';

        //Asignarle el estado.
        let estado: WOState | null = null
        if (maintenancePlan.state) {
            if (!maintenancePlan.state.wostateId) throw 'No hay estado';
            estado = await woStateService.findStateById(maintenancePlan.state.wostateId);
            console.log("-----------------------------", estado)
            if (!estado) throw 'El estado no existe';
        }


        //Asignarle el Asset
        // let asset: Asset | null = null;
        // if (maintenancePlan.asset) {
        //     if (!maintenancePlan.asset.assetId) throw 'El activo no tiene ID'
        //     const asset: Asset | null = await assetService.getAsset(maintenancePlan.asset.assetId);
        //     if (!asset) throw 'El activo no existe';
        // }


        //Asignarle Prioridad
        if (!maintenancePlan.priority) throw 'No hay prioridad';
        const priority: Priority | null = await Priority.findByPk(maintenancePlan.priority.priorityId);
        if (!priority) throw 'La prioridad no existe';

        //Asignar dia de la semana
        if (maintenancePlan.daysOfWeek) {
            maintenancePlan.daysOfWeek.map(async (element: IDaysOfWeek, index) => {
               // console.log("foreach", element);

                const day_element: DaysOfWeek | null = await DaysOfWeek.findByPk(element.daysOfWeekId)
               // console.log(day_element);

                if (!day_element) throw 'No se encontró el día de la semana';

                const mpdxdof: MaintenancePlanDetailDaysOfWeek = await new MaintenancePlanDetailDaysOfWeek({
                    daysOfWeekFk: day_element.daysOfWeekId,
                    maintenancePlanDetailFk: manPlanD.maintenancePlanDetailId
                });
                mpdxdof.daysOfWeek = day_element;
                mpdxdof.maintenancePlanDetail = manPlanD;
                await mpdxdof.save()
            });
        }


        //Asignarle Categorías
        maintenancePlan.categories?.forEach(async (element: Category, index) => {
            const categ: Category | null = await Category.findByPk(element.categoryId)
            if (!categ) throw 'No se encontró la categoría';
            arrayCategories.push(categ);
        });

        //Guardar Actividades

        const activitiesPromises: Promise<Activity>[] = [];
        let activities: Activity[] = [];
        maintenancePlan.activities.forEach(
            async (activity: IActivity) => {
                activitiesPromises.push(activitySrv.saveActivity(activity))
            }
        );
        activities = await Promise.all(activitiesPromises);

        //TODO: AWAIT SIEMPRE SE USA PARA PROMESAS ENCADENADAS

        let manPlanDS: MaintenancePlanDetail = await manPlanD.save();
        await manPlanDS.$set<Profile>('asignee', asignee);
        // if (asset) await manPlanDS.$set<Asset>('asset', asset);
        await manPlanDS.$set<Priority>('priority', priority);
        await manPlanDS.$set<Activity>("activities", activities);
        await manPlanDS.$add<Category>('categories', arrayCategories);
        //Asignarle Estado
        if (estado) {
            await manPlanDS.$set<WOState>('state', estado);
        } else {
            const state: WOState | null = await woStateService.findState('generada');
            if (!state) throw 'No hay estado generada'
            await woStateService.StateNewWorkOrder(manPlanDS);

            //Cambiar el estado de la orden de trabajo a "Pendiente Realizacion"
            woStateService.StateAsignatedWorkOrder(manPlanDS);

            //Si el origen es una solicitud de OT, cambiar el estado a "Promovida"
            if (worId) {
                worService.promoteWOR(worId)
            }
        }

        await manPlanDS.save();
        return manPlanDS;

    } catch (e) {

        return Promise.reject(e);
    }

}

export const getMaintenancePlanDetail = async (maintenancePlanId: number): Promise<MaintenancePlanDetail | null> => {
    try {
        return MaintenancePlanDetail.findByPk(maintenancePlanId, {
            plain: true,
            include: [
                {
                    model: Activity,
                    attributes: ['activityId', 'name', "description",/* Agrega otras columnas necesarias */],
                    include: [{ model: Profile }, { model: Task }, { model: Composite }, { model: Asset }]
                },
                {
                    model: DaysOfWeek,
                },
                { model: Priority },
                { model: Category }
            ]
        });
    } catch (e) {
        //console.log(e)
        return Promise.reject(e);
    }
}

export const getMaintenancePlanDetails = async (): Promise<MaintenancePlanDetail[]> => {
    try {
        return MaintenancePlanDetail.findAll({
            include: [
                {
                    model: Activity,
                    attributes: ['activityId', 'name', "description",/* Agrega otras columnas necesarias */],
                    include: [{ model: Asset }]
                },
                { model: Profile },
                { model: WOState },
                { model: Priority }
            ]
        });
    } catch (e) {

        return Promise.reject(e);
    }
}

export const getActiveMaintenancePlanDetails = async (): Promise<MaintenancePlanDetail[]> => {
    try {
        return MaintenancePlanDetail.findAll({
            include: [
                { model: Asset },
                { model: Profile },
                { model: Priority },
                { model: DaysOfWeek
                },
                {
                    required: true,
                    model: WOState,
                    where: Sequelize.or(
                        { name: 'GENERADA' },
                        { name: 'PENDIENTE ASIGNACION' },
                        { name: 'PENDIENTE REALIZACION' },
                        { name: 'EN PROCESO' },
                        { name: 'LISTO' },
                        { name: 'SUSPENDIDA' },
                        { name: 'DEMORADA' }
                    )
                }
            ]
        });
    } catch (e) {

        return Promise.reject(e);
    }
}

export const editMaintenancePlanDetail = async (mpId: number, maintenancePlanDetail: IMaintenancePlanDetail): Promise<MaintenancePlanDetail> => {
    try {
        const mainPlanD: MaintenancePlanDetail | null = await getMaintenancePlanDetail(mpId);
        const newArrayCategories: Category[] = [];
        if (!mainPlanD) throw 'No existe Orden de Trabajo';
        if (!maintenancePlanDetail.asignee || !maintenancePlanDetail.asignee.profileId) throw 'No existe el id del perfil del asignado';
        if (!maintenancePlanDetail.priority || !maintenancePlanDetail.priority.priorityId) throw 'No existe la prioridad de la orden de trabajo.'


        // Verificar si existe el asignado
        const newAsignee: Profile | null = await Profile.findByPk(maintenancePlanDetail.asignee.profileId);
        if (!newAsignee) throw 'No existe el perfil del asignado';

        // Verificar si existe la prioridad
        const newPriority: Priority | null = await Priority.findByPk(maintenancePlanDetail.priority.priorityId);
        if (!newPriority) throw 'No existe la prioridad';

        // Categorías

        maintenancePlanDetail.categories?.forEach(async (element: Category, index: number) => {
            const categ: Category | null = await Category.findByPk(element.categoryId);
            if (!categ) throw 'No se encontró la categoría';
            newArrayCategories.push(categ);
        });



        //Editar días de la semana
        try {
            if (maintenancePlanDetail.daysOfWeek) {

                MaintenancePlanDetailDaysOfWeek.destroy({
                    where: {
                        maintenancePlanDetailFk: mainPlanD.maintenancePlanDetailId
                    }
                })
                    .then((rowsDeleted) => {
                       // console.log(`${rowsDeleted} registros eliminados.`);
                    })
                    .catch((error) => {
                      //  console.error('Error al eliminar los registros:', error);
                    });



                maintenancePlanDetail.daysOfWeek.map(async (element: IDaysOfWeek, index) => {
                   // console.log("foreach", element);

                    const day_element: DaysOfWeek | null = await DaysOfWeek.findByPk(element.daysOfWeekId)
                  //  console.log(day_element);

                    if (!day_element) throw 'No se encontró el día de la semana';

                    const mpdxdof: MaintenancePlanDetailDaysOfWeek = await new MaintenancePlanDetailDaysOfWeek({
                        daysOfWeekFk: day_element.daysOfWeekId,
                        maintenancePlanDetailFk: mainPlanD.maintenancePlanDetailId
                    });
                    mpdxdof.daysOfWeek = day_element;
                    mpdxdof.maintenancePlanDetail = mainPlanD;
                    await mpdxdof.save()
                });

            };
        } catch (e) {
           // console.log(e)
        }




        mainPlanD.update(maintenancePlanDetail);


        // Cambiar Asignado
        await mainPlanD.$set<Profile>('asignee', newAsignee);

        //Cambiar Prioridad
        await mainPlanD.$set<Priority>('priority', newPriority);
        // woStateService.StateAsignatedWorkOrder(mainPlanD);

        //Cambiar Categorías
        await mainPlanD.$set<Category>('categories', newArrayCategories);

        //Cambiar activity
        const activities: IActivity[] = maintenancePlanDetail.activities;

        const arrayActivities: Activity[] = [];
        const arrayPromise: Promise<Activity | null>[] = [];

        activities.forEach(async (activity) => {
            arrayPromise.push(new Promise<Activity | null>((resolve, reject) => {
                if (!activity.activityId) {

                    const activitySaved: Promise<Activity | null> = activitySrv.saveActivity(activity);
                    if (!activitySaved) throw 'No se pudo guardar la actividad';
                    activitySaved.then((value: Activity | null) => {
                        if (!value) throw 'null';
                        arrayActivities.push(value);
                        resolve(activitySaved);
                    }, err => {
                        reject(err);
                    });
                } else {

                    const activityEdited: Promise<Activity | null> = activitySrv.editActivity(activity.activityId, activity);
                    if (!activityEdited) throw 'No se pudo editar la actividad';
                    activityEdited.then((value: Activity | null) => {
                        if (!value) throw 'null';
                        arrayActivities.push(value);
                        resolve(activityEdited);
                    }, err => {
                        reject(err);
                    });
                }
            }))
        });
        await Promise.all(arrayPromise).then(async () => {

            await mainPlanD.$set<Activity>('activities', arrayActivities);
        })
        const editedMainPlanD = await mainPlanD.save();
        if (mainPlanD.state === null) {

            await woStateService.StatePendingWorkOrder(editedMainPlanD);
            await woStateService.StateAsignatedWorkOrder(editedMainPlanD);
        }



        return editedMainPlanD
    } catch (e) {
        return Promise.reject(e);
    }
}


export const endMaintenancePlanDetail = async (mpdId: string): Promise<MaintenancePlanDetail> => {
    try {
        //   let workOrder: MaintenancePlanDetail | null = await getMaintenancePlanDetail(Number(mpdId));
        let workOrder: MaintenancePlanDetail | null = await getOneMaintenancePlanDetailsWithActivities(mpdId);
        if (!workOrder) throw 'No existe la Work Order';
        // Asignarle Estado
        await woStateService.StateFinishedWorkOrder(workOrder);

        return workOrder.save();
    } catch (e) {
        return Promise.reject(e);
    }
}

export const cancelMaintenancePlanDetail = async (mpdId: string): Promise<MaintenancePlanDetail> => {
    try {
        //   let workOrder: MaintenancePlanDetail | null = await getMaintenancePlanDetail(Number(mpdId));
        let workOrder: MaintenancePlanDetail | null = await getOneMaintenancePlanDetailsWithActivities(mpdId);
        if (!workOrder) throw 'No existe la Work Order';
        // Asignarle Estado
        await woStateService.StateCancelWorkOrder(workOrder);

        return workOrder.save();
    } catch (e) {
        return Promise.reject(e);
    }
}

export const deleteMaintenancePlanDetail = async (maintenancePlanDetailId: number): Promise<MaintenancePlanDetail> => {
    try {
        const mainPlanD: MaintenancePlanDetail | null = await getMaintenancePlanDetail(maintenancePlanDetailId);
        if (!mainPlanD) throw 'No existe Orden de Trabajo';
        // Asignarle Estado
        const state: WOState | null = await woStateService.findState('cancelada');
        if (!state) throw 'No hay estado cancelada'
        await mainPlanD.$set<WOState>('state', state);

        return mainPlanD;
    } catch (e) {
        return Promise.reject(e);
    }
}

export const getMaintenancePlanDetailsByProfile = async (
    userId: string,

): Promise<MaintenancePlanDetail[]> => {
    try {
        let today: Date = new Date();
        return MaintenancePlanDetail.findAll({
            where: {
                dateHourSchedueled: {

                    // getTime() - (<cant. dias> * <24 horas> * <60 minutos> * <60 segundos> * <1000 milisegundos>) 
                    [Op.between]: [(today.getTime() - (30 * 24 * 60 * 60 * 1000)), (today.getTime() + (180 * 24 * 60 * 60 * 1000))]
                    // Busca OTs que sean un mes anterior y hasta 6 meses posteriores a la fecha programada]
                }
            },
            include: [
                {
                    required: true,
                    model: Priority
                },
                {
                    required: true,
                    model: WOState,
                    where: Sequelize.or(
                        { name: 'PENDIENTE ASIGNACION' },
                        { name: 'PENDIENTE REALIZACION' },
                        { name: 'EN PROCESO' },
                        { name: 'LISTO' },
                        { name: 'SUSPENDIDA' },
                        { name: 'DEMORADA' },
                    )
                },
                {
                    required: true,
                    model: Profile,
                    include: [
                        {
                            required: true,
                            model: User,
                            where: { userId: userId },
                        },
                    ],
                },
                {
                    // required: true,
                    // model: Activity.scope('onlyActivityTemplate'),
                    // include: [
                    //     {
                    //         // required: true,
                    //         model: Profile,
                    //     },
                    //     {
                    //         // required: true,
                    //         model: ActivityTemplate.scope('noRelations'),
                    //     },
                    //     {
                    //         // required: true,
                    //         model: ActState,
                    //         // where: Sequelize.or(
                    //         //     { name: 'PENDIENTE REALIZACION' },
                    //         //     { name: 'EN PROCESO' },
                    //         //     { name: 'LISTO' },
                    //         // )
                    //     }
                    // ]

                },

            ],
        });
    } catch (e) {
        return Promise.reject(e);
    }
}


export const getOneMaintenancePlanDetailsWithActivities = async (
    maintenancePlanDetailId: string,
): Promise<MaintenancePlanDetail | null> => {
    try {
        return MaintenancePlanDetail.findOne({
            where: { maintenancePlanDetailId: maintenancePlanDetailId },
            include: [

                {
                    required: true,
                    model: Profile,
                    include: [
                        {
                            required: true,
                            model: User
                        },
                    ],
                },
                {
                    required: true,
                    model: Activity.scope('onlyActivityTemplate'),
                    include: [
                        {
                            required: false,
                            model: SuspensionReason
                        },
                        {
                            required: true,
                            model: Profile,
                        },
                        // {
                        //     required: true,
                        //     model: ActivityTemplate.scope('noRelations'),
                        // },
                        {
                            required: true,
                            model: ActState,
                            where: Sequelize.or(
                                { name: 'PENDIENTE REALIZACION' },
                                { name: 'EN PROCESO' },
                                { name: 'LISTO' },
                                { name: 'CANCELADA' },
                                { name: 'SUSPENDIDA' }
                            )
                            ,
                        }
                    ]

                },

            ],
        });
    } catch (e) {
        return Promise.reject(e);
    }
}

export const getAssetMaintenancePlanDetails = async (
    assetId: string,
): Promise<MaintenancePlanDetail[] | null> => {
    try {
        return MaintenancePlanDetail.scope('noActivities').findAll({
            include: [
                {
                    required: true,
                    model: Asset,
                    where: { assetId: assetId }
                }
            ]
        })
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getComponentMaintenancePlanDetails = async (
    compositeId: string,
): Promise<MaintenancePlanDetail[] | null> => {
    try {
        return MaintenancePlanDetail.scope('noActivities').findAll({
            include: [
                {
                    required: true,
                    model: Activity,
                    include: [{
                        model: Composite,
                        where:{compositeId: compositeId}
                    }]
                }
            ]
        })
    } catch (e) {
        return Promise.reject(e)
    }
}

// export const getDaysOfWeekForMaintenancePlanDetail = async (req: Request, res: Response) => {
//     try {
//         const maintenancePlanDetailId = req.params.maintenancePlanDetailId; // Obtén el ID desde la solicitud

//         // Primero, busca el MaintenancePlanDetail por su ID
//         const maintenancePlanDetail = await maintenancePlanDetailService.getMaintenancePlanDetailById(maintenancePlanDetailId);

//         if (!maintenancePlanDetail) {
//             // Si no se encuentra el MaintenancePlanDetail, retorna un error 404 o según tu preferencia.
//             return res.status(404).send('MaintenancePlanDetail no encontrado');
//         }

//         // Luego, usa el método getDaysOfWeek para obtener los DaysOfWeek asociados.
//         const daysOfWeek = await maintenancePlanDetail.getDaysOfWeek();

//         return res.status(200).send(daysOfWeek);
//     } catch (e) {
//         // Maneja cualquier error que pueda ocurrir durante la consulta.
//         return res.status(500).send(e);
//     }
// };

// export const getAllDaysOfWeek = async (req: Request, res: Response) => {
//     try {
//         const daysOfWeek = await daysOfWeekService.getDaysOfWeek();

//         return res.status(200).send(daysOfWeek);
//     } catch (e) {
//         return res.status(500).send(e);
//     }
// };









