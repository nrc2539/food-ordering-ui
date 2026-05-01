import { PaginationType } from "@/interfaces/PaginationType";
import { RoleResponseType } from "@/models/user/RoleResponseType";
import { RoleType } from "@/models/user/RoleType";

import api from "../axios";

async function getRoles(params?: PaginationType): Promise<RoleResponseType> {
  const res = await api.get<RoleType[]>("/roles", {
    params,
  });
  return { data: res.data };
}

export { getRoles };
