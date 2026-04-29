"use client";

import React from "react";
import { Tabs } from "antd";

import { CategoryTabsProps } from "./interface";

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const items = categories.map((category) => ({
    key: String(category.id),
    label: category.name,
  }));

  return (
    <div className="sticky top-0 z-10 shadow-sm bg-white px-4 laptop:px-6">
      <Tabs
        items={items}
        activeKey={String(activeCategory)}
        onChange={(key) => onCategoryChange(Number(key))}
      />
    </div>
  );
};
