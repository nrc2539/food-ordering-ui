"use client";

import TableCard from "./TableCard";
import { withTableCard } from "./withTableCard";

const ConnectedTableCard = withTableCard(TableCard);

export { ConnectedTableCard as TableCard };
