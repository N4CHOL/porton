import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Access } from "./access.model";
import { ActionAccess } from "./action-access.model";

export interface IAction {
    actionId?: number;
    name: string;
}

@Table({ tableName: 'Actions' })
export class Action extends Model implements IAction {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public actionId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @BelongsToMany(()=>Access, ()=>ActionAccess)
    public accesses!: Access[];
}