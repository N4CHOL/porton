import { AutoIncrement, BeforeCreate, BelongsTo, BelongsToMany, Column, DataType, DefaultScope, HasMany, HasOne, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { MaintenancePlanDetail } from "../../maintenance-plan/models/maintenance-plan-detail.model";
import { MaintenancePlanDetailDaysOfWeek } from "./MaintenancePlanDetailDaysOfWeek.model";
export interface IDaysOfWeek {
    daysOfWeekId?: number;
    name: string;
}

@Table({ tableName: 'DaysOfWeek' })
export class DaysOfWeek extends Model implements IDaysOfWeek {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public daysOfWeekId!: number;

    @Column
    public name!: string;

    @BelongsToMany(() => MaintenancePlanDetail, () => MaintenancePlanDetailDaysOfWeek, 'daysOfWeekFk', 'maintenancePlanDetailFk')
    public maintenancePlanDetails!: MaintenancePlanDetail[];



}
//