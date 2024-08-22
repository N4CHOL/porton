import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Category } from '../../shared/models/category.model';
import { Observation } from './observation.model';


@Table({tableName: 'CategoriesObservation'})
export class CategoryObservation extends Model {

    @ForeignKey(() => Category)
    @PrimaryKey
    @Column(DataType.BIGINT)
    category_id!: number;

    @ForeignKey(() => Observation)
    @PrimaryKey
    @Column(DataType.BIGINT)
    obs_id!: number;

}

export default CategoryObservation;