import { CategoryType } from "../category/CategoryType";

export interface MenuType {
  id: number;
  name: string;
  category: CategoryType;
  price: number;
  isAvailable?: boolean;
}
