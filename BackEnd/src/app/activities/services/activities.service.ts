//import { ActivityTemplate } from '../../activitiesTemplates/models/activityTemplate.model';
import { Activity, IActivity } from '../models/activity.model';
import * as activityTemplateService from '../../activitiesTemplates/services/activityTemplate.service';
import * as maintenancePlanDetailService from '../../maintenance-plan/services/maintenance-plan-detail.service';
import * as profileService from '../../profile/services/profile.service';
import * as actStateService from './actstate.service';
import * as suspensionReasonService from './suspensionReason.service';
import * as WOStateService from '../../maintenance-plan/services/wostate.service';
import * as componentService from '../../assets/services/component.service';
import * as assetService from '../../assets/services/asset.service';
import { TaskTemplate } from '../../activitiesTemplates/models/taskTemplate.model';
import { Task } from '../models/task.model';
import { MaintenancePlanDetail } from '../../maintenance-plan/models/maintenance-plan-detail.model';
import { Profile } from '../../profile/models/profile.model';
import { User } from '../../user/models/user.model';
import { ActState } from '../models/actstate.model';
import { Sequelize } from 'sequelize';
import { Composite } from '../../assets/models/composite.model';
import { PhysicalComponent } from '../../assets/models/physical-component.model';
import { Attribute } from '../../assets/models/attribute.model';
import { Priority } from '../../shared/classes/priority.model';
import { SuspensionReason } from '../models/suspensionReason.model';
import { Console } from 'console';
import { ACTIVITYSTATES } from '../../../environments/constants';
import { Asset } from '../../assets/models/asset.model';
import { ActivityTemplate } from '../../activitiesTemplates/models/activityTemplate.model';

export const saveActivity = async (activity: IActivity) => {
  try {

    const newActivity: Activity = new Activity({ ...activity });
    const saved: Activity = await newActivity.save();

    // Asignarle Template
    // if (!activity.template.activityTemplateId) throw 'No hay Activity template';
    // const activityTemplate: ActivityTemplate | null =
    //   await activityTemplateService.getActivityTemplate(
    //     activity.template.activityTemplateId
    //   );
    // if (!activityTemplate) throw 'No se encontró activityTemplate';
    // newActivity.$set<ActivityTemplate>('template', activityTemplate);

    // //asignar asset
    if (activity.asset) {
      const asset: Asset | null =
        await assetService.getAsset(
          activity.asset.assetId
        );
      if (!asset) throw 'No se encontró asset';
      newActivity.$set<Asset>('asset', asset);
    }


    //Asignar estado inicial a la actividad (default: 'pendiente realizacion')
    const aStates: ActState | null = await actStateService.findState('pendiente realizacion');
    if (!aStates) throw 'No se encontró actState';
    newActivity.$set<ActState>('state', aStates);

    //Crear tasks
    // const tasks: Promise<Task>[] = activityTemplate.tasks.map<Promise<Task>>(
    //   async (val: TaskTemplate) => {
    //     const task: Task = new Task();
    //     await task.save();
    //     task.$set<TaskTemplate>('template', val);
    //     return task;
    //   }
    // );
    // const sTasks: Task[] = await Promise.all(tasks);

    // await newActivity.$set<Task>('tasks', sTasks);

    //Asignarle perfil
    if (!activity.asignee.user?.userId) throw 'No hay asignado';
    const prf: Profile | null = await profileService.findProfileByUserId(
      activity.asignee.user.userId
    );
    if (!prf) throw 'No existe el perfil';
    await newActivity.$set<Profile>('asignee', prf);

    //Asignarle el componente
    if (activity.component?.compositeId) {
      const comp: Composite | null = await componentService.getComponentById(
        activity.component.compositeId
      );
      if (!comp) throw 'No existe el componente';
      await newActivity.$set<Composite>('component', comp);
    }
    return newActivity;

  } catch (e) {
    return Promise.reject(e);
  }
}

export const createActivity = async (
  maintenancePlanId: number,
  activity: IActivity
): Promise<Activity> => {
  try {

    let acc: Activity = new Activity({ ...activity });
    if (!activity.component?.compositeId) throw 'El componente no existe';
    await acc.save();

    // // Asignarle Template
    if (activity.template.activityTemplateId) {
      const activityTemplate: ActivityTemplate | null =
        await activityTemplateService.getActivityTemplate(
          activity.template.activityTemplateId
        );
      if (!activityTemplate) throw 'No se encontró activityTemplate';
      acc.$set<ActivityTemplate>('template', activityTemplate);
    }
    //Asignar estado inicial a la actividad (default: 'pendiente realizacion')

    const aStates: ActState | null = await actStateService.findState('pendiente realizacion');
    if (!aStates) throw 'No se encontró actState';
    acc.$set<ActState>('state', aStates);

    // //Crear tasks
    // const tasks: Promise<Task>[] = activityTemplate.tasks.map<Promise<Task>>(
    //   async (val: TaskTemplate) => {
    //     const task: Task = new Task();
    //     await task.save();
    //     task.$set<TaskTemplate>('template', val);
    //     return task;
    //   }
    // );
    // const sTasks: Task[] = await Promise.all(tasks);
    // await acc.$set<Task>('tasks', sTasks);

    //Asignarla a la orden de trabajo
    const maPlaD: MaintenancePlanDetail | null =
      await maintenancePlanDetailService.getMaintenancePlanDetail(
        maintenancePlanId
      );
    if (!maPlaD) throw 'No existe la orden de trabajo';
    await acc.$set<MaintenancePlanDetail>('maintenancePlanDetail', maPlaD);

    //Cambiar el estado de la orden de trabajo a "Pendiente Realizacion"
    WOStateService.StateAsignatedWorkOrder(maPlaD);

    //Asignarle perfil
    if (!activity.asignee.user?.userId) throw 'No hay asignado';
    const prf: Profile | null = await profileService.findProfileByUserId(
      activity.asignee.user.userId
    );
    if (!prf) throw 'No existe el perfil';
    await acc.$set<Profile>('asignee', prf);

    //Asignarle el componente
    if (!activity.component?.compositeId) throw 'No hay componente';
    const comp: Composite | null = await componentService.getComponentById(
      activity.component.compositeId
    );
    if (!comp) throw 'No existe el componente';
    await acc.$set<Composite>('component', comp);

    return acc;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const editActivity = async (
  activityId: number,
  activity: IActivity
): Promise<Activity> => {


  try {
    let act: Activity | null = await Activity.findByPk(activityId, {
      include: [Profile, Composite],
      
    });
    

    if (!act) throw 'No se encontró la actividad';

    // Cambio de Componente (si se proporciona)
    if (activity.component) {

      const newComponent: Composite | null = await Composite.findByPk(
        activity.component.compositeId
        
      );

      if (newComponent) {

        await act.$set<Composite>('component', newComponent);
      }
    }

    // Cambio de Asignado (si se proporciona)
    if (activity.asignee && activity.asignee.profileId) {            

      const newAsignee: Profile | null = await Profile.findByPk(
        activity.asignee.profileId
      );
      if (newAsignee) {

        await act.$set<Profile>('asignee', newAsignee);
      }
    }


       // Cambio de Asset (si se proporciona)
       if (activity.asset && activity.asset.assetId) {            

        const newAsset: Asset | null = await Asset.findByPk(
          activity.asset.assetId
        );
        if (newAsset) {
 
          await act.$set<Asset>('asset', newAsset);
        }
      }

    await act.update(activity);

    return await act.save();
    
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getActivitiesByMPD = async (
  mpdId: string,
  scope?: string
): Promise<Activity[]> => {
  try {
    return Activity.findAll({

      include: [{ model: Profile }, { model: Composite },],
      where: {
        activityMPDFk: mpdId,

      },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};


//ACTUALMENTE DEVUELVE DATOS REDUNDANTES, FILTRAR POR FRONT O MEJORAR
//EL PROBLEMA RESIDE EN EL LLAMADO A DEFAULTSCOPES

export const getActivitiesByProfile = async (
  userId: string,
): Promise<Activity[]> => {
  try {
    return Activity.findAll({
      include: [
        {
          required: false,
          model: SuspensionReason
        },
        {
          model: MaintenancePlanDetail.scope('noActivities'),
          include: [
            {
              model: Priority
            },
         
          ],
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
     
          model: Asset,
      
        },
        {
          required: true,
          model: ActState,
          where: Sequelize.or(
            { name: 'PENDIENTE REALIZACION' },
            { name: 'EN PROCESO' },
            { name: 'SUSPENDIDA' }
          )
          ,
        },
        {
          required: false,
          model: ActivityTemplate.scope('noRelations')
        },
        {
          model: Composite
        }
        // 'template'
      ],
    });
  } catch (e) {
    return Promise.reject(e);
  }
};


export const getOneActivityWithTasks = async (
  activityId: string
): Promise<Activity | null> => {
  try {
    return Activity.scope('onlyTasks').findOne({
      where: { activityId: activityId },
      include: [
        {
          //Crear Scope donde NO se obtengan las actividades
          model: MaintenancePlanDetail.scope('noActivities'),
          // include: [
          //   {
          //     model: Activity.scope('onlyActStates')
          //   }
          // ]
        },
        {
          required: true,
          model: Profile,
          include: [
            {
              required: true,
              model: User,
            },
          ],
        },
        {
          required: true,
          model: ActState,
        },
        {
          required: false,
          model: ActivityTemplate.scope('noRelations'),
        },
        {
          model: Composite,
          include: [
            {
              model: PhysicalComponent,
              include: [
                {
                  model: Attribute
                }
              ]
            }
          ]
        }
        // 'template'
      ],
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getOneActivityWithSuspensionReason = async (
  activityId: string
): Promise<Activity | null> => {
  try {
    return Activity.scope('onlySuspensionReason').findOne({
      where: { activityId: activityId },
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

export const changeTaskState = async (
  taskId: number,
): Promise<Task> => {
  try {
    let updateTask: Task | null = await Task.findByPk(taskId);
    if (!updateTask) throw "No se encontro la Task";
    updateTask.done = !updateTask.done
    updateTask.dateTimeDone = new Date();
    // if(!updateTask.done) delete updateTask.dateTimeDone;  
    return updateTask.save();
  } catch (e) {
    return Promise.reject(e)
  }
};

export const getSuspensionReasons = async (

): Promise<SuspensionReason[]> => {
  try {
    return SuspensionReason.findAll();
  } catch (e) {
    return Promise.reject(e);
  }
}

export const suspendActivity = async (activityId: string, reason: string): Promise<Activity> => {
  try {


    let act: Activity | null = await getOneActivityWithSuspensionReason(activityId);
    if (!act) throw 'No existe la Actividad';


    const state: ActState | null = await actStateService.findState('suspendida');
    if (!state) throw 'No hay estado \'suspendida\'';
    await act.$set<ActState>('state', state);


    // const suspensionReason: SuspensionReason | null = act.suspensionReason
    // if(!act.suspensionReason){
    //   act.suspensionReason = await suspensionReasonService.createNewSuspensionReason(reason);
    //   console.log('Se creo un nuevo valor en la tabla suspensionReason ya que la actividad no tenia uno anteriormente')
    // } else {
    //   console.log('Se cambio el valor name de la tabla suspensionReason, y la misma ya existe y esta relacionada con actividad')
    //   act.suspensionReason.name = reason;
    // }

    const newReason: SuspensionReason | null = await suspensionReasonService.findReason(reason)
    if (!newReason) throw 'No se encontro el motivo traido desde front'
    await act.$set<SuspensionReason>('suspensionReason', newReason);
    //TODO: SI NO EXISTE UNA REASON, CREARLA CON UN METODO NEW Y HACERLE $SET
    // console.log('El servicio cambia exitosamente el nombre de la tabla suspensionReason, siendo su valor: ',act.suspensionReason);

    // console.log('Llamado a servicio de suspension exitoso');

    // FUTURE PROOFING: Recordar el estado anterior a este, para transiciones multiples
    // la tabla suspensionReason deberia tener referencia al estado
    // let previousState = act.state.name
    // if (act.state.name !== 'suspendida'){
    //   if (!previousState) throw 'No hay estado previo al actual';
    // const state: ActState | null = await actStateService.findState('suspendida');
    // if (!state) throw 'No hay estado \'suspendida\'';
    // await act.$set<ActState>('state', state);
    // act.suspensionReason.name = reason
    // } else {
    //   act.suspensionReason.name = "No aplica";
    //   const state: ActState | null = await actStateService.findState(previousState);
    //   if (!state) throw 'No hay estado anterior';
    //   await act.$set<ActState>('state', state);
    // }

    return act.save();
  } catch (e) {
    return Promise.reject(e);
  }

};

export const resumeActivity = async (activityId: string): Promise<Activity> => {
  try {

    let act: Activity | null = await getOneActivityWithTasks(activityId);
    //TODO: Si intento usar el get que incluye el motivo de suspension, da bad request, igualmente no es necesario para este paso
    if (!act) throw 'No existe la Actividad';
    const state: ActState | null = await actStateService.findState('en proceso');
    if (!state) throw 'No hay estado \'en proceso\'';
    await act.$set<ActState>('state', state);
    // act.suspensionReason.name = 'N/A'

    return act.save();
  } catch (e) {
    return Promise.reject(e);
  }

};

export const endActivity = async (activityId: string): Promise<Activity> => {

  try {
    let act: Activity | null = await getOneActivityWithTasks(activityId);
    if (!act) throw 'No existe la Actividad';
    act.dateHourEnd = new Date();
    // Asignarle Estado
    const state: ActState | null = await actStateService.findState('listo');
    if (!state) throw 'No hay estado \'listo\''
    await act.$set<ActState>('state', state);
    const sAct: Activity = await act.save();
    let mpdId = String(sAct.maintenancePlanDetail.maintenancePlanDetailId);
    try {
      await WOStateService.StateReadyWorkOrder(mpdId);
    } catch (e) {

      return Promise.reject(e)
    }
    return sAct;
  } catch (e) {
    return Promise.reject(e);
  }
}



export const startActivity = async (activityId: string): Promise<Activity> => {
  const today: Date = new Date();
  try {
    let act: Activity | null = await getOneActivityWithTasks(activityId);
    if (!act) throw 'No existe la Actividad';
    // Asignarle Estado
    act.dateHourStart = today;
    const state: ActState | null = await actStateService.findState('en proceso');
    if (!state) throw 'No hay estado \'en proceso\''
    await act.$set<ActState>('state', state);
    const sAct: Activity = await act.save();
    let mpdId = String(sAct.maintenancePlanDetail.maintenancePlanDetailId)
    try {
      await WOStateService.StateInProcessWorkOrder(mpdId);
    } catch (e) {
      return Promise.reject(e);
    }
    return sAct;
  } catch (e) {
    return Promise.reject(e);
  }
}

export const deleteActivity = async (activityId: string): Promise<void> => {

  try {
    //    const ac: Activity | null = await Activity.findByPk(activityId);
    const ac: Activity | null = await Activity.scope('onlyMPD').findByPk(activityId);
    if (!ac) throw 'No existe la Actividad';
    const maPlaD: MaintenancePlanDetail | null =
      await maintenancePlanDetailService.getMaintenancePlanDetail(ac?.maintenancePlanDetail.maintenancePlanDetailId);
    if (!maPlaD) throw 'No existe la Orden de Trabajo';
    await ac?.destroy();
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  } finally {

  }
};

export const cancelActivity = async (activityId: string): Promise<void> => {
  try {
    //    const ac: Activity | null = await Activity.findByPk(activityId);
    const ac: Activity | null = await Activity.scope('onlyMPD').findByPk(activityId);
    if (!ac) throw 'No existe la Actividad';
    await actStateService.StateCancelActivity(ac);
    const maPlaD: MaintenancePlanDetail | null =
      await maintenancePlanDetailService.getMaintenancePlanDetail(ac?.maintenancePlanDetail.maintenancePlanDetailId);
    if (!maPlaD) throw 'No existe la Orden de Trabajo';

    await WOStateService.StatePendingWorkOrder(maPlaD)

    let mpdId = String(maPlaD.maintenancePlanDetailId);
    await WOStateService.StateReadyWorkOrder(mpdId);
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e);
  }
};

// export const editActivity = async (
//   activityId: number,
//   activity: Activity
// ): Promise<Activity> => {
//   try {
//     let act: Activity | null = await Activity.findByPk(activityId);
//     if (!act) throw 'No se encontró la actividad';

//     // Cambio de Asignado
//     if (!activity.asignee || !activity.asignee.profileId)
//       throw 'La actividad no tiene un asignado';
//     const newAsignee: Profile | null = await Profile.findByPk(
//       activity.asignee.profileId
//     );
//     if (!newAsignee) throw 'No existe el nuevo asignado';
//     await act.$set<Profile>('asignee', newAsignee);
//     return act.save();
//   } catch (e) {
//     return Promise.reject(e);
//   }
// };