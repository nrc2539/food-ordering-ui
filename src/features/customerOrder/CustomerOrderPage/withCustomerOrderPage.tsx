import { MenuType } from "@/models/menu/MenuType";
import { CustomerOrderPageProps } from "./interface";
import { CategoryType } from "@/models/category/CategoryType";
import { useMemo } from "react";

export function withCustomerOrderPage(
  Component: React.FC<CustomerOrderPageProps>,
) {
  function WithCustomerOrderPage() {
    const baseCategories: CategoryType[] = useMemo(
      () => [
        { id: 1, name: "Burgers" },
        { id: 2, name: "Pizza" },
        { id: 3, name: "Drinks" },
        { id: 4, name: "Desserts" },
      ],
      [],
    );

    // Demo data if not provided
    const categories: CategoryType[] = useMemo(() => {
      // Add "All" category at the beginning
      return [{ id: 0, name: "All" }, ...baseCategories];
    }, [baseCategories]);

    const menus: MenuType[] = useMemo(() => {
      return [
        {
          id: 1,
          name: "Classic Burger",
          category: baseCategories[0],
          price: 8.99,
          isAvailable: true,
        },
        {
          id: 2,
          name: "Cheese Burger",
          category: baseCategories[0],
          price: 9.99,
          isAvailable: true,
        },
        {
          id: 3,
          name: "Bacon Burger",
          category: baseCategories[0],
          price: 10.99,
          isAvailable: true,
        },
        {
          id: 4,
          name: "Margherita Pizza",
          category: baseCategories[1],
          price: 12.99,
          isAvailable: true,
        },
        {
          id: 5,
          name: "Pepperoni Pizza",
          category: baseCategories[1],
          price: 13.99,
          isAvailable: true,
        },
        {
          id: 6,
          name: "Vegetarian Pizza",
          category: baseCategories[1],
          price: 11.99,
          isAvailable: false,
        },
        {
          id: 7,
          name: "Cola",
          category: baseCategories[2],
          price: 2.99,
          isAvailable: true,
        },
        {
          id: 8,
          name: "Orange Juice",
          category: baseCategories[2],
          price: 3.99,
          isAvailable: true,
        },
        {
          id: 9,
          name: "Chocolate Cake",
          category: baseCategories[3],
          price: 5.99,
          isAvailable: true,
        },
        {
          id: 10,
          name: "Ice Cream",
          category: baseCategories[3],
          price: 4.99,
          isAvailable: true,
        },
      ];
    }, [baseCategories]);
    const componentProps: CustomerOrderPageProps = {
      categories,
      menus,
    };
    return <Component {...componentProps} />;
  }
  return WithCustomerOrderPage;
}
