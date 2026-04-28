import { CategoryType } from "@/models/category/CategoryType";
import { MenuType } from "@/models/menu/MenuType";
import React from "react";
import CreateMenuButton from "../components/CreateMenuButton";
import { MenuList } from "../components/MenuList";

function ManusPage() {
  // DESC: simulate fetch categories
  const mockCategories: CategoryType[] = Array.from({ length: 5 }).map(
    (_, i) => ({ id: i + 1, name: `Category ${i + 1}`, menus: [] }),
  );
  const mockMenus: MenuType[] = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Menu ${i + 1}`,
    price: i < 1 ? 70 : 50,
    isAvailable: i !== 3,
    category: {
      id: mockCategories[0].id,
      name: mockCategories[0].name,
    },
  }));

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Menus Management</h1>
        <CreateMenuButton categories={mockCategories} />
      </div>
      <MenuList className="" menus={mockMenus} categories={mockCategories} />
    </section>
  );
}

export default ManusPage;
