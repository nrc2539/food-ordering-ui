import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { UserFormType } from "@/models/user/UserFormType";
import { deleteUser, updateUser } from "@/libs/actions/user-actions";

import {
  UserListModalStateType,
  UserListProps,
  WithUserListProps,
} from "./interface";

export function withUserList(Component: React.FC<UserListProps>) {
  function WithUserList(props: WithUserListProps) {
    const [modalState, setModalState] = useState<UserListModalStateType>({
      type: undefined,
      value: undefined,
    });

    const { mutateAsync: handleUpdateUser } = useMutation({
      mutationFn: (params: { id: number; form: UserFormType }) =>
        updateUser(params),
    });

    const { mutateAsync: handleDeleteUser } = useMutation({
      mutationFn: (id: number) => deleteUser(id),
    });

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const componentProps: UserListProps = {
      ...props,
      modalState,
      handleModalStateChange: setModalState,
      handleCloseModal,
      handleUpdateUser,
      handleDeleteUser,
    };
    return <Component {...componentProps} />;
  }
  return WithUserList;
}
