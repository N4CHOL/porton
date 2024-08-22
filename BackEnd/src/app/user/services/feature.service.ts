import { Feature, IFeature } from "../models/feature.model";

export const saveFeature = async (feature: IFeature): Promise<Feature> => {

    const newFeature: Feature = new Feature({...feature});
    return newFeature.save();
}

export const countFeatures = async (name: string): Promise<number> => {
    return Feature.count({ where: { name: name } })
}

export const findFeature = async (featureName: string) => {
    return Feature.findOne({ where: { name: featureName } });
}
