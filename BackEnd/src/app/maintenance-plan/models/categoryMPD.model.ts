import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Category } from '../../shared/models/category.model';
import { MaintenancePlanDetail } from './maintenance-plan-detail.model';

@Table({tableName: 'CategoriesMPDs'})
export class categoryMPD extends Model {

    @ForeignKey(() => Category)
    @PrimaryKey
    @Column(DataType.BIGINT)
    category_id!: number;

    @ForeignKey(() => MaintenancePlanDetail)
    @PrimaryKey
    @Column(DataType.BIGINT)
    MPD_id!: number;

}

export default categoryMPD;