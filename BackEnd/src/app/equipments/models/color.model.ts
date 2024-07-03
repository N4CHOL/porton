import { AutoIncrement, Column, HasMany, PrimaryKey, Table, Model, BelongsToMany, AllowNull, DataType } from "sequelize-typescript";
import { Asset } from "../../assets/models/asset.model";
import { AssetModel, IAssetModel } from "./asset-model.model";
import { AssetModelColor } from "./assetModelColor";


export interface IColor {
    colorId?: number;
    name: string;
    assetsModel?: IAssetModel[];
}

@Table
export class Color extends Model implements IColor {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public colorId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @BelongsToMany(() => AssetModel, () => AssetModelColor)
    assetsModel!: AssetModel[];

    @HasMany( () => Asset, 'colorAssetId')
    public asset!: Asset[];
}