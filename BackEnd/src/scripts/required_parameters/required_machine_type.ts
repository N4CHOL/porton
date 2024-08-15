import { IMachineType, MachineType } from '../../app/equipments/models/machine-type.model';
import * as machineTypeSrv from '../../app/equipments/services/machine-type.service';

export const initRequiredMachineType = async () => {
    await machineTypeSrv.findOrCreateEmptyMachineType();
}