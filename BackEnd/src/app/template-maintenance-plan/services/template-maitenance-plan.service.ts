import { Profile } from "../../profile/models/profile.model";
import {
  ITemplateMPD,
  TemplateMPD,
} from "../models/template-maitenance-plan.model";
import * as profileService from "../../profile/services/profile.service";
import * as assetService from "../../assets/services/asset.service";
import * as priorityService from "../../shared/services/priority.service";
import { Asset } from "../../assets/models/asset.model";
import { Priority } from "../../shared/classes/priority.model";
import {
  ITemplateActivTempl,
  TemplateActivTempl,
} from "../models/template-activity-template.model";
import * as templateATSrv from "../services/template-activity-template.service";
//import { ActivityTemplate } from "../../activitiesTemplates/models/activityTemplate.model";
import { Composite } from "../../assets/models/composite.model";
import { resolve } from "bluebird";
import { IRecurrence, Recurrence } from "../models/recurrence.model";
import * as recurrenceSrv from './recurrence.service';
import { DaysOfWeek } from "../../shared/classes/daysOfWeek.model";
import { ActivityTemplate } from "../../activitiesTemplates/models/activityTemplate.model";

export const saveTemplateMPD = async (
  templateMPD: ITemplateMPD
): Promise<TemplateMPD> => {
  const temMPD: TemplateMPD = new TemplateMPD({ ...templateMPD });

  try {
    let temMPDS: TemplateMPD = await temMPD.save();
    //Asignar profile
    if (!templateMPD.asignee) throw "No hay asignado";
    if (!templateMPD.asignee.user) throw "No hay usuario";
    if (!templateMPD.asignee.user.userId) throw "El usuario no tiene ID";

    //Asignar Responsable
    const asignee: Profile | null = await profileService.findProfileByUserId(
      templateMPD.asignee.user.userId
    );
    if (!asignee) throw "El usuario no existe";
    await temMPDS.$set<Profile>("asignee", asignee);


    //Asignar asset
    if (templateMPD.asset && templateMPD.asset.assetId) {
      const asset: Asset | null = await assetService.getAsset(
        templateMPD.asset.assetId
      );
      if (asset) {
        await temMPDS.$set<Asset>("asset", asset);
      }
    }

    //Asignar priority
    if (!templateMPD.priority) throw "No hay prioridad";
    if (!templateMPD.priority.priorityId) throw "La prioridad no tiene ID";
    const priority: Priority | null = await Priority.findByPk(
      templateMPD.priority.priorityId
    );
    if (!priority) throw "La prioridad no existe";
    await temMPDS.$set<Priority>("priority", priority);


    // Asignar días de la semana
    const daysOfWeekId = templateMPD.daysOfWeek ? templateMPD.daysOfWeek.daysOfWeekId : null;

    if (daysOfWeekId) {
      const daysOfWeek: DaysOfWeek | null = await DaysOfWeek.findByPk(daysOfWeekId);
      if (daysOfWeek) {
        await temMPDS.$set<DaysOfWeek>("daysOfWeek", daysOfWeek);
      } else {
        throw "El día de la semana no existe";
      }
    } else {
      // Aquí puedes decidir qué hacer si `daysOfWeek` o `daysOfWeekId` son null
    }


    // Guardar Recurrencia si existe
    if (templateMPD.recurrence) {
      const recurrence: Recurrence | null = await recurrenceSrv.saveRecurrence(templateMPD.recurrence);
      if (!recurrence) throw 'La recurrencia no se pudo guardar';
      await temMPDS.$set<Recurrence>('recurrence', recurrence);
    }

    // Guardar TemplateActivityTemplate solo si existen actividades
    if (templateMPD.templActivitiesT && templateMPD.templActivitiesT.length > 0) {
      const templatesPromises: Promise<TemplateActivTempl>[] = [];
      let templatesAT: TemplateActivTempl[] = [];

      for (const templateAT of templateMPD.templActivitiesT) {
        templatesPromises.push(templateATSrv.saveTemplateATsinAT(templateAT));
      }

      templatesAT = await Promise.all(templatesPromises);
      await temMPDS.$set<TemplateActivTempl>("templActivitiesT", templatesAT);
    }

    return temMPDS;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getTemplateMPD = async (
  templateMPDId: number
): Promise<TemplateMPD | null> => {
  return TemplateMPD.findByPk(templateMPDId, {
    include: [
      { model: Asset },
      { model: Profile },
      { model: Priority },
      {
        model: TemplateActivTempl,
        include: [{ model: ActivityTemplate, include: [{model:Asset}, {model:Composite}] }, { model: Composite }],
      },
      { model: Recurrence }
    ],
  });
};

export const getTemplateMPDs = async (): Promise<TemplateMPD[] | null> => {
  try {
    return TemplateMPD.findAll({
      include: [
        { model: Asset },
        { model: Profile },
        { model: Priority },
        { model: TemplateActivTempl, include: [{ model: ActivityTemplate }] },
      ],
    });
  } catch (e) {

    return Promise.reject(e);
  }
};

export const getTemplatesMPDList = async (): Promise<TemplateMPD[] | null> => {
  try {
    return TemplateMPD.scope("lean").findAll();
  } catch (e) {

    return Promise.reject(e);
  }
};

export const editTemplateMPD = async (
  tempMPDId: number,
  templateMPD: ITemplateMPD
): Promise<TemplateMPD> => {
  try {
    console.log("---------1 ---------------");
    const tempMPD: TemplateMPD | null = await getTemplateMPD(tempMPDId);
    console.log("---------2 ---------------");
    if (!tempMPD) throw "No existe el template de orden de trabajo";
    if (!templateMPD.asignee || !templateMPD.asignee.profileId)
      throw "No existe el id del perfil del asignado";
    if (!templateMPD.priority || !templateMPD.priority.priorityId)
      throw "No existe la prioridad de la orden de trabajo.";
    console.log("---------3 ---------------");
    console.log("--------- 4 ---------------");
    // Verificar si existe el asignado
    const newAsignee: Profile | null = await Profile.findByPk(
      templateMPD.asignee.profileId
    );
    if (!newAsignee) throw "No existe el perfil del asignado";
    console.log("---------5 ---------------");
    // Verificar si existe la prioridad
    const newPriority: Priority | null = await Priority.findByPk(
      templateMPD.priority.priorityId
    );
    if (!newPriority) throw "No existe la prioridad";
    console.log("---------6 ---------------");

    tempMPD.set(templateMPD);

    //Cambiar asignado
    await tempMPD.$set<Profile>("asignee", newAsignee);

    //Cambiar prioridad
    await tempMPD.$set<Priority>("priority", newPriority);

    //Cambiar templateAT
    //console.log("---------QUIERO MORIR ---------------");
    
    // guardar templatesAT

    TemplateActivTempl.findAll({
      where: {
        templMPDTActivTmplFK: tempMPD.templateMPDId
      },
      raw: true
    }).then(res => res.forEach(tempActT => templateATSrv.deleteTemplateAT(tempActT.templateActivTemplId)))
    
    if (templateMPD.templActivitiesT && templateMPD.templActivitiesT.length > 0) {
      const templatesPromises: Promise<TemplateActivTempl>[] = [];
      let templatesAT: TemplateActivTempl[] = [];

      for (const templateAT of templateMPD.templActivitiesT) {
        templatesPromises.push(templateATSrv.saveTemplateATsinAT(templateAT));
      }

      templatesAT = await Promise.all(templatesPromises);
      await tempMPD.$set<TemplateActivTempl>("templActivitiesT", templatesAT);
    }

    //Verificar la recurrencia y actualizarla
    if (templateMPD.recurrence) {
      let recurrence: IRecurrence = templateMPD.recurrence
      if (recurrence.recurrenceId) {
        let updateRecurrence: Recurrence | null = await recurrenceSrv.editRecurrence(recurrence);
        tempMPD.$set<Recurrence>('recurrence', updateRecurrence);
      } else {
        let newRecurrence: Recurrence | null = await recurrenceSrv.saveRecurrence(recurrence);
        tempMPD.$set<Recurrence>('recurrence', newRecurrence);
      }
    } else {

      if (tempMPD.recurrence) {

        // tempMPD.$remove<Recurrence>('recurrence', tempMPD.recurrence);
        await recurrenceSrv.removeRecurrence(tempMPD.recurrence);
      }
    }

    await tempMPD.update(templateMPD);

    return tempMPD;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteTemplateMPD = async (tempMPDId: number): Promise<number> => {
  try {
    const tempMPD: TemplateMPD | null = await getTemplateMPD(tempMPDId);
    if (!tempMPD) throw "No existe el template de Orden de Trabajo";

    return TemplateMPD.destroy({ where: { templateMPDId: tempMPDId } });
  } catch (e) {

    return Promise.reject(e);
  }
};
