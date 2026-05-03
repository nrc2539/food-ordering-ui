import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tableSessionToken = searchParams.get("tableSessionToken") ?? undefined;
}
