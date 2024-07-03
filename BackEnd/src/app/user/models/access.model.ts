import { Table, Column, Model, Index, PrimaryKey, AutoIncrement, AllowNull, DataType, HasMany, BelongsTo, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import { ActionAccess } from './action-access.model';
import { Action } from './action.model';
import { Feature } from './feature.model';

export interface IAccess {
    accessId?: number;
}
@DefaultScope(() => ({
    include: ['feature', 'actions']
}))
@Table({ tableName: 'Accesses' })
export class Access extends Model implements IAccess {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public accessId!: number;

    @BelongsTo(() => Feature, 'featureAccessFk')
    public feature!: Feature;

    @BelongsToMany(() => Action, () => ActionAccess)
    public actions!: Action[]


}
