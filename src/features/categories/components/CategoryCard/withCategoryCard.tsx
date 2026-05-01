import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  deleteCategory,
  updateCategory,
} from "@/libs/actions/category-actions";
import { CategoryFormType } from "@/models/category/CategoryFormType";

import {
  CategoryCardModalStateType,
  CategoryCardProps,
  WithCategoryCardProps,
} from "./interface";

export function withCategoryCard(Component: React.FC<CategoryCardProps>) {
  function WithCategoryCard(props: WithCategoryCardProps) {
    const [modalState, setModalState] = useState<CategoryCardModalStateType>({
      type: undefined,
      value: undefined,
    });

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const { mutateAsync: handleUpdateCategory } = useMutation({
      mutationFn: (params: { id: number; form: CategoryFormType }) =>
        updateCategory(params),
    });

    const { mutateAsync: handleDeleteCategory } = useMutation({
      mutationFn: (id: number) => deleteCategory(id),
    });

    const componentProps: CategoryCardProps = {
      ...props,
      modalState,
      handleModalStateChange: setModalState,
      handleCloseModal,
      handleUpdateCategory,
      handleDeleteCategory,
    };
    return <Component {...componentProps} />;
  }
  return WithCategoryCard;
}
