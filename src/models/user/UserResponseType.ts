import { UserType } from "./UserType";
import { MetaType } from "../MetaType";

export interface UserResponseType {
  data: UserType[];
  meta?: MetaType;
}
