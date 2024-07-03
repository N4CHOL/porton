import { Request, Response } from 'express';
import { ErrorResponse } from '../../shared/classes/error-response';
import { Activity } from '../models/activity.model';
import { SuspensionReason } from '../models/suspensionReason.model';
import * as activityService from '../services/activities.service';

export const postActivity = async (req: Request, res: Response) => {
  try {
    const maintenancePlanDetailId = req.params.mpid
      ? Number(req.params.mpid)
      : null;
    if (!maintenancePlanDetailId)
      throw 'No hay ID de detalle plan de mantenimineto';
    activityService.createActivity(maintenancePlanDetailId, req.body).then(
      (act: Activity) => {
        return res.status(200).send(act);
      },
      (rej: any) => {
        return res.status(400).send(rej);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const putActivity = async (req: Request, res: Response) => {
  try {
    const activityId: number | null = req.params.id
      ? Number(req.params.id)
      : null;
    if (!activityId) throw 'No recibi Activity ID';
    activityService.editActivity(activityId, req.body).then(
      (val: Activity) => {
        return res.status(200).send(val);
      },
      (rej: any) => {
        return res.status(400).send(new ErrorResponse(400,'BAD_REQUEST',rej));
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activityId: number | null = req.params.id
      ? Number(req.params.id)
      : null;
    if (!activityId) throw 'No recibí activity ID';
    activityService.deleteActivity(String(activityId)).then(
      () => {
        return res.status(200).send({ message: 'Borrado con exito' });
      },
      (err: any) => {
        return res.status(400).send(err);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getActivities = async (req: Request, res: Response) => {
  try {
    await activityService
      .getActivitiesByMPD(req.params.mpdId)
      .then((activities: Activity[]) => {
        return res.status(200).send(activities);
      });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getActivitiesByProfile = async (req: Request, res: Response) => {
  try {
    await activityService
      .getActivitiesByProfile(req.params.userId)
      .then((activities: Activity[]) => {
        return res.status(200).send(activities);
      });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getOneActivityWithTasks = async (req: Request, res: Response) => {


  try {
    await activityService
      .getOneActivityWithTasks(req.params.activityId)
      .then((activity: Activity | null) => {
        if (!activity)
          return res.status(404).send({ message: 'No se encontro actividad' });
        return res.status(200).send(activity);
      });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const checkTask = async (req: Request, res: Response) => {
  try {
    const actualDate = new Date();
    const timeStamp = actualDate;
    const taskId = req.params.taskId ? Number(req.params.taskId) : null;
    if (!taskId) throw 'No hay ID de task';
    activityService.changeTaskState(taskId).then(
      () => {
        return res.status(200).send({ message: timeStamp });
      },
      (err: any) => {
        return res.status(400).send(err);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getSuspensionReasons = async (req: Request, res: Response) => {
  try {
    await activityService
      .getSuspensionReasons()
      .then((reasons: SuspensionReason[]) => {
        return res.status(200).send(reasons);
      });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const suspendActivity = async (req: Request, res: Response) => {
  try {
    const actId: string | null = req.params.id ? req.params.id : null;
    // const reason: string | null = req.params.reason ? req.params.reason : null;
    if (!actId)
      return res.status(400).send({ message: 'No recibi Id de actividad ' });
    activityService.suspendActivity(actId, req.body.name).then(
      (activity: Activity) => {
     
        return res.status(200).send(activity);
      },
      (rej: any) => {
        return res.status(400).send(rej);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const resumeActivity = async (req: Request, res: Response) => {
  try {
    const actId: string | null = req.params.id ? req.params.id : null;
    if (!actId)
      return res.status(400).send({ message: 'No recibi Id de actividad ' });
    activityService.resumeActivity(actId).then(
      (activity: Activity) => {
        return res.status(200).send(activity);
      },
      (rej: any) => {
        return res.status(400).send(rej);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const endActivity = async (req: Request, res: Response) => {
    try {
        const actId: string | null = req.params.id ? req.params.id : null;
        if (!actId) return res.status(400).send({ message: "No recibi Id de actividad "});
        activityService.endActivity(actId).then(
            (activity: Activity) => {
                return res.status(200).send(activity);
            }, (rej: any) => {
                return res.status(400).send(rej);
            })
    } catch (e) {
        return res.status(500).send(e);
    }
}

export const startActivity = async (req: Request, res: Response) => {
  try {
    const actId: string | null = req.params.id ? req.params.id : null;
    if (!actId)
      return res.status(400).send({ message: 'No recibi Id de actividad ' });
    activityService.startActivity(actId).then(
      (activity: Activity) => {
        return res.status(200).send(activity);
      },
      (rej: any) => {
        return res.status(400).send({ rej });
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const cancelActivity = async (req: Request, res: Response) => {
  try {
    const activityId: number | null = req.params.id
      ? Number(req.params.id)
      : null;
    if (!activityId) throw 'No recibí activity ID';
    activityService.cancelActivity(String(activityId)).then(
      () => {
        return res.status(200).send({ message: 'Borrado con exito' });
      },
      (err: any) => {
        return res.status(400).send(err);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};
// export const postActivity = async (req: Request, res: Response) => {

//     try {
//         console.log("Recibido del front: ");
//         console.log(req.body);
//         const maintenancePlanDetailId = req.params.mpid ? Number(req.params.mpid) : null
//         if (!maintenancePlanDetailId) throw 'No hay ID de detalle plan de mantenimineto'
//         activityService.createActivity(maintenancePlanDetailId, req.body).then((act: Activity) => {
//             return res.status(200).send(act);
//         }, (rej: any) => {
//             return res.status(400).send(rej);
//         })
//     } catch (e) {
//         return res.status(500).send(e);
//     }

// }
