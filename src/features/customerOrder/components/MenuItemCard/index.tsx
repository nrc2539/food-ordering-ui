"use client";

import React, { useState } from "react";
import { Button, Card, InputNumber, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { cn, formatNumber } from "@/libs/utils";
import { MenuItemCardProps } from "./interface";
import { IconToolsKitchen3 } from "@tabler/icons-react";

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  menu,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(menu, quantity);
      setQuantity(1); // Reset quantity after adding
    }
  };

  const isDisabled = !menu.isAvailable;

  return (
    <Card
      styles={{ body: { padding: 0 } }}
      className={cn("h-full flex flex-col hover:shadow-lg transition-shadow", {
        "opacity-60": isDisabled,
      })}
      hoverable={!isDisabled}
    >
      <div className="p-3 flex items-center space-x-3">
        <div className="w-1/4 bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center text-gray-300">
          <IconToolsKitchen3 className="size-8 text-orange-700" />
        </div>

        <div className="w-full flex items-center h-full space-x-4">
          <div className="w-3/4 flex flex-col space-y-1">
            <h3 className="font-semibold text-sm laptop:text-base truncate">
              {menu.name}
            </h3>
            <p className="text-orange-500 font-semibold text-base laptop:text-lg">
              ${formatNumber(menu.price, { minFracDigits: 2 })}
            </p>
            {isDisabled && (
              <p className="text-red-500 text-[10px] w-fit px-1 py-0.5 bg-red-200 rounded-md">
                Unavailable
              </p>
            )}
          </div>

          <div className="w-full flex flex-col space-y-2">
            <Space.Compact className="w-full">
              <InputNumber
                min={1}
                max={99}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                disabled={isDisabled}
                className="w-full"
                size="medium"
                mode="spinner"
              />
            </Space.Compact>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={isDisabled}
              className="w-full"
              size="middle"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
