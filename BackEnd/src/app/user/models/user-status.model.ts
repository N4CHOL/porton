import { Table, Column, Model, Index, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

export interface IUserStatus {
    name: String;
}

@Table
export class UserStatus extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public userStatusId!: number;

    @Column
    public name!: String;
}
