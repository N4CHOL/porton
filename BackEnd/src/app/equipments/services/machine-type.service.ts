import { MachineType, IMachineType } from '../models/machine-type.model';

export const getMachineTypes = async (): Promise<MachineType[]> => {
    return MachineType.findAll();
}

export const getMachineType = async (machineTypeId: number): Promise<MachineType | null> => {
    return MachineType.findByPk(machineTypeId);
}

export const saveMachineType = async (machineType: IMachineType): Promise<MachineType> => {
    const newMachineType = new MachineType({...machineType});
    return newMachineType.save();
}

export const updateMachineType = async (machineTypeId: number, machineType: IMachineType): Promise<[number, MachineType[]]> => {
    return MachineType.update(machineType, { where: { machineTypeId: machineTypeId }, returning: true });

}

export const deleteMachineType = async (machineTypeId: number) => {
    const macTypeDel: MachineType | null = await MachineType.findByPk(machineTypeId);
    return macTypeDel?.destroy();
}

export const findOrCreateEmptyMachineType = async (): Promise<MachineType> => {
   const machineType: MachineType | null = await MachineType.findOne({where: {name: 'Tipo de Máquina desconocida'}});
   if (!machineType) {
       const newMachineType: MachineType = new MachineType({
           name: 'Tipo de Máquina desconocida'
       });
       return newMachineType.save();
   }
   return machineType;
}