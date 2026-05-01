import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { UserFormType } from "@/models/user/UserFormType";
import { UserType } from "@/models/user/UserType";
import { RoleType } from "@/models/user/RoleType";

export interface WithUserListProps {
  className?: string;
  users: UserType[];
  roles: RoleType[];
}

export interface UserListProps extends WithUserListProps {
  modalState: UserListModalStateType;
  handleModalStateChange: (state: UserListModalStateType) => void;
  handleCloseModal: () => void;
  handleUpdateUser: UseMutateAsyncFunction<
    void,
    Error,
    { id: number; form: UserFormType },
    unknown
  >;
  handleDeleteUser: UseMutateAsyncFunction<void, Error, number, unknown>;
}

export type UserListModalStateType = {
  type?: "edit" | "delete";
  value?: UserFormType;
};
