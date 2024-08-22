import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, BelongsTo, AllowNull } from 'sequelize-typescript'
import { TemplateMPD } from './template-maitenance-plan.model';

export interface IRecurrence {
    recurrenceId: number;
    dateHourStarted: Date;
    amountOfDays: number;
}

@Table({tableName: 'Recurrence'})
export class Recurrence extends Model implements IRecurrence{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public recurrenceId!: number;

    @AllowNull(false)
    @Column
    public dateHourStarted!: Date;

    @AllowNull(false)
    @Column
    public amountOfDays!: number;

    @BelongsTo(() => TemplateMPD, {
        foreignKey: 'recurrenceTMPDFK',
        onDelete: 'CASCADE'
    })
    public templateMPD!: TemplateMPD;
}