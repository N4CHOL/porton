import { Table, Model, Index, Column, HasMany, PrimaryKey, AutoIncrement, AllowNull, DataType } from "sequelize-typescript";
import { IUnit, Unit } from './unit.model';

export interface IBusiness {
    businessId?: number;
    name: string;
    businessName: string;
    cuit: string;
    direction: string;
    isEnabled: boolean;
    unit: IUnit[];
}

@Table
export class Business extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public businessId!: number;

    @AllowNull(false)
    @Column
    public name!:string;

    @Column
    public businessName!: string;

    @AllowNull(false)
    @Column
    public cuit!: string;

    @AllowNull(false)
    @Column
    public direction!: string;

    @AllowNull(false)
    @Column
    public isEnabled!: boolean;

    @HasMany(() => Unit, 'businessUnitFK')
    public unit!: Unit[];

    addUnit(unit: Unit) {
        this.unit.push(unit);
    }

    removeUnits(units: IUnit[]) {
        this.unit = this.unit.filter((value: Unit) => {
            return !units.some((val: IUnit) => {
                return val.unitId == value.unitId;
            })
        })
    }
}