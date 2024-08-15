import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Asset, IAsset } from "../../assets/models/asset.model";
import ProductionLineAsset from "./production-line-asset.model";

export interface IProductionLine {
    productionLineId?: number;
    name: string;
    description?: string;
    assets?: IAsset[];
}
@Table
export class ProductionLine extends Model implements IProductionLine {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public productionLineId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @Column
    public description!: string;

    @BelongsToMany(() => Asset, () => ProductionLineAsset)
    public assets!: Asset[];
}   