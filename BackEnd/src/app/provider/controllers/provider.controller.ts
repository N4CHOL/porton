import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { Provider, IProvider} from '../model/provider.model'

// Services
import * as providerService from '../services/provider.service';

// export const getProviders = async (req: Request, res: Response) => {
//     await providerService.findAllProviders().then((providers: Provider[]) => {
//         return res.status(200).send(providers);
//     })
// };

export const getProvider = async (req: Request, res: Response) => {
    let providerId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!providerId) {
        return res.status(401).send();
    }
    providerService.findProviderById(providerId).then((provider: Provider | null) => {
        if (!provider) return res.status(404).send({ message: 'No se encontrò el proveedor'});
        return res.status(200).send(provider);
    }, (error: any) => {
        return res.status(500).send({ message: error});
    })
}

export const getProviders = (req: Request, res: Response) => {

    providerService.getProviders().then(
        (value: any | null) => {
            if (!value) {
                return res.status(404).json(`The requested asset doesn't exist`);
            }
            return res.status(200).json(value);
        },
        (err: any) => {
            return res.status(500).json(err);
        })
    
}

export const postProvider = async (req: Request, res: Response) => {
    await check('name', 'El nombre no puede estar vacío')
        .not()              //no es..
        .isEmpty()          //vacio
        .run(req);          //corre en Request por cada campo a verificar
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    const provider: IProvider = req.body;
    providerService.saveProvider(provider).then((val: Provider) => {
        return res.status(201).send(val);    
    }, (error: any) => {
        return res.status(500).send(error);
    })
};

export const updateProvider = async (req: Request, res: Response) =>  {
    let providerId: number | null = req.params.id ? Number(req.params.id) : null;
    let update: IProvider | null = req.body;

    if (!providerId) return res.status(404).send();
    if (!update) return res.status(401).send();

    await check('name', 'El nombre no puede estar vacío')
        .not()              //no es..
        .isEmpty()          //vacio
        .run(req);          //corre en Request

    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(500).send(errors.array());

    providerService.updateProvider(providerId, update).then((value: Provider | null) =>{
        if (!value) return res.status(404).send();

        return res.status(200).send(value);
    },  (rej:any) => {
        res.status(500).send(rej);
    })
}

export const deleteProvider = async (req: Request, res: Response) => {
    const providerId: number | null = req.params.id ? Number(req.params.id) : null;
    if (!providerId) return res.status(401).send();

    providerService.deleteProvider(providerId).then((val: number | null) => {
        if (val) {
            return res.status(200).send({rows: val});
        } else {
            return res.status(404).send({rows: val});
        }
        }, (rej: any) => {
            return res.status(500).send(JSON.parse(rej));
        })
}