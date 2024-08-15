import { AutoIncrement, BelongsToMany, Column, ForeignKey, HasMany, Model, PrimaryKey, Table, DataType } from 'sequelize-typescript';
import { AssetModel, IAssetModel } from './asset-model.model';
import { Color } from './color.model';

@Table
export class AssetModelColor extends Model {

    @ForeignKey(() => AssetModel)
    @PrimaryKey
    @Column(DataType.BIGINT)
    assetModel_id!: number;

    @ForeignKey(() => Color)
    @PrimaryKey
    @Column(DataType.BIGINT)
    color_id!: number;
}

export default AssetModelColor;