import { CategoryType } from "@/models/category/CategoryType";

export interface CategoryTabsProps {
  categories: CategoryType[];
  activeCategory: number;
  onCategoryChange: (categoryId: number) => void;
}
