import { PaginatedResponse } from "../classes/paginated-response";
import { Category, ICategory } from "../models/category.model";
import * as pagination from '../../shared/helpers/pagination';

export const getCategories = async (): Promise<Category[]> => {
  try {
    return Category.findAll();
  } catch (error) {

    return Promise.reject(error);
  }
};

export const getCategoriesPage = async (page: number, limit: number): Promise<PaginatedResponse<Category>> => {
  const findOptions = pagination.getFindOptions(page, limit)


  return Category.findAndCountAll({
    limit: findOptions.limit,
    offset: findOptions.offset
  }).then(
    (result: { rows: Category[]; count: number; }) => {

      return new PaginatedResponse<Category>(result.rows, result.count, limit, page, Math.ceil(result.count / limit));
    }
  )
}

export const getCategory = async (
  categoryId: number
): Promise<Category | null> => {
  try {
    return Category.findByPk(categoryId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveCategory = async (category: ICategory): Promise<Category> => {
  const newCategory: Category = new Category({...category});

  try {
    let categorySaved: Category = await newCategory.save();
    return categorySaved;
  } catch (error) {

    return Promise.reject(error);
  }
};

export const putCategory = async (
  categoryId: number, category: ICategory
): Promise<Category | null> => {
  try {
    const categ: Category | null = await Category.findByPk(categoryId);
    if (!categ) throw "No se pudo encontrar la categoría";
    return categ.update(category);
  } catch (error) {
      return Promise.reject(error);
  }
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  const categDel = await Category.findByPk(categoryId);
  return categDel?.destroy();
}