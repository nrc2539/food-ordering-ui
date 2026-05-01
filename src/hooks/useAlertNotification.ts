import { useContext } from "react";
import { AlertNotificationContext } from "@/providers/AlertNotificationProvider";

export function useAlertNotification() {
  return useContext(AlertNotificationContext);
}
