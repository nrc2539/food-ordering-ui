"use server";

import api from "@/libs/axios";
import { UserFormType } from "@/models/user/UserFormType";
import { UserType } from "@/models/user/UserType";
import { revalidatePath } from "next/cache";

async function createUser(params: UserFormType): Promise<UserType> {
  const createData = {
    id: params.id,
    name: params.name,
    email: params.email,
    roleId: params.roleId,
    password: `12345678`, // Mock password
  };
  const res = await api.post<UserType>("/users", createData);
  revalidatePath("/management/staff");
  return res.data;
}

async function updateUser(params: {
  id: number;
  form: UserFormType;
}): Promise<void> {
  const updateData = {
    name: params.form.name,
    roleId: params.form.roleId,
  };
  await api.patch(`/users/${params.id}`, updateData);
  revalidatePath("/management/staff");
}

async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
  revalidatePath("/management/staff");
}

export { createUser, updateUser, deleteUser };
