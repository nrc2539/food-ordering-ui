"use client";

import CustomerOrderPage from "./CustomerOrderPage";
import { withCustomerOrderPage } from "./withCustomerOrderPage";

const ConnectedCustomerOrderPage = withCustomerOrderPage(CustomerOrderPage);

export { ConnectedCustomerOrderPage as CustomerOrderPage };
