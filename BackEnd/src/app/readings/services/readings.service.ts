import { IIotReading, IIotRequest } from "../interfaces/iot-reading.interface";
import { Reading } from '../models/reading.model';
import { ReadingType } from '../models/reading-type.model';
import * as spareComponentService from '../../assets/services/spare-component.service';
import * as readingTypeService from './reading-type.service';
import * as readingTagService from './reading-tag.service';
import { Composite } from "../../assets/models/composite.model";
import { SpareComponent } from "../../assets/models/spare-component.model";
import { ReadingTag } from "../models/reading-tag.model";
import { SpareComponentHistory } from "../../assets/models/spare-component-history.model"
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { ReadingAverages } from "../classes/readings-averages";
import convert from "convert-units";

export const saveIIotRequest = async (reading: IIotRequest): Promise<Reading[] | null> => {
    try {
        const spare: SpareComponent | null = await spareComponentService.findActiveSpareByTag(reading.assetTag);
        if (!spare) return null;

        reading.readings.forEach((val: IIotReading) => {
   
            if (isNaN(val.value)) throw `${val.value} is not a number.`;
            if (!val.unit) throw `No unit provided for reading.`;
        })
        let readings: Promise<Reading>[] = reading.readings.map<Promise<Reading>>((val: IIotReading) => {
            return saveReading(val, spare);
        })
        return Promise.all(readings)
    } catch (e) {
   
        return Promise.reject(e);
    }
}

export const saveReading = async (reading: IIotReading, spare: SpareComponent): Promise<Reading> => {
    let today: Date = new Date();
    const newRead: Reading = new Reading({...reading});
    newRead.date = reading.date ? reading.date : today;
    const savedRead: Reading = await newRead.save();

    const type: ReadingType = await readingTypeService.findOrCreateType(reading.type.toUpperCase());
    const tag: ReadingTag = await readingTagService.findOrCreateTag(reading.tag.toUpperCase());

    await newRead.$set<ReadingType>('readingType', type);
    await newRead.$set<ReadingTag>('tag', tag);
    await spare.$add<Reading>('readings', newRead);

    return savedRead;
}

export const getReadingsByComponentTag = async (tag: string) => {
    return Reading.findAll({
        include: [
            {
                required: true,
                model: SpareComponent,
                include: [
                    {
                        required: true,
                        model: SpareComponentHistory
                        , include: [{
                            required: true,
                            model: Composite,
                            where: { tag: tag }
                        }]
                    }]
            }
        ],
        order:[['date','DESC']]
    })
}
export const getReadingsAveragesByComponentTag = async (tag: string): Promise<ReadingAverages[]> => {
    try {
        let tags: ReadingTag[] | null = await ReadingTag.findAll({
            include: [{
                required: true,
                model: Reading,
                include: [
                    {
                        model: SpareComponent,
                        required: true,
                        where: { dateUninstalled: { [Op.is]: null } },
                        include: [
                            {
                                model: SpareComponentHistory,
                                required: true,
                                include: [{
                                    model: Composite,
                                    required: true,
                                    where: { tag: tag }
                                }]
                            }]
                    },
                ]
            }]
        })

        const result: ReadingAverages[] = tags.map((tag: ReadingTag) => {
            let result: ReadingAverages = new ReadingAverages();
            result.name = tag.name;
            result.minimum = Math.min(...tag.readings.map((reading: Reading) => { return reading.value }));
            result.maximum = Math.max(...tag.readings.map((reading: Reading) => { return reading.value }))
            result.sum = tag.readings.map((reading: Reading) => { return reading.value }).reduce((prev: number, curr: number) => { return prev + curr });
            result.average = result.sum / tag.readings.length;
            return result;
        })

        return result;
    } catch (e) {
        return Promise.reject(e);
    }
}
export const getReadingsSummaryByComponentTag = async (tag: string) => {
    let readings: Reading[] = await Reading.findAll({

        include: [
            {
                model: SpareComponent,
                required: true,
                where: { dateUninstalled: { [Op.is]: null } },
                include: [
                    {
                        model: SpareComponentHistory,
                        required: true,
                        include: [{
                            model: Composite,
                            required: true,
                            where: { tag: tag }
                        }]
                    }]
            },
        ]
        , order: [[Sequelize.col('date'), 'DESC']]
    })

    let selected: Reading[] = []
    let tags: string[] = []

    readings.forEach((val: Reading, i: number, arr: Reading[]) => {
        if (!tags.includes(val.tag.tag)) {
            tags.push(val.tag.tag);
            selected.push(val);
        }
    })
    return selected;
}

const getReadingTags = (readings: Reading[]) => {
    let tags: string[] = readings.map((val: Reading) => {
        return val.tag.tag;
    })
    tags = tags.filter((val: string, i: number, arr: string[]) => {
        return arr.indexOf(val) === i;
    })
    return tags;
}
