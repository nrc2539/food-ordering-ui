import { MenuType } from "@/models/menu/MenuType";

export interface CartFloatSectionProps {
  cartItems: CartItemType[];
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  onRemoveItem: (menuId: number) => void;
  onOrder: () => void;
  isLoading?: boolean;
}

export interface CartItemType {
  menu: MenuType;
  quantity: number;
}
