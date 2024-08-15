import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Access } from "./access.model";
import { Action } from "./action.model";


@Table({ tableName: 'ActionsAccesses' })
export class ActionAccess extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    actionAccessesId!: number;

    @ForeignKey(()=>Action)
    actionFk!: number;

    @ForeignKey(()=>Access)
    accessFk!: number;
    
}