import { AutoIncrement, BeforeCreate, BeforeUpdate, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Observation } from "./observation.model";

export interface IWorState{

    worstateId?: number;
    name: string;

}

@Table({tableName:'WorStates'})
export class WorState extends Model implements IWorState {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    worstateId!: number

    @Column
    name!: string;

    public isState(stateName: string) {
        return this.name == stateName.toUpperCase();
    }

    // @HasMany(()=> Observation,'worStateFk')
    // workOrderRequests!: Observation[];

    @BeforeCreate
    @BeforeUpdate
    public static upperName(instance: WorState) {
        instance.name = instance.name.toUpperCase();
    }
}