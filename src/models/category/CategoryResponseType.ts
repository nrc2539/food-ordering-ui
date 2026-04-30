import { MetaType } from "../MetaType";
import { CategoryType } from "./CategoryType";

export interface CategoryResponseType {
  data: CategoryType[];
  meta?: MetaType;
}
