"use client";

import { Empty, Spin } from "antd";

import { MenuItemCard } from "../MenuItemCard";
import { MenuGridProps } from "./interface";

function MenuGrid({ menus, loading = false, onAddToCart }: MenuGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (!menus || menus.length === 0) {
    return <Empty description="No menu items available" />;
  }

  return (
    <div className="p-4 grid grid-cols-1 gap-4 laptop:grid-cols-3">
      {menus.map((menu) => (
        <MenuItemCard key={menu.id} menu={menu} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default MenuGrid;
