export enum OrderStatusEnum {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export const orderStatusLabel = {
  [OrderStatusEnum.PENDING]: "Pending",
  [OrderStatusEnum.IN_PROGRESS]: "In progress",
  [OrderStatusEnum.COMPLETED]: "Complete",
  [OrderStatusEnum.CANCELLED]: "Cancelled",
};
