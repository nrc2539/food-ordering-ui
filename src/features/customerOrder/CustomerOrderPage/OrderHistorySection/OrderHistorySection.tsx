import { Button } from "antd";
import { IconHistory } from "@tabler/icons-react";

import { OrderHistoryDrawer } from "../../components/OrderHistoryDrawer";
import { OrderHistorySectionProps } from "./interface";

function OrderHistorySection({
  isHistoryOpen,
  orderHistory,
  handleIsHistoryOpen,
}: OrderHistorySectionProps) {
  return (
    <>
      <Button
        type="text"
        onClick={() => handleIsHistoryOpen(true)}
        className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 hover:bg-orange-50 transition-colors"
      >
        <IconHistory className="size-5" />
        <span>History ({orderHistory.length})</span>
      </Button>
      {/* Order History Section */}
      <OrderHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => handleIsHistoryOpen(false)}
        orders={orderHistory}
      />
    </>
  );
}

export default OrderHistorySection;
