import { useContext } from "react";
import { AlertMessageContext } from "@/providers/AlertMessageProvider";

export function useAlertMessage() {
  return useContext(AlertMessageContext);
}
