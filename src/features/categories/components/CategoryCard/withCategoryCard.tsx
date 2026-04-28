import { useState } from "react";
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

    const componentProps: CategoryCardProps = {
      ...props,
      modalState,
      handleModalStateChange: setModalState,
    };
    return <Component {...componentProps} />;
  }
  return WithCategoryCard;
}
