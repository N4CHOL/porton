import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Asset } from "../../assets/models/asset.model";
import { ProductionLine } from "./production-line.model";

@Table
export class ProductionLineAsset extends Model {

    @ForeignKey(() => ProductionLine)
    @PrimaryKey
    @Column(DataType.BIGINT)
    productionLine_id!: number;

    @ForeignKey(() => Asset)
    @PrimaryKey
    @Column(DataType.BIGINT)
    asset_id!: number;
}

export default ProductionLineAsset;