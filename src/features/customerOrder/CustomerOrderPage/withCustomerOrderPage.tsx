import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CategoryType } from "@/models/category/CategoryType";
import { createOrder } from "@/libs/actions/order-actions";
import { useAlertMessage } from "@/hooks/useAlertMessage";
import { MenuType } from "@/models/menu/MenuType";

import { CartItemType } from "../components/CartFloatSection/interface";
import {
  CustomerOrderPageProps,
  WithCustomerOrderPageProps,
} from "./interface";

const MAX_ADDED_ITEM = 5;

export function withCustomerOrderPage(
  Component: React.FC<CustomerOrderPageProps>,
) {
  function WithCustomerOrderPage({
    categories: baseCategories,
    menus,
    tableSession,
    ...props
  }: WithCustomerOrderPageProps) {
    const [activeCategory, setActiveCategoryTab] = useState<number>(0); // Default to "All"
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const alertMessage = useAlertMessage();
    const queryClient = useQueryClient();

    const categories: CategoryType[] = useMemo(() => {
      // Add "All" category at the beginning
      return [{ id: 0, name: "All" }, ...baseCategories];
    }, [baseCategories]);

    const { mutateAsync: handleCreateOrder } = useMutation({
      mutationFn: (params: {
        tableSessionToken: string;
        items: CartItemType[];
      }) => createOrder(params),
      onSuccess: () => {},
    });

    async function handlePlaceOrder() {
      if (cartItems.length === 0) {
        alertMessage.warning({ message: "Your cart is empty" });
        return;
      }

      await handleCreateOrder(
        { tableSessionToken: tableSession.sessionToken, items: cartItems },
        {
          onSuccess: () => {
            alertMessage.success({ message: "Order placed successfully!" });
            setCartItems([]);
            setIsCartOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["order-histories", tableSession.sessionToken],
            });
          },
          onError: () => {
            alertMessage.error({ message: "Failed to place order" });
          },
        },
      );
    }

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
          alertMessage.warning({
            message: `Maximum ${MAX_ADDED_ITEM} different menus per order reached.`,
          });
          return prevItems;
        }

        return [...prevItems, { menu, quantity }];
      });
      if (cartItems.length < MAX_ADDED_ITEM) {
        alertMessage.success({
          message: `${quantity}x ${menu.name} added to cart`,
        });
      }
    }

    function handleRemoveItem(menuId: number) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.menu.id !== menuId),
      );
      alertMessage.info({ message: "Item removed from cart" });
    }

    // Filter menus by active category (show all if "All" category selected)
    const filteredMenus = useMemo(() => {
      if (activeCategory === 0) {
        return menus;
      }
      return menus?.filter((menu) => menu.category.id === activeCategory);
    }, [menus, activeCategory]);

    const componentProps: CustomerOrderPageProps = {
      ...props,
      tableSession,
      categories,
      menus,
      activeCategory,
      filteredMenus,
      cartItems,
      isCartOpen,
      isOrderLoading: false,
      handleChangeActiveCategory: setActiveCategoryTab,
      handleIsCardOpen: setIsCartOpen,
      handlePlaceOrder,
      handleAddToCart,
      handleRemoveItem,
    };
    return <Component {...componentProps} />;
  }
  return WithCustomerOrderPage;
}
