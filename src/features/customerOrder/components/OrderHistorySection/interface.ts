import { CartItemType } from "@/models/cart/CartItemType";

export interface OrderHistorySectionProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
}

export interface OrderHistoryItem {
  id: number;
  items: CartItemType[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

type OrderItem = {
  id: number;
  items: CartItemType[];
  totalPrice: number;
  status: string;
  createdAt: string;
};
