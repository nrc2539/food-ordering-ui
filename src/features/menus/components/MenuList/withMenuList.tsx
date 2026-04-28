import { useState } from "react";
import {
  MenuListModalStateType,
  MenuListProps,
  WithMenuListProps,
} from "./interface";

export function withMenuList(Component: React.FC<MenuListProps>) {
  function WithMenuList(props: WithMenuListProps) {
    const [modalState, setModalState] = useState<MenuListModalStateType>({
      type: undefined,
      value: undefined,
    });

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const componentProps: MenuListProps = {
      ...props,
      modalState,
      handleModalStateChange: setModalState,
      handleCloseModal,
    };
    return <Component {...componentProps} />;
  }
  return WithMenuList;
}
