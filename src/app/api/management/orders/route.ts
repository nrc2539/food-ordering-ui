import { NextRequest, NextResponse } from "next/server";

import api from "@/libs/axios";
import { OrderType } from "@/models/order/OrderType";

/* 
  Using Route handler as proxy API call for /orders 
  because `api` from `@/libs/axios` using cookies that allow using in server component, server action and route handler
  but this api using in client component (Order page that using tanstack query) to fetch orders.
  To followed best practice fecthing data in Next.js, so I avoid fetching in server action and using route handler as proxy api call.
*/
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") ?? undefined;
  const startAt = searchParams.get("startAt") ?? undefined;
  const endAt = searchParams.get("endAt") ?? undefined;
  try {
    const res = await api.get<OrderType[]>("/orders", {
      params: { status, startAt, endAt },
    });
    return NextResponse.json(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      return NextResponse.json(
        { message: "Session expired, please login again" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
