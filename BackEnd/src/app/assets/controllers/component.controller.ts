import { Composite } from '../models/composite.model';
import * as componentService from '../services/component.service';
import { Request, Response } from 'express';

export const getComponentById = async (req: Request, res: Response) => {

    const id: number | null = req.params.id ? Number(req.params.id) : null;
    if (!id) return res.status(401).send();
    const component: Composite | null = await componentService.getComponentById(id);
    if (!component) return res.status(404).send();
    return res.status(200).send(component);
}

export const getComponentByTag = async (req: Request, res: Response) => {

    const tag: string | null = req.params.tag ? req.params.tag : null;
    if (!tag) return res.status(401).send();
    const component: Composite | null = await componentService.getComponentByTag(tag);
    if (!component) return res.status(404).send();
    return res.status(200).send(component);
}

export const getComponentsByString = async (req: Request, res: Response) => {

    const assetId: string | null = req.params.assetId ? req.params.assetId : null;
    const substring: any | null = req.query.string ? req.query.string : null;
    if (!substring || !assetId ) return null;
    const components: Composite[] | null = await componentService.getComponentsByString(substring, assetId)
    return res.status(200).send(components);
}

export const saveComponent = async (req: Request, res: Response) => {

    const parentTag: string | null = req.params.parentComponentTag ? req.params.parentComponentTag : null;
    if (!parentTag) return res.status(404).send();

    const component: Composite | null = await componentService.saveComponent(req.body, parentTag);
    if (component) {
        return res.status(200).send(component);
    } else {
        return res.status(500).send();
    }
}

export const getComponentChildrenByTag = async (req: Request, res: Response) => {
    const tag: string | null = req.params.tag ? req.params.tag : null;
    if (!tag) return res.status(401).send();
    const component: Composite[] | null = await componentService.getComponentChildrenByTag(tag);
    if (!component) return res.status(404).send();
    return res.status(200).send(component);
}

export const getAllComponentChildren = async (req: Request, res: Response) => {

    const tag: string | null = req.params.tag ? req.params.tag : null;
    if (!tag) return res.status(401).send();
    const component: Composite[] | null = await componentService.getAllComponentChildren(tag);
    if (!component) return res.status(404).send();
   
    return res.status(200).send(component);
}

export const editComponent = async (req: Request, res: Response) => {
    const tag: string | null = req.params.tag ? req.params.tag : null;
    if (!tag) return res.status(404).send({ message: 'No tag sent' });
    const component: Composite | null = await componentService.editComponent(tag, req.body);
    if (!component) return res.status(404).send({ message: 'Component not found' });
    return res.status(200).send(component);
}

export const deleteComponent = async (req: Request, res: Response) => {
    const id: number | null = req.params.id ? Number(req.params.id) : null;
    if (!id) return res.status(401).send();
    componentService.deleteComponent(id).then((rows: number) => {
        if (!rows) return res.status(404).send();
        return res.status(200).send({ rows: rows });
    })
}
