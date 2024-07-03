import { PaginatedResponse } from '../../shared/classes/paginated-response';
import { IProvider, Provider } from "../model/provider.model"
import * as pagination from '../../shared/helpers/pagination';
import { Brand, IBrand } from '../../equipments/models/brand.model';


export const findAllProviders = (): Promise<Provider[]> => {
    return Provider.findAll();
}

export const getProvidersPage = async (page: number, limit: number): Promise<PaginatedResponse<Provider>> => {
    const findOptions = pagination.getFindOptions(page, limit)

    return Provider.findAndCountAll({
        distinct: true,
        limit: findOptions.limit,
        offset: findOptions.offset
    }).then(
        (result: { rows: Provider[]; count: number; }) => {
         
            return new PaginatedResponse<Provider>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
        })
}

export const getProviders = async (): Promise<Provider[]> => {
    return Provider.findAndCountAll({
        distinct: true,
    
    }).then(
        (result: { rows: Provider[]; count: number; }) => {
         
            return result.rows
        })
}

export const findProviderById = async (providerId: number): Promise<Provider | null> => {
    return Provider.findByPk(providerId)
}

export const saveProvider = async (provider: IProvider): Promise<Provider> => {
    const newProvider: Provider = new Provider({...provider});
    const saveProvider = await newProvider.save();
    if (provider.brands) {
            const brands: Promise<Brand | null>[] = provider.brands?.map(async (value: IBrand) => {
                return await Brand.findByPk(value.brandId);
            })
            Promise.all(brands).then((value: (Brand | null)[]) => {
                const brands: Brand[] = [];
                value.forEach((value: Brand | null) => {
                    if (value) brands.push(value);
                })
                saveProvider?.$set<Brand>('brands', brands);
            })
        }
    return saveProvider;
}

export const updateProvider = async (providerId: number, update: IProvider): Promise<Provider | null> => {
    let updateProvider: Provider | null = await Provider.findOne({ where: { providerId: providerId } });
    if (updateProvider) {
        updateProvider = updateProviderValues(updateProvider, update)
        if (update.brands) {
            const brands: Promise<Brand | null>[] = update.brands?.map(async (value: IBrand) => {
                return await Brand.findByPk(value.brandId);
            })
            Promise.all(brands).then((value: (Brand | null)[]) => {
                const brands: Brand[] = [];
                value.forEach((value: Brand | null) => {
                    if (value) brands.push(value);
                })
                updateProvider?.$set<Brand>('brands', brands);
            })
        }

        return updateProvider.save();
    } else {
        return null;
    }
}

export const deleteProvider = async (providerId: number): Promise<number> => {
    return Provider.destroy({ where: { providerId: providerId } })

}

const updateProviderValues = (original: Provider, target: IProvider) => {
    let originalP: Provider = original;
    originalP.name = target.name ? target.name : originalP.name;
    originalP.phone = target.phone ? target.phone : originalP.phone;
    originalP.address = target.address ? target.address : originalP.address;
    originalP.mail = target.mail ? target.mail : originalP.mail;
    return original;
}