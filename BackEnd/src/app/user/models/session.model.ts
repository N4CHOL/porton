import { Table, Column, Model, Index, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

export interface ISession {
    date: Date,
    duration: number
}

@Table
export class Session extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public sessionId!: number;

    @Column
    public date!: Date;

    @Column
    public duration!: number;
}