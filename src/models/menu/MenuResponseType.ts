import { MetaType } from "../MetaType";
import { MenuType } from "./MenuType";

export interface MenuResponseType {
  data: MenuType[];
  meta?: MetaType;
}
