import { PaginationType } from "@/interfaces/PaginationType";
import api from "@/libs/axios";
import { MenuResponseType } from "@/models/menu/MenuResponseType";
import { MenuType } from "@/models/menu/MenuType";

async function getMenus(params?: PaginationType): Promise<MenuResponseType> {
  const response = await api.get<MenuResponseType>("/menus", { params });
  return response.data;
}

async function getMenu(id: number): Promise<MenuType> {
  const response = await api.get<MenuType>(`/menus/${id}`);
  return response.data;
}

export { getMenus, getMenu };
