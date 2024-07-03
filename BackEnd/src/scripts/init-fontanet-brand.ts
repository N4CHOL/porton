import { AssetModel } from "../app/equipments/models/asset-model.model";
import { Brand } from "../app/equipments/models/brand.model";
import { Color } from "../app/equipments/models/color.model";
import { MachineType } from "../app/equipments/models/machine-type.model";
import { Provider } from "../app/provider/model/provider.model";

const initFontanetBrand = async () => {
    const machineT: MachineType = new MachineType({ name: 'Caldera', description: 'Una Caldera' });
    const sMachineT: MachineType = await machineT.save();

    const brand: Brand = new Brand({ name: 'Fontanet', description: 'Fonta' });
    const sBrand: Brand = await brand.save();

    const model: AssetModel = new AssetModel({ name: 'E50', description: 'A' })
    const smodel: AssetModel = await model.save();
    const color: Color | null = await Color.findByPk(1);
    if (!color) return null;
    await smodel.$add<Color>('colors',color);

    await smodel.$set<Brand>('brand', sBrand);

    const provider: Provider = new Provider({
        name: 'Fontanet',
        phone:'353133322', 
        address:'Santa Fe'
    });
    await provider.save();
    await provider.$add('brands',brand);
}

export default initFontanetBrand;