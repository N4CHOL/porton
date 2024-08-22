import { AutoIncrement, BeforeCreate, BelongsTo, Column, DataType, DefaultScope, HasMany, HasOne, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { MaintenancePlanDetail } from "../../maintenance-plan/models/maintenance-plan-detail.model";
import { TemplateMPD } from "../../template-maintenance-plan/models/template-maitenance-plan.model";

export interface IPriority
 {
    priorityId?: number;
    name: string;
    weight: number,
}

@Table({tableName:'Priorities'})
export class Priority extends Model implements IPriority {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public priorityId!: number;

    @Column
    public name!: string;

    @Column
    public weight!: number;

    @HasMany(()=> MaintenancePlanDetail,'woPriorityFk')
    public maintenancePlanDetails!: MaintenancePlanDetail[];

    @HasMany(() => TemplateMPD, 'templateMPDPriorityFK')
    public templateMPD!: TemplateMPD[];
}
//