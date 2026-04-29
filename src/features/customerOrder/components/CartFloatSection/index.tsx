"use client";

import React from "react";
import { Button, Drawer, Empty, Divider, Space, FloatButton } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";

import { CartFloatSectionProps } from "./interface";
import { formatNumber } from "@/libs/utils";

export const CartFloatSection: React.FC<CartFloatSectionProps> = ({
  cartItems,
  isOpen,
  onClose,
  onOpenCart,
  onRemoveItem,
  onOrder,
  isLoading = false,
}) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.menu.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <FloatButton
          type="primary"
          icon={<ShoppingOutlined />}
          onClick={onOpenCart}
          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
          style={{
            fontSize: "20px",
            bottom: "1.5rem",
            right: "1.5rem",
          }}
          badge={{ count: totalItems }}
        />
      )}

      {/* Cart Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <ShoppingOutlined />
            <span>Your Cart</span>
            {cartItems.length > 0 && (
              <span className="text-orange-500 font-semibold">
                ({totalItems})
              </span>
            )}
          </div>
        }
        placement="bottom"
        onClose={onClose}
        open={isOpen}
        size="50%"
        className="w-full"
        styles={{ body: { padding: "0px 16px 16px" } }}
      >
        {cartItems.length === 0 ? (
          <Empty className="mt-4" description="Your cart is empty" />
        ) : (
          <div className="h-full flex flex-col">
            {/* Cart Items - Scrollable */}
            <div className="h-3/4 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={item.menu.id}>
                  <div className="py-3 flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                        {item.menu.name}
                      </h4>
                      <div className="flex space-x-2 items-center">
                        <span className="text-orange-500 font-semibold text-sm">
                          ${formatNumber(item.menu.price, { minFracDigits: 2 })}
                        </span>
                        <span className="text-gray-600 text-xs font-medium">
                          x{formatNumber(item.quantity)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-orange-500 mb-2 text-sm md:text-base">
                        $
                        {formatNumber(item.menu.price * item.quantity, {
                          minFracDigits: 2,
                        })}
                      </div>
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => onRemoveItem(item.menu.id)}
                      />
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <Divider className="my-0!" />
                  )}
                </div>
              ))}
            </div>

            {/* Total and Buttons - Fixed at Bottom */}
            <div className="flex-1 pt-4 border-t space-y-4 shrink-0">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-orange-500">
                  ${formatNumber(totalPrice, { minFracDigits: 2 })}
                </span>
              </div>

              <Space className="justify-end w-full gap-2">
                <Button className="flex-1" onClick={onClose}>
                  Continue Adding
                </Button>
                <Button
                  type="primary"
                  className="flex-1"
                  onClick={onOrder}
                  loading={isLoading}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};
