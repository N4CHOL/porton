import { Model, Column, AutoIncrement, PrimaryKey, Table, BelongsTo, Index, AllowNull, DataType, Default } from 'sequelize-typescript';
import { ActivityTemplate } from './activityTemplate.model';

export interface ITaskTemplate {
    taskTemplateId?: number;
    name: string;
    number: number;
}


@Table
export class TaskTemplate extends Model implements ITaskTemplate {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public taskTemplateId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    // @Index({order: 'ASC'})
    // @AllowNull(false)
    @Column
    public number!: number;

    // IMPLEMENTACION PARA PARAMETRO "ACTIVIDAD OPCIONAL"
    @Default(false)
    @Column
    public optional!: boolean;
    
    // FIN IMPLEMENTACION

     @BelongsTo(() => ActivityTemplate, 'activityTemplateFK')
     public activity!: ActivityTemplate
}