"use server";

import api from "@/libs/axios";
import { MenuType } from "@/models/menu/MenuType";
import { MenuFormType } from "@/models/menu/MenuFormType";

async function createMenu(form: MenuFormType): Promise<MenuType> {
  const createData = {
    name: form.name,
    price: form.price,
    categoryId: form.categoryId,
    isAvailable: form.isAvailable,
  };

  const response = await api.post<MenuType>("/menus", createData);
  return response.data;
}

async function updateMenu({
  id,
  form,
}: {
  id: number;
  form: MenuFormType;
}): Promise<void> {
  const updateData = {
    name: form.name,
    price: form.price,
    categoryId: form.categoryId,
    isAvailable: form.isAvailable,
  };

  await api.patch(`/menus/${id}`, updateData);
}

async function deleteMenu(id: number): Promise<void> {
  await api.delete(`/menus/${id}`);
}

export { createMenu, updateMenu, deleteMenu };
