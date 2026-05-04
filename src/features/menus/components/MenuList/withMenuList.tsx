import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MenuFormType } from "@/models/menu/MenuFormType";
import { deleteMenu, updateMenu } from "@/libs/actions/menu-actions";

import {
  MenuListModalStateType,
  MenuListProps,
  WithMenuListProps,
} from "./interface";

export function withMenuList(Component: React.FC<MenuListProps>) {
  function WithMenuList(props: WithMenuListProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
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

    function handleChangePage(page: number) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`);
    }

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
      handleChangePage,
    };
    return <Component {...componentProps} />;
  }
  return WithMenuList;
}
