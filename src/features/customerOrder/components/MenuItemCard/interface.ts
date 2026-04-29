import { MenuType } from "@/models/menu/MenuType";

export interface MenuItemCardProps {
  menu: MenuType;
  onAddToCart: (menu: MenuType, quantity: number) => void;
}
