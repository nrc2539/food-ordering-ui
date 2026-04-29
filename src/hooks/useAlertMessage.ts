import { message } from "antd";

interface AlertProps {
  message: React.ReactNode;
}
export function useAlertMessage() {
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

  return {
    success,
    warning,
    info,
    error,
    contextHolder,
  };
}
