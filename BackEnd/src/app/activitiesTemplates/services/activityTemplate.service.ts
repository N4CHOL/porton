import { PaginatedResponse } from '../../shared/classes/paginated-response';
import { ActivityTemplate, IActivityTemplate } from '../models/activityTemplate.model';
import { ITaskTemplate, TaskTemplate } from '../models/taskTemplate.model';
import { saveTasksTmpl, editTaskTmpl } from '../services/taskTemplate.service';
import * as pagination from '../../shared/helpers/pagination';
import { Op, where } from 'sequelize';
import { Asset } from '../../assets/models/asset.model';
import { getAsset } from '../../assets/services/asset.service';
import { Composite } from '../../assets/models/composite.model';
import { getComponentById } from '../../assets/services/component.service';


export const getActivitiesTemplate = async (): Promise<ActivityTemplate[]> => {
    return ActivityTemplate.findAll({ include: { model: TaskTemplate } });
}

export const getActivitiesTemplateByWO = async (): Promise<ActivityTemplate[]> => {
    return ActivityTemplate.findAll({ include: { model: TaskTemplate, where: { activityTemplateFK: { [Op.not]: null } } } })
}

export const getActivitiesPage = async (page: number, limit: number): Promise<PaginatedResponse<ActivityTemplate>> => {
    const findOptions = pagination.getFindOptions(page, limit)

    return ActivityTemplate.findAndCountAll({
        distinct: true,
        limit: findOptions.limit,
        offset: findOptions.offset
    }).then(
        (result: { rows: ActivityTemplate[]; count: number; }) => {

            return new PaginatedResponse<ActivityTemplate>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
        })
}

export const getActivityTemplate = async (id: number): Promise<ActivityTemplate | null> => {
    return ActivityTemplate.findByPk(id, {
        include: [{ model: Asset }, { model: Composite }]
    });
}

export const saveActivityTemplate = async (activityTmpl: IActivityTemplate): Promise<ActivityTemplate | null> => {

    console.log("-------- AT..");

    const arrayTasks: TaskTemplate[] = [];
    for (let i = 0; i < activityTmpl.tasks?.length; i++) {
        activityTmpl.tasks[i].number = i;
        const taskTmpl: TaskTemplate | null = await saveTasksTmpl(activityTmpl.tasks[i]);
        if (!taskTmpl) return null;
        arrayTasks.push(taskTmpl);
    }
    console.log("-------- AT - task fin");
    const newActivityTmpl: ActivityTemplate = new ActivityTemplate({ ...activityTmpl });
    const saved: ActivityTemplate = await newActivityTmpl.save();

    //post asset
    if (activityTmpl.asset) {
        const asset: Asset | null = await getAsset(activityTmpl.asset.assetId)
        if (asset == null) throw "No existe el asset";
        await saved.$set('asset', asset)
    }
    //post composite
    if (activityTmpl.composite) {
        const composite: Composite | null = await getComponentById(activityTmpl.composite.compositeId)
        if (composite == null) throw "No existe el componente";
        await saved.$set('composite', composite)
    }
    console.log("-------- AT - new fin");


    console.log("-------- AT - save fin");
    if (arrayTasks?.length > 0) await saved.$add<TaskTemplate>('tasks', arrayTasks);
    console.log("-------- AT -fin");
    return saved;
}

export const deleteActivityTemplate = async (id: number): Promise<number | null> => {
    return ActivityTemplate.destroy({ where: { activityTemplateId: id } });
}

export const editActivityTemplate = async (id: string, activTmpl: IActivityTemplate): Promise<ActivityTemplate | null> => {
    let updateActivTmpl: ActivityTemplate | null = await ActivityTemplate.findByPk(id);
    const tasks: ITaskTemplate[] = activTmpl.tasks;
    const arrayTasks: TaskTemplate[] = [];
    const arrayPromise: Promise<TaskTemplate | null>[] = [];
    //añadir promise.all
    tasks.forEach(async (task, index) => {
        if (!task.number) {
            task.number = index;
        }
        arrayPromise.push(new Promise<TaskTemplate | null>((resolve, reject) => {
            if (!task.taskTemplateId) {

                const taskTmpl: Promise<TaskTemplate | null> = saveTasksTmpl(task);

                if (!taskTmpl) reject(null);
                taskTmpl.then((value: TaskTemplate | null) => {
                    if (!value) return null;
                    arrayTasks.push(value);
                    resolve(taskTmpl);
                }, err => {
                    reject(err);
                })
            } else {

                const taskTmpl: Promise<TaskTemplate | null> = editTaskTmpl(task);
                if (!taskTmpl) reject(null);
                taskTmpl.then((value: TaskTemplate | null) => {
                    if (!value) return null;
                    arrayTasks.push(value);
                    resolve(taskTmpl);
                }, err => {
                    reject(err);
                })
            }
        }))
    });

    Promise.all(arrayPromise).then(async () => {
        if (!updateActivTmpl) return null;
        await updateActivTmpl.update(activTmpl);
        await updateActivTmpl.$set<TaskTemplate>('tasks', arrayTasks);
    });

    return updateActivTmpl;
}