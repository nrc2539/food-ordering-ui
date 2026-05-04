import { PaginationType } from "@/interfaces/PaginationType";
import api from "@/libs/axios";

import { UserResponseType } from "@/models/user/UserResponseType";
import { UserType } from "@/models/user/UserType";

async function getUsers(
  params?: PaginationType & {
    roleIds?: number[];
  },
): Promise<UserResponseType> {
  const res = await api.get<UserResponseType>("/users", {
    params,
  });
  return res.data;
}

async function getUser(id: number): Promise<UserType> {
  const res = await api.get<UserType>(`/users/${id}`);
  return res.data;
}

export { getUsers, getUser };
