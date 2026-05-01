import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { CategoryType } from "@/models/category/CategoryType";
import { MenuFormType } from "@/models/menu/MenuFormType";
import { MenuType } from "@/models/menu/MenuType";

export interface WithMenuListProps {
  className?: string;
  menus: MenuType[];
  categories: CategoryType[];
}

export interface MenuListProps extends WithMenuListProps {
  modalState: MenuListModalStateType;
  isUpdatingMenu: boolean;
  handleModalStateChange: (state: MenuListModalStateType) => void;
  handleCloseModal: () => void;
  handleUpdateMenu: UseMutateAsyncFunction<
    void,
    Error,
    { id: number; form: MenuFormType },
    unknown
  >;
  handleDeleteMenu: UseMutateAsyncFunction<void, Error, number, unknown>;
}

export type MenuListModalStateType = {
  type?: "edit" | "delete";
  value?: MenuFormType;
};
