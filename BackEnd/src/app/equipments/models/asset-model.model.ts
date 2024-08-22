import { IBrand, Brand } from './brand.model';
import { Table, Model, AutoIncrement, PrimaryKey, Column, BelongsTo, HasMany, BelongsToMany, AllowNull, DataType } from 'sequelize-typescript';
import { Asset } from '../../assets/models/asset.model';
import { MachineType, IMachineType } from './machine-type.model';
import { Color, IColor } from './color.model';
import AssetModelColor from './assetModelColor';



export interface IAssetModel {
    assetModelId?: number;
    name: string;
    description: string;
    machineType?: IMachineType;
    brand: IBrand;
    colors?: IColor[];
}

@Table
export class AssetModel extends Model implements IAssetModel {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public assetModelId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @Column
    public description!: string;

    @BelongsTo(() => MachineType, 'assetModelTypeId')
    public machineType!: MachineType;

    @BelongsTo(() => Brand, 'modelBrandId')
    public brand!: IBrand;

    @BelongsToMany(() => Color, () => AssetModelColor)
    public colors!: Color[];

    @HasMany(() => Asset, {
        foreignKey: {
            name: 'assetsAssetModelId',
            allowNull: true
        }
    })
    public assets!: Asset[];

}
