import { AutoIncrement, BelongsTo, BelongsToMany, Column, DefaultScope, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CompositeComponent } from "./composite-component.model";
import { Composite } from "./composite.model";
@Table
export class Spare extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    public spareId!: number;

    @Column
    public name!: string;

    @BelongsTo(() => Composite, {
        foreignKey: 'componentFk',
        constraints: false,
        foreignKeyConstraint: false
    })
    public parents!: Composite[];

}