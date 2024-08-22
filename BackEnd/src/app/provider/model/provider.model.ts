import { Table, Model, AutoIncrement, PrimaryKey, Column, HasMany, BelongsToMany, AllowNull, DataType, DefaultScope } from 'sequelize-typescript';
import { PurchaseData } from '../../assets/models/purchaseData.model';
import { Brand, IBrand } from '../../equipments/models/brand.model';
import { BrandProvider } from '../../brandProvider/brandProvider.model';

export interface IProvider {
    providerId?: number;
    name: string;
    phone: string;
    address: string;
    brands?: IBrand[];
    codeArea?: string;
    mail?:string;
}

@DefaultScope(() => ({ include: ['brands'] }))
@Table
export class Provider extends Model implements IProvider {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public providerId!: number;
    

    @AllowNull(false)
    @Column
    public name!: string;

    @Column
    public phone!: string;

    @Column
    public codeArea!: string;

    @Column
    public mail!: string;

    @Column
    public address!: string;

    @HasMany(() => PurchaseData, 'purchaseProviderId')
    public purchaseData!: PurchaseData[]

    @BelongsToMany(() => Brand, () => BrandProvider)
    public brands!: Brand[];

}