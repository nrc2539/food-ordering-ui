import { CategoryType } from "@/models/category/CategoryType";
import { MenuType } from "@/models/menu/MenuType";
import { TableSessionType } from "@/models/table/TableSessionType";
import { CartItemType } from "../components/CartFloatSection/interface";

export interface WithCustomerOrderPageProps {
  categories: CategoryType[];
  menus: MenuType[];
  tableSession: TableSessionType;
}

export interface CustomerOrderPageProps extends WithCustomerOrderPageProps {
  filteredMenus: MenuType[];
  cartItems: CartItemType[];
  isCartOpen: boolean;
  isOrderLoading: boolean;
  activeCategory: number;
  handleChangeActiveCategory: (id: number) => void;
  handleIsCardOpen: (isOpen: boolean) => void;
  handlePlaceOrder: () => Promise<void>;
  handleAddToCart: (menu: MenuType, quantity: number) => void;
  handleRemoveItem: (menuId: number) => void;
}
