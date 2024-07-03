import { AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table, AllowNull, DataType } from 'sequelize-typescript';
import { BrandProvider } from '../../brandProvider/brandProvider.model';
import { Provider } from '../../provider/model/provider.model';
import { AssetModel, IAssetModel } from './asset-model.model';

export interface IBrand {
    brandId?: number;
    name: string;
    description: string;
    providers?: Provider[]
    assetModels?: IAssetModel[];
}

@Table
export class Brand extends Model implements IBrand {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public brandId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @Column
    public description!: string;

    @HasMany(() => AssetModel, 'modelBrandId')
    public assetModels!: AssetModel[];

    @BelongsToMany(() => Provider, () => BrandProvider)
    public providers!: Provider[];
}
