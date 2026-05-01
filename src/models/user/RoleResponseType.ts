import { MetaType } from "../MetaType";
import { RoleType } from "./RoleType";

export interface RoleResponseType {
  data: RoleType[];
  meta?: MetaType;
}
