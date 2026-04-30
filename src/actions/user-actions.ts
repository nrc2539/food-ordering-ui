"use server";

import api from "@/libs/axios";
import { UserFormType } from "@/models/user/UserFormType";
import { UserType } from "@/models/user/UserType";

async function getProfile(): Promise<UserType> {
  const res = await api.get<UserType>("/users/profile");
  return res.data;
}

async function createUser(params: UserFormType): Promise<UserType> {
  const createData = {
    id: params.id,
    name: params.name,
    email: params.email,
    roleId: params.roleId,
    password: `12345678`, // Mock password
  };
  const res = await api.post<UserType>("/users", createData);
  return res.data;
}

async function updateUser(params: {
  userId: number;
  form: UserFormType;
}): Promise<void> {
  const updateData = {
    name: params.form.name,
    roleId: params.form.roleId,
  };
  await api.patch(`/users/${params.userId}`, updateData);
}

async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}

export { getProfile, createUser, updateUser, deleteUser };
