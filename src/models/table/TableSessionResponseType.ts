import { TableSessionType } from "./TableSessionType";
import { MetaType } from "../MetaType";

export interface TableSessionResponseType {
  data: TableSessionType[];
  meta?: MetaType;
}
