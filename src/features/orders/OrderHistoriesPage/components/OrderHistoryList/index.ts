"use client";

import OrderHistoryList from "./OrderHistoryList";
import { withOrderHistoryList } from "./withOrderHistoryList";

const ConnectedOrderHistoryList = withOrderHistoryList(OrderHistoryList);

export { ConnectedOrderHistoryList as OrderHistoryList };
