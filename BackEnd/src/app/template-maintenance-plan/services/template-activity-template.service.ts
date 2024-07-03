import { ActivityTemplate } from "../../activitiesTemplates/models/activityTemplate.model";
import { ITemplateActivTempl, TemplateActivTempl } from "../models/template-activity-template.model";
import * as activTmplSrv from '../../activitiesTemplates/services/activityTemplate.service';
import { Composite } from "../../assets/models/composite.model";
import * as compositeSrv from '../../assets/services/component.service'

export const saveTemplateAT = async (templateAT: ITemplateActivTempl) => {
    const newTemplateAT: TemplateActivTempl = new TemplateActivTempl({ ...templateAT });
    const saved: TemplateActivTempl = await newTemplateAT.save();

    //Asignar ActivityTemplate
    if (templateAT.activityTmpl) {
        const activityTmpl: ActivityTemplate | null = await activTmplSrv.getActivityTemplate(templateAT.activityTmpl.activityTemplateId)
        if (!activityTmpl) throw 'El activity template no existe';
        await saved.$set('activityTmpl', activityTmpl)
    }

    //Asignar Component
    if (!templateAT.composite) throw 'No hay componente';
    const component: Composite | null = await compositeSrv.getComponentById(templateAT.composite.compositeId);
    await saved.$set('composite', component);

    return saved;
}

export const saveTemplateATsinAT = async (templateAT: ITemplateActivTempl) => {

    const newTemplateAT: TemplateActivTempl = new TemplateActivTempl({ ...templateAT });
    const saved: TemplateActivTempl = await newTemplateAT.save();

    //crear ActivityTemplate
    if (templateAT.activityTmpl) {
        const activityTmpl: ActivityTemplate | null = await activTmplSrv.saveActivityTemplate(templateAT.activityTmpl)
        await saved.$set('activityTmpl', activityTmpl)
    }

    //Asignar Component
    if (templateAT.composite?.compositeId) {
        const component: Composite | null = await compositeSrv.getComponentById(templateAT.composite.compositeId);
        await saved.$set('composite', component);
    }

    return saved;
}

export const editTemplateAT = async (templateAT: ITemplateActivTempl): Promise<TemplateActivTempl> => {
    try {
        //console.log("--------- editar---------------");
        let updateTemplateAT: TemplateActivTempl | null = await TemplateActivTempl.findByPk(templateAT.templateActivTemplId);
        if (!updateTemplateAT) throw 'No existe el template de activity template';
        await updateTemplateAT.update(templateAT);
        //Asignar Componente
        if (!templateAT.composite) throw 'No hay componente';
        const component: Composite | null = await compositeSrv.getComponentById(templateAT.composite.compositeId);
        if (!component) throw 'No existe el componente';
        await updateTemplateAT.$set('composite', component);
        return updateTemplateAT;
    } catch (e) {
        return Promise.reject(e);
    }

}


export const getTemplateAT = async (
    templateATId: number
  ): Promise<TemplateActivTempl | null> => {
    return TemplateActivTempl.findByPk(templateATId);
};


export const deleteTemplateAT = async (tempATId: number): Promise<number> => {
    try {
      const tempAT: TemplateActivTempl | null = await getTemplateAT(tempATId);
     // console.log("-------------- cdfasgvhbjknlm", tempATId);
     // console.log(tempAT?.templateActivTemplId);
      
      if (!tempAT) throw "No existe el tempAT";
  
      return TemplateActivTempl.destroy({ where: { templateActivTemplId: tempATId } });
    } catch (e) {
  
      return Promise.reject(e);
    }
  };