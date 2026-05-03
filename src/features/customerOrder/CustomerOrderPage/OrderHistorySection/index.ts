"use client";

import OrderHistorySection from "./OrderHistorySection";
import { withOrderHistorySection } from "./withOrderHistorySection";

const ConnectedOrderHistorySection =
  withOrderHistorySection(OrderHistorySection);

export { ConnectedOrderHistorySection as OrderHistorySection };
