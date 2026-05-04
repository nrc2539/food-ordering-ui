import { MenuType } from "../menu/MenuType";

export interface CategoryType {
  id: number;
  name: string;
  menuItems?: MenuType[];
}
