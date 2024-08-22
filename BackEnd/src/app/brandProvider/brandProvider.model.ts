import { Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Provider } from '../provider/model/provider.model';
import { Brand } from '../equipments/models/brand.model';

@Table
export class BrandProvider extends Model {
    @ForeignKey(() => Brand)
    @PrimaryKey
    @Column(DataType.BIGINT)
    brand_id!: number;

    @ForeignKey(() => Provider)
    @PrimaryKey
    @Column(DataType.BIGINT)
    provider_id!: number;
}

export default BrandProvider;