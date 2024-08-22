import { AutoIncrement, BelongsTo, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PhysicalComponent } from "./physical-component.model";

export interface IAttribute {
    attributeId?: number;
    name: string;
    value: string;
    description: string;
}

@Table({tableName: 'Attributes'})
export class Attribute extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    public attributeId!: number;

    @Column
    public name!: string;

    // Aca esta la ForeignKey
    @BelongsTo(() => PhysicalComponent, {
        foreignKey: 'pComponentAttributeFK',
        onDelete: 'CASCADE'
    })
    public physicalComponent!: PhysicalComponent;

    @Column
    public value!: string;

    @Column
    public description!: string;
}