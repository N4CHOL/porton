import { Table, Model, AutoIncrement, PrimaryKey, Column, HasOne, BelongsTo, DataType } from "sequelize-typescript";
import { IProvider, Provider } from '../../provider/model/provider.model';
import { IAsset, Asset } from './asset.model';

export interface IPurchaseData {
    purchaseDataId?: number;
    purchaseDate: Date;
    warrantyDate: Date;
    provider: IProvider;
}

@Table
export class PurchaseData extends Model  implements IPurchaseData{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public purchaseDataId!: number;

    @Column
    public purchaseDate!: Date;

    @Column
    public warrantyDate!: Date;

    @BelongsTo( () => Asset, 'purchaseAssetId')
    public Asset!: Asset;
 
    @BelongsTo( () => Provider, 'purchaseProviderId')
    public provider!: Provider;     
}