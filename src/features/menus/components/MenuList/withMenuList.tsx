import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { MenuFormType } from "@/models/menu/MenuFormType";
import { deleteMenu, updateMenu } from "@/libs/actions/menu-actions";

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

    const { mutateAsync: handleUpdateMenu, isPending: isUpdatingMenu } =
      useMutation({
        mutationFn: (params: { id: number; form: MenuFormType }) =>
          updateMenu(params),
      });

    const { mutateAsync: handleDeleteMenu } = useMutation({
      mutationFn: (id: number) => deleteMenu(id),
    });

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const componentProps: MenuListProps = {
      ...props,
      modalState,
      isUpdatingMenu,
      handleModalStateChange: setModalState,
      handleCloseModal,
      handleUpdateMenu,
      handleDeleteMenu,
    };
    return <Component {...componentProps} />;
  }
  return WithMenuList;
}
