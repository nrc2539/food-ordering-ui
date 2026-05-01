import { useState, useMemo } from "react";
import { Button, Empty } from "antd";
import { MenuType } from "@/models/menu/MenuType";

import { CartItemType } from "@/models/cart/CartItemType";
import { CategoryTabs } from "../components/CategoryTabs";
import MenuGrid from "../components/MenuGrid";
import { CartFloatSection } from "../components/CartFloatSection";
import { OrderHistorySection } from "../components/OrderHistorySection";
import { useAlertMessage } from "@/hooks/useAlertMessage";
import { IconHistory } from "@tabler/icons-react";
import { CustomerOrderPageProps } from "./interface";
import { OrderHistoryItem } from "../components/OrderHistorySection/interface";

const MAX_ADDED_ITEM = 5;

export default function CustomerOrderPage({
  categories,
  menus,
}: CustomerOrderPageProps) {
  const { success, warning, info, error } = useAlertMessage();

  const [activeCategory, setActiveCategory] = useState<number>(0); // Default to "All"
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Filter menus by active category (show all if "All" category selected)
  const filteredMenus = useMemo(() => {
    if (activeCategory === 0) {
      return menus;
    }
    return menus?.filter((menu) => menu.category.id === activeCategory);
  }, [menus, activeCategory]);

  function handleAddToCart(menu: MenuType, quantity: number) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menu.id === menu.id);

      // If item already in cart, just increase quantity
      if (existingItem) {
        return prevItems.map((item) =>
          item.menu.id === menu.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // If adding a new menu item, check if we're at 10 different menus limit
      if (prevItems.length >= MAX_ADDED_ITEM) {
        warning({
          message: `Maximum ${MAX_ADDED_ITEM} different menus per order reached.`,
        });
        return prevItems;
      }

      return [...prevItems, { menu, quantity }];
    });
    if (cartItems.length < MAX_ADDED_ITEM) {
      success({ message: `${quantity}x ${menu.name} added to cart` });
    }
  }

  function handleRemoveItem(menuId: number) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.menu.id !== menuId),
    );
    info({ message: "Item removed from cart" });
  }

  async function handlePlaceOrder() {
    if (cartItems.length === 0) {
      warning({ message: "Your cart is empty" });
      return;
    }

    setIsOrderLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Calculate total price
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.menu.price * item.quantity,
        0,
      );

      // Add to order history
      const newOrder: OrderHistoryItem = {
        id: orderHistory.length + 1,
        items: cartItems,
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      setOrderHistory((prev) => [newOrder, ...prev]);
      success({ message: "Order placed successfully!" });
      setCartItems([]);
      setIsCartOpen(false);
    } catch {
      error({ message: "Failed to place order" });
    } finally {
      setIsOrderLoading(false);
    }
  }

  if (categories.length === 0 || menus.length === 0) {
    return (
      <Empty
        className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2"
        description="Some thing went wrong. Please try again later."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Header */}
      <div className="relative z-11 flex items-center justify-between bg-white px-4 laptop:px-6 py-4">
        <div>
          <h1 className="text-2xl laptop:text-3xl font-bold text-orange-500">
            Order Your Food
          </h1>
          <p className="text-gray-600 text-sm laptop:text-base mt-1">
            Select items and place your order
          </p>
        </div>
        {/* History Button */}
        <Button
          type="text"
          onClick={() => setIsHistoryOpen(true)}
          className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 hover:bg-orange-50 transition-colors"
        >
          <IconHistory className="size-5" />
          <span>History ({orderHistory.length})</span>
        </Button>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(categoryId) => setActiveCategory(categoryId)}
      />

      {/* Menu Items Grid */}
      <MenuGrid menus={filteredMenus} onAddToCart={handleAddToCart} />

      {/* Cart Float Section */}
      <CartFloatSection
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
        onRemoveItem={handleRemoveItem}
        onOrder={handlePlaceOrder}
        isLoading={isOrderLoading}
      />

      {/* Order History Section */}
      <OrderHistorySection
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orderHistory}
      />
    </div>
  );
}
