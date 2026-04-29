"use client";

import React from "react";
import { Drawer, Empty, Divider, Tag } from "antd";
import { HistoryOutlined } from "@ant-design/icons";

import { formatDate, formatNumber } from "@/libs/utils";
import { OrderHistorySectionProps } from "./interface";

export const OrderHistorySection: React.FC<OrderHistorySectionProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "green";
      case "pending":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <>
      {/* Order History Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <HistoryOutlined />
            <span>Order History</span>
          </div>
        }
        placement="bottom"
        onClose={onClose}
        open={isOpen}
        size="50%"
        className="w-full"
        styles={{ body: { padding: "16px" } }}
      >
        {orders.length === 0 ? (
          <Empty description="No orders yet" />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-3">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">
                            {item.menu.name}
                          </span>
                          <span className="text-gray-600">
                            x{formatNumber(item.quantity)}
                          </span>
                        </div>
                        {index < (order.items?.length || 0) - 1 && (
                          <Divider className="my-1!" />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No items</p>
                  )}
                </div>

                <div className="border-t pt-3 flex justify-between items-center font-semibold">
                  <span>Total:</span>
                  <span className="text-orange-500 text-lg">
                    ${formatNumber(order.totalPrice || 0, { minFracDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
};
