import { Button, Table, TableProps, Tag } from "antd";
import { IconTrashXFilled } from "@tabler/icons-react";

import { formatDate, formatNumber } from "@/libs/utils";
import ConfirmModal from "@/components/ConfirmModal";
import { useAlertNotification } from "@/hooks/useAlertNotification";
import { OrderType } from "@/models/order/OrderType";

import { OrderHistoryListProps } from "./interface";
import { OrderStatusEnum, orderStatusLabel } from "@/enums/OrderStatusEnum";
import Text from "antd/es/typography/Text";

function OrderHistoryList({
  className,
  orderHistories,
  modalState,
  currentPage,
  totalItems,
  pageSize,
  handleModalStateChange,
  handleCloseModal,
  handleDeleteOrder,
  handleChangePage,
}: OrderHistoryListProps) {
  const alertNotification = useAlertNotification();
  const getStatusColor = (status: OrderStatusEnum) => {
    switch (status.toLowerCase()) {
      case OrderStatusEnum.COMPLETED:
        return "green";
      case OrderStatusEnum.IN_PROGRESS:
        return "blue";
      case OrderStatusEnum.CANCELLED:
        return "red";
      default:
        return "gold";
    }
  };
  const columns: TableProps<OrderType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      width: "7.5%",
      render: (val) => <p>#{val}</p>,
    },
    {
      title: "Table",
      dataIndex: "tableSession",
      key: "tableSession",
      ellipsis: true,
      width: "12.5%",
      render: (_, record) => <p>{record.tableSession.table.name}</p>,
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      ellipsis: true,
      width: "12.5%",
      render: (val) => <p>{formatNumber(Number(val), { minFracDigits: 2 })}</p>,
    },
    {
      title: "Order items",
      dataIndex: "orderItems",
      key: "orderItems",
      width: "20%",
      render: (_, record) => (
        <div className="flex flex-col">
          {record.orderItems.map((item) => (
            <Text
              key={item.id}
              ellipsis={{ tooltip: `${item.menuItem.name} x ${item.quantity}` }}
            >
              {item.menuItem.name} x {item.quantity}
            </Text>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "12.5%",
      render: (val: OrderStatusEnum) => (
        <Tag color={getStatusColor(val)}>{orderStatusLabel[val]}</Tag>
      ),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "12.5%",
      ellipsis: true,
      render: (_, record) => (
        <p className="text-[11px]">
          {formatDate(record.createdAt, "dd/MM/yyyy hh:mm")}
        </p>
      ),
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "12.5%",
      ellipsis: true,
      render: (_, record) => (
        <p className="text-[11px]">
          {formatDate(record.updatedAt, "dd/MM/yyyy HH:mm")}
        </p>
      ),
    },
    {
      title: "Updated by",
      dataIndex: "updatedBy",
      key: "updatedBy",
      ellipsis: true,
      width: "12.5%",
      render: (_, record) => <p>{record.updatedBy?.name}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      fixed: "end",
      width: "12.5%",
      render: (_, record) => (
        <Button
          type="text"
          onClick={() => {
            handleModalStateChange({
              type: "delete",
              value: {
                id: record.id,
                status: record.status,
              },
            });
          }}
        >
          <IconTrashXFilled className="size-5 text-red-500" />
        </Button>
      ),
    },
  ];
  return (
    <div className={className}>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={orderHistories}
        pagination={{
          pageSize,
          total: totalItems,
          current: currentPage,
          onChange: handleChangePage,
        }}
      />
      <ConfirmModal
        open={modalState.type === "delete"}
        onConfirm={async () => {
          if (!modalState.value?.id) return;
          await handleDeleteOrder(modalState.value.id, {
            onSuccess: () => {
              alertNotification.info({
                message: "Delete menu successfully.",
              });
              handleCloseModal();
            },
            onError: () => {
              alertNotification.error({ message: "Delete menu failed." });
            },
          });
        }}
        onCancel={handleCloseModal}
      >
        <p>
          Do you want to delete order{" "}
          <span className="text-blue-500">#{modalState.value?.id}</span>
        </p>
      </ConfirmModal>
    </div>
  );
}

export default OrderHistoryList;
