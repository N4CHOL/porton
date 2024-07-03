import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Access } from "./access.model";
import { Role } from "./role.model";

@Table({ tableName: 'RolesAccesses' })
export class RoleAccess extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    roleAccessId!: number;

    @ForeignKey(() => Role)
    @Column(DataType.BIGINT)
    roleFk!: number;

    @ForeignKey(() => Access)
    @Column(DataType.BIGINT)
    accessFk!: number;
    
}