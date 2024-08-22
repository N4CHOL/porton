import { AutoIncrement, BeforeCreate, BeforeUpdate, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Activity } from "./activity.model";

export interface IActState{

    actstateId?: number;
    name: string;

}

@Table({tableName:'ActStates'})
export class ActState extends Model implements IActState {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    actstateId!: number

    @Column
    name!: string;

    public isState(stateName: string) {
        return this.name == stateName.toUpperCase();
    }

    @HasMany(()=> Activity,'activityStateFk')
    activities!: Activity[];

    @BeforeCreate
    @BeforeUpdate
    public static upperName(instance: ActState) {
        instance.name = instance.name.toUpperCase();
    }
}