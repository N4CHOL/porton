import { Table, Column, Model, HasOne, HasMany, Index, PrimaryKey, AutoIncrement, BelongsTo, AllowNull, DataType } from 'sequelize-typescript';
import { ITypeUnit, TypeUnit } from './typeUnit.model';
import { ISector, Sector } from './sector.model';
import { Business } from './business.model';

export interface IUnit {
    unitId?: number;
    name: string;
    number: string;
    email: string;
    phone: string;
    direction: string;
    typeUnit: ITypeUnit;
    sectors: ISector[];
    isEnabled: boolean;
}

@Table
export class Unit extends Model implements IUnit {


    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public unitId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    //podria ser autoincremental y que no lo ingrese el usuario
    @Column
    public number!: string;

    @Column
    public email!: string;

    @Column
    public phone!: string;

    @Column
    public direction!: string;

    @BelongsTo(() => TypeUnit, 'unitsTypeUnitFK')
    public typeUnit!: TypeUnit;

    @HasMany(() => Sector, 'sectorsId')
    public sectors!: Sector[];

    @BelongsTo(() => Business, 'businessUnitFK')
    public business!: Business;

    @Column
    public isEnabled!: boolean;

    addSector(sec: Sector) {
        this.sectors.push(sec);
    }

}