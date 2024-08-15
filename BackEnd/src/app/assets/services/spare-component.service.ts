import { Op } from "sequelize"
import { Composite } from "../models/composite.model"
import { ISpareComponent, SpareComponent } from "../models/spare-component.model"
import { SpareComponentHistory } from "../models/spare-component-history.model"
import * as componentService from './component.service';
import * as spareComponentHistoryService from './spare-component-history.service';

export const findActiveSpareByTag = async (tag: string): Promise<SpareComponent | null> => {

    return SpareComponent.findOne({
        include: [
            {
                required: true,
                model: SpareComponentHistory,
                include: [
                    {
                        required: true,
                        model: Composite,
                        where: {
                            tag: tag
                        }
                    }]
            }],
        where: {
            dateUninstalled: {
                [Op.is]: null
            }
        }
    })
}

export const replaceSpareComponentByTag = async (spare: ISpareComponent, tag: string): Promise<SpareComponent | null> => {

    const today: Date = new Date();

    // Update current active spare
    let spareToReplace: SpareComponent | null = await findActiveSpareByTag(tag);
    if (spareToReplace) {
        spareToReplace.dateUninstalled = today;
        spareToReplace.save().then((val: SpareComponent) => {
            console.info('Previous spare updated.');
        }, (err: any) => {
            console.error('Error updating previous spare.');
        });
    }

    // Set new Spare
    let comp: SpareComponentHistory | null = await spareComponentHistoryService.findSpareHistoryByTag(tag);
    if (!comp) return null;

    const newSpareComp: SpareComponent = new SpareComponent({...spare});
    newSpareComp.dateInstalled = newSpareComp.dateInstalled ? newSpareComp.dateInstalled : today;

    const savedSpareComp: SpareComponent = await newSpareComp.save();

    await comp.$add<SpareComponent>('spareComponents', savedSpareComp);

    return savedSpareComp;
}