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
  handleModalStateChange: (state: MenuListModalStateType) => void;
  handleCloseModal: () => void;
}

export type MenuListModalStateType = {
  type?: "edit" | "delete";
  value?: MenuFormType;
};
