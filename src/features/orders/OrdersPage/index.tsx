import { OrderStatusEnum, orderStatusLabel } from "@/enums/OrderStatusEnum";
import { TableSessionStatusEnum } from "@/enums/TableSessionStatusEnum";
import { MenuType } from "@/models/menu/MenuType";
import { OrderType } from "@/models/order/OrderType";
import { TableSessionType } from "@/models/table/TableSessionType";
import { OrderCard } from "../components/OrderCard";
import { OrderItemType } from "@/models/order/OrderItemType";
import OrderColumn from "../components/OrderColumn";

function OrdersPage() {
  const mockMenus: MenuType[] = [
    { id: 1, name: "Fired rice", price: 20, category: { id: 1, name: "rice" } },
    { id: 2, name: "Water", price: 10, category: { id: 2, name: "drink" } },
    { id: 3, name: "Soda", price: 15, category: { id: 2, name: "drink" } },
  ];

  const mockTableSession: TableSessionType = {
    id: 1,
    sessionToken: "session-token",
    status: TableSessionStatusEnum.ACTIVE,
    table: {
      id: 1,
      name: "Table No.1",
    },
  };
  const mockOrderItems: OrderItemType[] = [
    {
      id: 1,
      menu: mockMenus[0],
      quantity: 2,
      priceAtOrderTime: mockMenus[0].price,
    },
    {
      id: 2,
      menu: mockMenus[1],
      quantity: 1,
      priceAtOrderTime: mockMenus[1].price,
    },
    {
      id: 3,
      menu: mockMenus[2],
      quantity: 1,
      priceAtOrderTime: mockMenus[2].price,
    },
  ];
  const mockOrders: OrderType[] = Array.from({ length: 7 }).map((_, i) => ({
    id: i + 1,
    tableSession: mockTableSession,
    orderItems: mockOrderItems,
    status:
      i < 2
        ? OrderStatusEnum.PENDING
        : i < 4
          ? OrderStatusEnum.IN_PROGRESS
          : i < 6
            ? OrderStatusEnum.COMPLETED
            : OrderStatusEnum.CANCELLED,
    totalPrice: mockOrderItems.reduce(
      (acc, v) => acc + v.menu.price * v.quantity,
      0,
    ),
  }));
  return (
    <section className="h-full">
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Orders Management</h1>
      </div>
      <div className="h-full max-h-[calc(100%-20px-36px)] grid grid-cols-4 gap-4">
        <OrderColumn
          className="bg-amber-200"
          title={orderStatusLabel[OrderStatusEnum.PENDING]}
          orders={mockOrders.filter(
            (v) => v.status === OrderStatusEnum.PENDING,
          )}
        />
        <OrderColumn
          className="bg-blue-200"
          title={orderStatusLabel[OrderStatusEnum.IN_PROGRESS]}
          orders={mockOrders.filter(
            (v) => v.status === OrderStatusEnum.IN_PROGRESS,
          )}
        />
        <OrderColumn
          className="bg-green-200"
          title={orderStatusLabel[OrderStatusEnum.COMPLETED]}
          orders={mockOrders.filter(
            (v) => v.status === OrderStatusEnum.COMPLETED,
          )}
        />
        <OrderColumn
          className="bg-red-200"
          title={orderStatusLabel[OrderStatusEnum.CANCELLED]}
          orders={mockOrders.filter(
            (v) => v.status === OrderStatusEnum.CANCELLED,
          )}
        />
      </div>
    </section>
  );
}

export default OrdersPage;
