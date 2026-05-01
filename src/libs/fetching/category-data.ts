import { PaginationType } from "@/interfaces/PaginationType";
import api from "@/libs/axios";
import { CategoryResponseType } from "@/models/category/CategoryResponseType";
import { CategoryType } from "@/models/category/CategoryType";

async function getCategories(
  params?: PaginationType,
): Promise<CategoryResponseType> {
  const response = await api.get<CategoryType[]>("/menus/categories", {
    params,
  });
  return { data: response.data };
}

async function getCategory(id: number): Promise<CategoryType> {
  const response = await api.get<CategoryType>(`/menus/categories/${id}`);
  return response.data;
}

export { getCategories, getCategory };
