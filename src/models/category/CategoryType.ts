import { MenuType } from "../menu/MenuType";

export interface CategoryType {
  id: number;
  name: string;
  menus?: MenuType[];
}
