import { AutoIncrement, BeforeCreate, BeforeUpdate, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface IWOState {

    wostateId?: number;
    name: string;

}

@Table
export class WOState extends Model implements IWOState {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    wostateId!: number

    @Column
    name!: string;

    public isState(stateName: string) {
        return this.name == stateName.toUpperCase();
    }

    @BeforeCreate
    @BeforeUpdate
    public static upperName(instance: WOState) {
        instance.name = instance.name.toUpperCase();
    }
}