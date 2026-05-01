import { getUsers } from "@/libs/fetching/user-data";
import { getRoles } from "@/libs/fetching/role-data";

import { UserList } from "../components/UserList";
import InviteUserButton from "../components/InviteUserButton";

async function StaffPage() {
  const roleResponse = await getRoles();
  const roles = roleResponse.data;

  const responseUser = await getUsers();
  const users = responseUser.data;

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Staff Management</h1>
        <InviteUserButton roles={roles} />
      </div>
      <UserList className="" users={users} roles={roles} />
    </section>
  );
}

export default StaffPage;
