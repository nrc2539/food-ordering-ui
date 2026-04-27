import { SidebarMenuProps } from "./interface";
import { cn } from "@/libs/utils";
import SidebarMenuItem from "./components/SidebarMenuItem";
import {
  IconBookFilled,
  IconCategoryFilled,
  IconLogout,
  IconReceiptFilled,
  IconToolsKitchen2Filled,
  IconUserFilled,
} from "@tabler/icons-react";
import { Button } from "antd";

function SidebarMenu({ className }: SidebarMenuProps) {
  const menus = [
    {
      title: "Orders",
      path: "/management/orders",
      icon: <IconReceiptFilled className="size-5" />,
    },
    {
      title: "Tables",
      path: "/management/tables",
      icon: <IconToolsKitchen2Filled className="size-5" />,
    },
    {
      title: "Staff",
      path: "/management/staff",
      icon: <IconUserFilled className="size-5" />,
    },
    {
      title: "Categories",
      path: "/management/categories",
      icon: <IconCategoryFilled className="size-5" />,
    },
    {
      title: "Menus",
      path: "/management/menus",
      icon: <IconBookFilled className="size-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "p-4 tablet:p-5 flex flex-col h-full relative bg-amber-50/50",
        className,
      )}
    >
      <div className="text-3xl font-medium text-orange-800 mb-5">
        Food Ordeing Management
      </div>
      {menus.map((menu, index) => (
        <SidebarMenuItem
          className="py-3 text-xl"
          title={menu.title}
          path={menu.path}
          icon={menu.icon}
          key={index}
        />
      ))}
      <div className="h-full flex flex-col justify-end">
        <Button
          htmlType="button"
          size="large"
          className="text-xl text-gray-700 font-medium hover:border-red-500 hover:text-red-500"
          title="Logout"
        >
          <IconLogout className="size-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}

export default SidebarMenu;
