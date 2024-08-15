import { AutoIncrement, Column, PrimaryKey, Table, Model, BelongsToMany } from "sequelize-typescript";
import categoryObservation from "../../assets/models/category-observation.model";
import { Observation } from "../../assets/models/observation.model";
import categoryMPD from "../../maintenance-plan/models/categoryMPD.model";
import { MaintenancePlanDetail } from "../../maintenance-plan/models/maintenance-plan-detail.model";

export interface ICategory{
    categoryId: number;
    name: string;
    description: string;
    MPDs?: MaintenancePlanDetail[];
    obs?: Observation[];
}

@Table
export class Category extends Model implements ICategory{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    public categoryId!: number;

    @Column
    public name!: string;

    @Column
    public description!: string;

    @BelongsToMany(() => MaintenancePlanDetail, () => categoryMPD)
    public MPDs!: MaintenancePlanDetail[];

    @BelongsToMany(() => Observation, () => categoryObservation)
    public obs!: Observation[];
}