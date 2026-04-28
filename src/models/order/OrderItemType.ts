import { MenuType } from "../menu/MenuType";

export interface OrderItemType {
  id: number;
  menu: MenuType;
  quantity: number;
  priceAtOrderTime: number;
}
