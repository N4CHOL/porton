import { TypeUnit } from "../models/typeUnit.model";

export const getTypeUnits = async (): Promise<TypeUnit[]> =>{
return TypeUnit.findAll();
}