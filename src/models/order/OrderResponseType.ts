import { MetaType } from "../MetaType";
import { OrderType } from "./OrderType";

export interface OrderResponseType {
  data: OrderType[];
  meta?: MetaType;
}
