"use server";

import api from "@/libs/axios";
import { CategoryType } from "@/models/category/CategoryType";
import { CategoryFormType } from "@/models/category/CategoryFormType";

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

export { createCategory, updateCategory, deleteCategory };
