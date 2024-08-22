import { Provider } from "../../provider/model/provider.model";
import { PurchaseData, IPurchaseData } from "../models/purchaseData.model";

export const savePurchaseData = async (purchaseData: IPurchaseData): Promise<PurchaseData | null> => {
    const provider: Provider | null = await Provider.findByPk(purchaseData.provider?.providerId);
    const newPurchaseData: PurchaseData = new PurchaseData({...purchaseData});
    const saved: PurchaseData = await newPurchaseData.save();
    if (provider) saved.$set<Provider>('provider', provider);

    return saved;
}

export const editPurchaseData = async (purchaseData: IPurchaseData): Promise<PurchaseData | null> => {
    let updatePurchaseData: PurchaseData | null = await PurchaseData.findOne({ where: { purchaseDataId: purchaseData.purchaseDataId } })
    const provider: Provider | null = await Provider.findByPk(purchaseData.provider.providerId);
    if (!updatePurchaseData || !provider) return null;
    await updatePurchaseData.update(purchaseData);
    await updatePurchaseData.$set<Provider>('provider', provider);
    return updatePurchaseData;
}



export const deletePurchaseData = async (id: string): Promise<number | null> => {
    return PurchaseData.destroy({ where: { purchaseDataId: id } })
}