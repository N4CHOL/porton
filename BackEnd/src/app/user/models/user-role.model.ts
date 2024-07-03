import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model";
import { User } from "./user.model";

@Table
export class UserRole extends Model {

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    public userId!: number;

    @ForeignKey(() => Role)
    @Column(DataType.BIGINT)
    public roleId!: number;

}