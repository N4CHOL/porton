import { BelongsTo, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table, Unique, HasMany } from "sequelize-typescript";
import { Composite } from "./composite.model";
import { Spare } from "./spare.model";

@Table
export class CompositeComponent extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    public compositeComponentId!: number;

    @ForeignKey(() => Composite)
    @ForeignKey(() => Spare)
    @Unique(false)
    @Column
    public componentFk!: number;

    @ForeignKey(() => Composite)
    @Unique(false)
    @Column
    public parentFk!: number;

    @Column
    public compositeType!: string;
}