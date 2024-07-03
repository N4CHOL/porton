import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, BelongsTo, HasMany } from "sequelize-typescript";
import { MachineType } from "../../equipments/models/machine-type.model";
import { Attribute } from "./attribute.model";
import { Composite } from "./composite.model";
import { SpareComponent } from "./spare-component.model";


export interface IPhysicalComponent {
    name: string;
    attributes?: Attribute[];
    machineType: MachineType;
    description: string;
}

@Table({tableName: 'PhysicalComponents'})
export class PhysicalComponent extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public physicalComponentId!: number;

    @Column
    public name!: string;

    @HasMany(() => Attribute, 'pComponentAttributeFK')
    public attributes!: Attribute[]

    // la foreignKey está acá
    @BelongsTo(() => MachineType, {
        foreignKey: 'pComponentMTypeFK',
        onDelete: 'CASCADE'
    })
    public machineType!: MachineType;

    @Column
    public description!: string;

    // la foreignKey está acá
    @BelongsTo(() => SpareComponent,  {
        foreignKey: 'pComponentSpareCFK',
        onDelete: 'CASCADE'
    })
    public spareComponent!: SpareComponent;

    @HasMany(() => Composite, 'compositePComponentFK')
    public components!: Composite[]
}