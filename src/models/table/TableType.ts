import { TableSessionType } from "./TableSessionType";

export interface TableType {
  id: number;
  name: string;
  isAvailable?: boolean;
  activeSession?: TableSessionType;
  sessions?: TableSessionType[];
}
