"use client";

import { message } from "antd";
import { createContext } from "react";

interface AlertProps {
  message: React.ReactNode;
}

interface AlertMessageContextType {
  success: (props: AlertProps) => void;
  warning: (props: AlertProps) => void;
  info: (props: AlertProps) => void;
  error: (props: AlertProps) => void;
}

export const AlertMessageContext = createContext<AlertMessageContextType>(
  {} as AlertMessageContextType,
);

export function AlertMessageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messageApi, contextHolder] = message.useMessage();

  function showAlertMessage(
    type: "info" | "success" | "warning" | "error",
    { message }: AlertProps,
  ) {
    messageApi[type](message);
  }

  function success(props: AlertProps) {
    showAlertMessage("success", props);
  }
  function warning(props: AlertProps) {
    showAlertMessage("warning", props);
  }
  function info(props: AlertProps) {
    showAlertMessage("info", props);
  }
  function error(props: AlertProps) {
    showAlertMessage("error", props);
  }
  return (
    <AlertMessageContext.Provider value={{ success, warning, info, error }}>
      {contextHolder}
      {children}
    </AlertMessageContext.Provider>
  );
}
