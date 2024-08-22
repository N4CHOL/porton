import { Model, AutoIncrement, Column, PrimaryKey, Table, HasMany, AllowNull, DataType } from "sequelize-typescript";
import { PhysicalComponent } from "../../assets/models/physical-component.model";
import { AssetModel } from "./asset-model.model";

export interface IMachineType {
    machineTypeId?: number;
    name: string;
    description: string;
}

@Table
export class MachineType extends Model implements IMachineType {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public machineTypeId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @Column
    public description!: string;

    @HasMany( () => AssetModel, 'assetModelTypeId')
    public assetModel!: AssetModel[]

    @HasMany( () => PhysicalComponent, 'pComponentMTypeFK')
    public physicalComponents!: PhysicalComponent[];

}