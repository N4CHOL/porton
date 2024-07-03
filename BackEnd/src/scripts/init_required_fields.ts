// El objetivo de este Script es que para cada dato obligatorio que 
// surja durante el desarrollo del producto, el mismo no inhabilite
// los datos anteriormente cargados que requieran este nuevo parametro
// Estos tipos de datos deben declararse como script en la carpeta "required_parameters"

import { initRequiredPriorityOnWorkOrder } from "./required_parameters/required-priority";
import { initRequiredPComponentOnComponent } from './required_parameters/required_physical_component';
import { initRequiredBrand } from './required_parameters/required_brand_model';
import { initRequiredMachineType } from './required_parameters/required_machine_type';

export const initRequiredFields = async () => {
    await initRequiredPriorityOnWorkOrder();
    await initRequiredPComponentOnComponent();
    await initRequiredMachineType();
    await initRequiredBrand();
}