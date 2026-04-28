import { CategoryFormType } from "@/models/category/CategoryFormType";
import { CategoryType } from "@/models/category/CategoryType";

export interface WithCategoryCardProps {
  data: CategoryType;
  className?: string;
}
export interface CategoryCardProps extends WithCategoryCardProps {
  modalState: CategoryCardModalStateType;
  handleModalStateChange: (state: CategoryCardModalStateType) => void;
}

export type CategoryCardModalStateType = {
  type?: "edit" | "delete";
  value?: CategoryFormType;
};
