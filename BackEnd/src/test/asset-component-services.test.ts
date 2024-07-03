import initFontanetBrand from '../scripts/init-fontanet-brand';
import * as assetService from '../app/assets/services/asset.service';
import * as componentService from '../app/assets/services/component.service';
import * as spareComponentService from '../app/assets/services/spare-component.service';
import { Asset } from '../app/assets/models/asset.model';
import { Composite } from '../app/assets/models/composite.model';


export const testComponentsServices = async () => {

    await initFontanetBrand();

    let asset: Asset | null = await assetService.saveAsset({
        tag: 'CAL01',
        location: 'Calderas',
        serialNumber: 'daa1233',
        provider: 'Fontanet',
        purchaseData: {
            purchaseDate: new Date(),
            warrantyDate: new Date(),
            provider: {
                providerId: 1,
                name: 'Fontanet',
                phone: '353133322',
                address: 'Santa Fe'
            }
        }
        ,color:{colorId:1, name:'Rojo'},
        sector: { sectorId: 1, name: 'calderas', number: 1, internalNumber: 1 },
        assetMachineType: { machineTypeId: 1, name: 'Caldera', description: '' },
        assetModel: {
            assetModelId: 1, name: 'E50', description: 'A',
            
            brand: {
                brandId: 1,
                name: 'Fontanet',
                description: 'Fonta'
            }
        }
    })

    if (!asset) {
 
        return null
    };

    let motorIzq: Composite | null = await componentService.saveComponent({ tag: 'CAL01MI', name: 'Motor Izquierdo' }, asset.tag);
    let spare = await spareComponentService.replaceSpareComponentByTag({ dateInstalled: new Date() }, 'CAL01MI');
    let fuenteAlimentacion = await componentService.saveComponent({ tag: 'CAL01MIFA', name: 'Fuente de Alimentacion' }, 'CAL01MI');
    let motorder: Composite | null = await componentService.saveComponent({ tag: 'CAL01MD', name: 'Motor Derecho' }, asset.tag);
    fuenteAlimentacion = await componentService.saveComponent({ tag: 'CAL01MDFA', name: 'Fuente de Alimentacion' }, 'CAL01MD');
    spare = await spareComponentService.replaceSpareComponentByTag({ dateInstalled: new Date() }, 'CAL01MD');


}