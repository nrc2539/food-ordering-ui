import api from "@/libs/axios";
import { UserType } from "@/models/user/UserType";
import { NextResponse } from "next/server";

/* 
  Using Route handler as proxy API call for /users/profile 
  because `api` from `@/libs/axios` using cookies that allow using in server component, server action and route handler
  but this api using in client component (AuthenticationProvider.tsx) to fetch profile of user.
  To followed best practice fecthing data in Next.js, so I avoid fetching in server action and using route handler as proxy api call.
*/
export async function GET() {
  try {
    const res = await api.get<UserType>("/users/profile");
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
