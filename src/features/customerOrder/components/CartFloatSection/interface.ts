import { CartItemType } from "@/models/cart/CartItemType";

export interface CartFloatSectionProps {
  cartItems: CartItemType[];
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  onRemoveItem: (menuId: number) => void;
  onOrder: () => void;
  isLoading?: boolean;
}
