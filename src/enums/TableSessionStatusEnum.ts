export enum TableSessionStatusEnum {
  ACTIVE = "active",
  CLOSED = "closed",
}

export const tableSessionStatusLabel = {
  [TableSessionStatusEnum.ACTIVE]: "Active",
  [TableSessionStatusEnum.CLOSED]: "Closed",
};
