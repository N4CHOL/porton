import { AutoIncrement, BelongsTo, Column, DataType, DefaultScope, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Op } from 'sequelize';
import { Composite, IComposite } from "./composite.model";
import { ISpareComponent, SpareComponent } from "./spare-component.model";

export interface ISpareComponentHistory{
    spareComponentHistoryId?: number;
    spareCompoentens?: ISpareComponent[];
    composite?: IComposite;
}

@DefaultScope(() => ({
    include: [{
        model: SpareComponent
    }
    ]
}))
@Table
export class SpareComponentHistory extends Model implements ISpareComponentHistory{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public spareComponentHistoryId!: number;

    @HasMany(() => SpareComponent, 'spareComponentHistoryFk')
    public spareComponents!: SpareComponent[];

    @BelongsTo(() => Composite, 'compositeHistoryFk')
    public composite!: Composite;



}