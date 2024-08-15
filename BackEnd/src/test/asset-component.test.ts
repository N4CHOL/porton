import { Asset, IAsset } from "../app/assets/models/asset.model"
import { Composite } from "../app/assets/models/composite.model";
import { Spare } from "../app/assets/models/spare.model";
import { AssetModel } from "../app/equipments/models/asset-model.model";
import { Brand } from "../app/equipments/models/brand.model";
import { MachineType } from "../app/equipments/models/machine-type.model";
import * as spareComponentService from '../app/assets/services/spare-component.service';

export const testComponents = async () => {

    const machineT: MachineType = new MachineType({ name: 'Caldera', description: 'Una Caldera' });
    const sMachineT: MachineType = await machineT.save();

    const brand: Brand = new Brand({ name: 'Fontanet', description: 'Fonta' });
    const sBrand: Brand = await brand.save();

    const model: AssetModel = new AssetModel({ name: 'E50', description: 'A' })
    const smodel: AssetModel = await model.save();

    await smodel.$set<Brand>('brand', sBrand);

    let ass = new Asset({
        tag: 'CAL01',
        location: 'Calderas',
        purchaseDate: new Date(),
        serialNumber: 'daa1233',
        provider: 'Fontanet'
    })

    let sass = await ass.save();
    await sass.$set<MachineType>('assetMachineType', sMachineT);
    await sass.$set<AssetModel>('assetModel', smodel);

    let composite: Composite = new Composite({ name: 'Bomba Izquierda', tag: 'BI' });
    let sCompo: Composite = await composite.save();

    let spare: Spare = new Spare({ name: 'Correa' });
    let sSpare: Spare = await spare.save();

    await sCompo.$add<Spare>('spares', sSpare);
    await sass.$add<Composite>('components', sCompo);

    spare = new Spare({ name: 'Tuerca' });
    sSpare = await spare.save();

    await sCompo.$add<Spare>('spares', sSpare);


    composite = new Composite({ name: 'Bomba Derecha', tag: 'BD' });
    sCompo = await composite.save();

    let motor: Composite = new Composite({ name: 'Motor de Bomba', tag: 'MB' });
    let sMotor = await motor.save();

    sCompo.$add<Composite>('components', sMotor);

    spare = new Spare({ name: 'Correa' });
    sSpare = await spare.save();

    await sCompo.$add<Spare>('spares', sSpare);

    await sass.$add<Composite>('components', sCompo);

    spare = new Spare({ name: 'Tuerca' });
    sSpare = await spare.save();

    await sCompo.$add<Spare>('spares', sSpare);

    const showAsset: Asset | null = await Asset.findByPk(sass.assetId, { include: [{ model: Composite, nested: true }] });
  
    const fCompo: Composite | null = await Composite.scope('full').findByPk(sCompo.compositeId);
    if (fCompo)

    await spareComponentService.replaceSpareComponentByTag({ dateInstalled: new Date() }, 'BD');

}