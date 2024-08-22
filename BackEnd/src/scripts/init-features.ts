import * as featuresService from '../app/user/services/feature.service';
import { FEATURES } from '../environments/constants';

export const initFeatures = async () => {
    const features: string[] = Object.values(FEATURES);
    features.forEach(async (feat: string) => {
        const featureAmount: number = await featuresService.countFeatures(feat);
        if (!featureAmount) await featuresService.saveFeature({ name: feat });
        
    })
}