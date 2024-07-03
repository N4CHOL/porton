import { Table, Column, PrimaryKey, AutoIncrement, DataType, HasMany, Model, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import { Activity } from "./activity.model";

export interface ISuspensionReason{
	
    suspensionReasonId?: number;
	name: string;
}

@Table({tableName:'SuspensionReasons'})
export class SuspensionReason extends Model implements ISuspensionReason {
	
	@AutoIncrement
	@PrimaryKey
	@Column(DataType.BIGINT)
	suspensionReasonId!: number
	
	@Column
	name!: string;

	@HasMany(()=> Activity, 'activitySuspensionReasonFk')
	activities!: Activity[];

	@BeforeCreate
    @BeforeUpdate
    public static upperName(instance: SuspensionReason) {
        instance.name = instance.name.toUpperCase();
    }
}