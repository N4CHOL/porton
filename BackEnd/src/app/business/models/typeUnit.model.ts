import { Table, Column, Model, Index, PrimaryKey, AutoIncrement, IsUUID, HasMany, AllowNull, DataType } from 'sequelize-typescript';
import { Unit } from './unit.model';

export interface ITypeUnit {
    typeUnitId?: number;
    name: string
}

@Table
export class TypeUnit extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public typeUnitId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @HasMany(() => Unit, 'unitsTypeUnitFK')
    public units!: Unit[];
}