import {
    Table,
    Column,
    Model,
    Index,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    DataType,
    BelongsTo,
    HasMany
} from 'sequelize-typescript';
import { Asset } from '../../assets/models/asset.model';
import { Unit } from './unit.model';
export interface ISector {
    sectorId?: number;
    name: string;
    number: number;
    internalNumber: number;
}

@Table
export class Sector extends Model implements ISector {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public sectorId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @Column
    public number!: number;

    @Column
    public internalNumber!: number;

    @BelongsTo(() => Unit, 'sectorUnitId')
    public unit!: Unit;

    @HasMany(() => Asset, 'assetSector')
    public assets!: Asset[]
}