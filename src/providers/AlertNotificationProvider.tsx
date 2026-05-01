"use client";

import { notification } from "antd";
import { createContext } from "react";

interface AlertProps {
  title?: React.ReactNode;
  message: React.ReactNode;
}

interface AlertNotificationContextType {
  success: (props: AlertProps) => void;
  warning: (props: AlertProps) => void;
  info: (props: AlertProps) => void;
  error: (props: AlertProps) => void;
}

export const AlertNotificationContext =
  createContext<AlertNotificationContextType>(
    {} as AlertNotificationContextType,
  );

export function AlertNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [api, contextHolder] = notification.useNotification();

  function showAlertNotification(
    type: "info" | "success" | "warning" | "error",
    { title, message }: AlertProps,
  ) {
    api[type]({
      title,
      description: message,
      duration: 2.5,
      placement: "topRight",
    });
  }

  function success(props: AlertProps) {
    showAlertNotification("success", props);
  }
  function warning(props: AlertProps) {
    showAlertNotification("warning", props);
  }
  function info(props: AlertProps) {
    showAlertNotification("info", props);
  }
  function error(props: AlertProps) {
    showAlertNotification("error", props);
  }

  return (
    <AlertNotificationContext.Provider
      value={{ success, warning, info, error }}
    >
      {contextHolder}
      {children}
    </AlertNotificationContext.Provider>
  );
}
