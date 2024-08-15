import { Table, Model, AutoIncrement, PrimaryKey, Column, HasMany, BelongsToMany, AllowNull, DataType, BelongsTo } from 'sequelize-typescript';
import { Composite, IComposite } from '../../assets/models/composite.model';

import { Asset, IAsset } from '../../assets/models/asset.model';

export interface IOperatorNotifications {
    operatorNotificationsId?: number;
    description?: string;
    name?:string;
    component?: IComposite;
    asset?: IAsset;

}
@Table
export class OperatorNotifications extends Model implements IOperatorNotifications {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public operatorNotificationsId!: number;

    @AllowNull(false)
    @Column
    public description!: string;

    @Column
    public name!: string;

    @BelongsTo(() => Composite, {
        foreignKey: 'compositeFK',
        constraints: false,
    })
    public component!: Composite;

    @BelongsTo(() => Asset, {
        foreignKey: 'assetFK',
        constraints: false,
    })
    public asset!: Asset;

}