"use server";

import api from "@/libs/axios";
import { CategoryType } from "@/models/category/CategoryType";
import { CategoryFormType } from "@/models/category/CategoryFormType";
import { CategoryResponseType } from "@/models/category/CategoryResponseType";
import { PaginationType } from "@/interfaces/PaginationType";

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

async function createCategory(form: CategoryFormType): Promise<CategoryType> {
  const createData = {
    name: form.name,
  };

  const response = await api.post<CategoryType>(
    "/menus/categories",
    createData,
  );
  return response.data;
}

async function updateCategory({
  id,
  form,
}: {
  id: number;
  form: CategoryFormType;
}): Promise<void> {
  const updateData = {
    name: form.name,
  };

  await api.patch(`/menus/categories/${id}`, updateData);
}

async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/menus/categories/${id}`);
}

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
