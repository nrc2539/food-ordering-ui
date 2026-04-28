import { notification } from "antd";

interface AlertProps {
  title?: React.ReactNode;
  message: React.ReactNode;
}

export function useAlertNotification() {
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

  return {
    success,
    warning,
    info,
    error,
    contextHolder,
  };
}
