import { BelongsTo, Model,AutoIncrement, Column, DataType, PrimaryKey, DefaultScope, Table, Default } from "sequelize-typescript";
import { ITaskTemplate, TaskTemplate } from "../../activitiesTemplates/models/taskTemplate.model";
import { Activity } from "./activity.model";

export interface ITask{
    template: ITaskTemplate;
    dateTimeDone?: Date;
    done: boolean;
}

@DefaultScope(()=>({include:[TaskTemplate]}))
@Table
export class Task extends Model implements ITask{
    
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    taskId!: number;

    //TODO: Averiguar como borrar dates sin declarar campos opcionales, usar en dateTimeDone

    @Column
    dateTimeDone?: Date;

    @Default(false)
    @Column
    done!: boolean;

    @BelongsTo(()=>TaskTemplate, 'taskTemplateFk')
    template!: TaskTemplate;

    @BelongsTo(()=>Activity,'activityTaskFk')
    activity!: Activity;
}