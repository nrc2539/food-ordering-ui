"use client";

import OrderCard from "./OrderCard";
import { withOrderCard } from "./withOrderCard";

const ConnectedOrderCard = withOrderCard(OrderCard);

export { ConnectedOrderCard as OrderCard };
