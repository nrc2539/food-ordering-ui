import { useState } from "react";
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

    function handleCloseModal() {
      setModalState({ type: undefined, value: undefined });
    }

    const componentProps: UserListProps = {
      ...props,
      modalState,
      handleModalStateChange: setModalState,
      handleCloseModal,
    };
    return <Component {...componentProps} />;
  }
  return WithUserList;
}
