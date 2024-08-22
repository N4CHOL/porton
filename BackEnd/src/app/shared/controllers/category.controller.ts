import * as categorySrv from '../services/category.service';
import { Category, ICategory } from '../models/category.model';
import { Request, Response } from 'express';

export const getCategories = async (req: Request, res: Response) => {
  try {
    categorySrv.getCategories().then((categories: Category[]) => {
      return res.status(200).send(categories);
    });
  } catch (error) {

    return res.status(500).send(error);
  }
};

export const getCategoriesPage = (req: Request, res: Response) => {
  const page: number = req.query.page ? Number(req.query.page) : 0;
  const limit: number = req.query.limit ? Number(req.query.limit) : 10;

  categorySrv.getCategoriesPage(page, limit).then(
    (pagedCategories: any) => {

      return res.status(200).send(pagedCategories);
    },
    (err: any) => {
      return res.status(500).send(err);
    }
  );
};

export const postCategory = async (req: Request, res: Response) => {
  const category: ICategory = req.body;

  try {
    categorySrv.saveCategory(category).then(
      (category) => {
        return res.status(200).send(category);
      },
      (rej) => {
        return res.status(400).send(rej);
      }
    );
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    let categoryId: number | null = req.params.id
      ? Number(req.params.id)
      : null;
    if (!categoryId)
      return res.status(400).send({ message: 'No se pudo obtener categoryId' });
    categorySrv.getCategory(categoryId).then(
      (category: Category | null) => {
        if (!category) {
          return res
            .status(400)
            .send('Ocurrió un error al obtener la categoría');
        } else {
          return res.status(200).send(category);
        }
      },
      (rej: any) => {
        return res.status(400).send(rej);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

export const putCategory = async (req: Request, res: Response) => {
  try {
    const categoryId: number | null = req.params.id
      ? Number(req.params.id)
      : null;
    const category: ICategory | null = req.body;

    if (!categoryId)
      return res.status(400).send({ message: 'No se recibió ID' });
    if (!category)
      return res
        .status(400)
        .send({ message: 'No se recibió categoría para editar' });

    categorySrv.putCategory(categoryId, category).then(
      (category: Category | null) => {
        if (!category)
          return res.status(400).send({ message: 'No se pudo editar...' });
        return res.status(200).send(category);
      },
      (rej: any) => {
        return res.status(400).send(rej);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId: number | null = req.params.id
    ? Number(req.params.id)
    : null;
  if (!categoryId) throw 'No se recibió el ID de la categoría';
  categorySrv.deleteCategory(categoryId).then(
    () => {
      return res.status(200).send();
    },
    (rej: any) => {
      return res.status(500).send(rej);
    }
  );
};
