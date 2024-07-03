import { MaintenancePlanDetail } from "../../app/maintenance-plan/models/maintenance-plan-detail.model";
import { Priority } from "../../app/shared/classes/priority.model";
import * as priorityService from "../../app/shared/services/priority.service";
import * as maintenancePlanDetailService from "../../app/maintenance-plan/services/maintenance-plan-detail.service"

//Si la OT no tiene una prioridad asociada, le asigna una con valores default
// export const initRequiredPriorityOnWorkOrder = async () => {
//     const priorities: Priority[] = await priorityService.getPriorities();
//     priorities.forEach(async (value: Priority) => {
//         if (value.weight == null) value.weight = 0;
//         if (value.name == null) value.name = 'SIN PRIORIDAD';
//     })
// }

export const initRequiredPriorityOnWorkOrder = async () => {
    const manPlanD: MaintenancePlanDetail[] = await maintenancePlanDetailService.getMaintenancePlanDetails();
    manPlanD.forEach(async (value: MaintenancePlanDetail) => {
        if (!value.priority){
        const prio: Priority | null = await priorityService.findPriority('SIN PRIORIDAD');
        if (!prio) throw 'no existe la prioridad'
        value.$set('priority',prio);
        }
    })
}