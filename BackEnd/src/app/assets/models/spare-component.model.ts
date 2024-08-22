
import { AllowNull, AutoIncrement, BeforeCreate, BeforeUpdate, BelongsTo, Column, DataType, DefaultScope, HasMany, IsNull, Model, NotNull, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { Reading } from "../../readings/models/reading.model";
import { Observation } from "./observation.model";
import { PhysicalComponent } from "./physical-component.model";
import { SpareComponentHistory } from "./spare-component-history.model";

export interface ISpareComponent {
    spareComponentId?: number;
    name?: string;
    dateInstalled?: Date;
    dateUninstalled?: Date;
}

@Scopes(() => ({
    readings: {
        include: ['readings']
    }
}))
@Table
export class SpareComponent extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public spareComponentId!: number;

    @AllowNull(false)
    @Column
    public dateInstalled!: Date;

    @Column
    public name!: string;

    @Column
    public dateUninstalled!: Date;

    @HasMany(() => Reading, 'spareComponentReadingFk')
    public readings!: Reading[];

    @BelongsTo(() => SpareComponentHistory, 'spareComponentHistoryFk')
    public history!: SpareComponentHistory;

    @HasMany(() => PhysicalComponent, 'pComponentSpareCFK')
    public physicalComponents!: PhysicalComponent[];

    @HasMany(() => Observation, {
        foreignKey: 'observationSpareComponentFK',
        constraints: false,
        foreignKeyConstraint: false
    })
    public observation!: Observation[]
    

    @BeforeCreate
    @BeforeUpdate
    public static createName(instance: SpareComponent) {
        if (!instance.name) {
            instance.name = 'Componente Desconocido'
        }
    }
}