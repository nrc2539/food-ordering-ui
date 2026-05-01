import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { CategoryFormType } from "@/models/category/CategoryFormType";
import { CategoryType } from "@/models/category/CategoryType";

export interface WithCategoryCardProps {
  data: CategoryType;
  className?: string;
}
export interface CategoryCardProps extends WithCategoryCardProps {
  modalState: CategoryCardModalStateType;
  handleModalStateChange: (state: CategoryCardModalStateType) => void;
  handleCloseModal: () => void;
  handleUpdateCategory: UseMutateAsyncFunction<
    void,
    Error,
    {
      id: number;
      form: CategoryFormType;
    },
    unknown
  >;
  handleDeleteCategory: UseMutateAsyncFunction<void, Error, number, unknown>;
}

export type CategoryCardModalStateType = {
  type?: "edit" | "delete";
  value?: CategoryFormType;
};
