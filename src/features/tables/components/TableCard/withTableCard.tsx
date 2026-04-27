import { useState } from "react";
import {
  TableCardModalStateType,
  TableCardProps,
  WithTableCardProps,
} from "./interface";

export function withTableCard(Component: React.FC<TableCardProps>) {
  function WithTableCard(props: WithTableCardProps) {
    const [modalState, setModalState] = useState<TableCardModalStateType>({
      type: undefined,
      value: undefined,
    });

    const componentProps: TableCardProps = {
      ...props,
      modalState,
      handleModalStateChange: setModalState,
    };
    return <Component {...componentProps} />;
  }
  return WithTableCard;
}
