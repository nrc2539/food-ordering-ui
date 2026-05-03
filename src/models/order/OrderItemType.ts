import { MenuType } from "../menu/MenuType";

export interface OrderItemType {
  id: number;
  menuItem: MenuType;
  quantity: number;
  priceAtOrderTime: number;
}
