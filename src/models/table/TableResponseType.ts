import { MetaType } from "../MetaType";
import { TableType } from "./TableType";

export interface TableResponseType {
  data: TableType[];
  meta?: MetaType;
}
