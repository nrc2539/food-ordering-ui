import { MenuType } from "@/models/menu/MenuType";

export interface MenuGridProps {
  menus: MenuType[];
  loading?: boolean;
  onAddToCart: (menu: MenuType, quantity: number) => void;
}
