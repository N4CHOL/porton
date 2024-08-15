import { Composite } from "../models/composite.model"
import { SpareComponentHistory } from "../models/spare-component-history.model"
import { SpareComponent } from "../models/spare-component.model";

export const findSpareHistoryByTag = async (tag: string): Promise<SpareComponentHistory | null> => {
    return SpareComponentHistory.findOne({
        include: [{
            model: Composite,
            where: { tag: tag }
        }]
    });
}

export const getSpareComponentbyComponentId = async (component: Composite): Promise<SpareComponentHistory | null> => {
    const newSpare = await SpareComponentHistory.findOne({
        include: [{
            model: SpareComponent,
            where: { dateUninstalled: null }
        }],
        where: { spareComponentHistoryId: component.compositeId}
    })
    if (!newSpare) throw 'No se encontro el SpareComponentHistory'
    const spareName = newSpare.spareComponents
    // const spareName = newSpare?.spareComponents

    return newSpare
}