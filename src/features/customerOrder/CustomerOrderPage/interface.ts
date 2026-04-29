import { CategoryType } from "@/models/category/CategoryType";
import { MenuType } from "@/models/menu/MenuType";

export interface CustomerOrderPageProps {
  categories: CategoryType[];
  menus: MenuType[];
}
