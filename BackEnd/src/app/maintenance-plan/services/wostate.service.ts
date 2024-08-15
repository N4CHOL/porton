import { MaintenancePlanDetail } from "../models/maintenance-plan-detail.model";
import { WOState } from "../models/wostate.model";
import * as MaintenancePlanDetailService from './maintenance-plan-detail.service';
import * as actStateService from '../../activities/services/actstate.service';
import * as activityService from '../../activities/services/activities.service';
import { Activity } from "../../activities/models/activity.model";
import { ActState } from "../../activities/models/actstate.model";
import { ACTIVITYSTATES } from "../../../environments/constants";


export const findState = async (name: string) => {

    return WOState.findOne({
        where: {
            name: name.toUpperCase()
        }
    });

}

export const findStateById = async (id: number) => {

  return WOState.findOne({
      where: {
          wostateId: id
      }
  });

}
    export const StateNewWorkOrder = async (mpd: MaintenancePlanDetail): Promise<MaintenancePlanDetail> => {
        try {
        if (!mpd) throw 'No existe la Orden de Trabajo';
        mpd.dateHourGenerated = new Date();
        // Asignarle Estado
        const state: WOState | null = await findState('pendiente asignacion');
        if (!state) throw 'No hay estado \'pendiente asignacion\''
        await mpd.$set<WOState>('state', state);
    
        return mpd.save();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    export const StatePendingWorkOrder = async (mpd: MaintenancePlanDetail): Promise<MaintenancePlanDetail> => {
      try {

      if (!mpd) throw 'No existe la Orden de Trabajo';
      // Asignarle Estado
      // const maPlanD : MaintenancePlanDetail | null = await MaintenancePlanDetail.scope('onlyActivities').findByPk(mpd.maintenancePlanDetailId)
      const maPlanD = await MaintenancePlanDetail.scope('activitiesAndAsignees').findByPk(mpd.maintenancePlanDetailId)  
      if (!maPlanD) throw 'No existe la Orden de Trabajo desde base de datos';

        if (maPlanD.activities.length === 0 && maPlanD.state.name != 'CANCELADA'){

          const state: WOState | null = await findState('pendiente asignacion');
          if (!state) throw 'No hay estado \'pendiente pendiente asignacion\''
          await mpd.$set<WOState>('state', state);
  
        } else {
          
        }
      return mpd.save();
      } catch (e) {
 
          return Promise.reject(e);
      }
  }    

  export const StateAsignatedWorkOrder = async (mpd: MaintenancePlanDetail): Promise<MaintenancePlanDetail> => {
    try {

      if (!mpd) throw 'No existe la Orden de Trabajo';
      const manPlanD = await MaintenancePlanDetail.scope('activitiesAndAsignees').findByPk(mpd.maintenancePlanDetailId);
      if (!manPlanD) throw 'No existen actividades en la Orden de Trabajo'

        if (manPlanD.activities.length > 0 && manPlanD.activities.every((activity: Activity) => {
           
            return activity.asignee
        }))
        {
        const state: WOState | null = await findState('pendiente realizacion');
        if (!state) throw 'No hay estado \'pendiente realizacion\''
        await mpd.$set<WOState>('state', state);
    
        } else {
          
        }

      return mpd.save();
    } catch (e) {
        return Promise.reject(e);
    }
  }

  export const StateInProcessWorkOrder = async (mpd: string): Promise<MaintenancePlanDetail> => {
    try {
      let WO: MaintenancePlanDetail | null = await MaintenancePlanDetailService.getOneMaintenancePlanDetailsWithActivities(mpd);
      if (!WO) throw 'No existe la Orden de Trabajo';
      if (WO.activities.some((activity: Activity) => {
        return activity.state.name ===  ACTIVITYSTATES.EN_PROCESO
      }))
      {
        WO.dateHourStarted = new Date();
        const state: WOState | null = await findState('en proceso');
        if (!state) throw 'No hay estado \'en proceso\''
        await WO.$set<WOState>('state', state);
        } else {
       
        }

      return WO.save();
    } catch (e) {
        return Promise.reject(e);
    }
  }

  export const StateReadyWorkOrder = async (mpd: string): Promise<MaintenancePlanDetail> => {
    try {

      let WO: MaintenancePlanDetail | null = await MaintenancePlanDetailService.getOneMaintenancePlanDetailsWithActivities(mpd);
      if (!WO) throw 'No existe la Orden de Trabajo';
        // if (WO.activities.every((activity: Activity) => {
        //     return activity.state.name ===  ACTIVITYSTATES.LISTO 
        // }))
        let readyActivities = WO.activities.filter((act: Activity) => {
          return act.state.name === ACTIVITYSTATES.LISTO}).length
        let canceledActivities = WO.activities.filter((act: Activity) => {
          return act.state.name === ACTIVITYSTATES.CANCELADA}).length
        if (readyActivities + canceledActivities === WO.activities.length && readyActivities > 0)           
        {

        const state: WOState | null = await findState('listo');
        if (!state) throw 'No hay estado \'listo\''
        await WO.$set<WOState>('state', state);
        } else {

        }

      return WO.save();
    } catch (e) {
        return Promise.reject(e);
    }
  }

  export const StateFinishedWorkOrder = async (mpd: MaintenancePlanDetail): Promise<MaintenancePlanDetail> => {
    try {
    if (!mpd) throw 'No existe la Orden de Trabajo';
    mpd.dateHourCompleted= new Date();
    // Asignarle Estado
    // if (mpd.activities.every((activity: Activity) => {
    //   return activity.state.name ===  ACTIVITYSTATES.LISTO
    // }))
    
    let readyActivities = mpd.activities.filter((act: Activity) => {
      return act.state.name === ACTIVITYSTATES.LISTO}).length
    let canceledActivities = mpd.activities.filter((act: Activity) => {
      return act.state.name === ACTIVITYSTATES.CANCELADA}).length

    if (readyActivities + canceledActivities === mpd.activities.length && readyActivities > 0)
    {
    const state: WOState | null = await findState('finalizada');
    if (!state) throw 'No hay estado \'finalizada\''
    await mpd.$set<WOState>('state', state);

    } else {
 
    }

    return mpd.save();
    } catch (e) {
        return Promise.reject(e);
    }
  }

  export const StateCancelWorkOrder = async (mpd: MaintenancePlanDetail): Promise<MaintenancePlanDetail> => {
    try {
      if (!mpd) throw 'No existe la Orden de Trabajo';
        const state: WOState | null = await findState('cancelada');
        if (!state) throw 'No hay estado \'cancelada\''
        await mpd.$set<WOState>('state', state);
        const actState: ActState | null = await actStateService.findState('cancelada');
        if (!actState) throw 'La actividad no tiene estado \'cancelada\''
        mpd.activities.forEach(async activity => {
          await activity.$set<ActState>('state', actState)
        })

      return mpd.save();
    } catch (e) {
        return Promise.reject(e);
    }
  }