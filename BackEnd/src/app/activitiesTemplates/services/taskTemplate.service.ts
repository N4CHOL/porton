import { TaskTemplate, ITaskTemplate } from '../models/taskTemplate.model';

export const saveTasksTmpl = async (taskTemplate: ITaskTemplate): Promise<TaskTemplate | null> => {

    const newTaskTmpl: TaskTemplate = new TaskTemplate({...taskTemplate});
    const saved: TaskTemplate = await newTaskTmpl.save();
    
    return saved;
}

export const editTaskTmpl = async (taskTemplate: ITaskTemplate): Promise<TaskTemplate | null> => {
 
    let updateTaskTmpl: TaskTemplate | null = await TaskTemplate.findByPk(taskTemplate.taskTemplateId);

    if (!updateTaskTmpl) return null;
    await updateTaskTmpl.update(taskTemplate);
    return updateTaskTmpl;
}