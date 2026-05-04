import { getUsers } from "@/libs/fetching/user-data";
import { getRoles } from "@/libs/fetching/role-data";

import { UserList } from "../components/UserList";
import InviteUserButton from "../components/InviteUserButton";
import { StaffPageProps } from "./interface";
import { DEFAULT_PAGE, DEFAULT_PERPAGE } from "@/libs/constant";
import { isNaNValue } from "@/libs/utils";

async function StaffPage({ searchParams }: StaffPageProps) {
  const page =
    !!searchParams.page && !isNaNValue(searchParams.page)
      ? Number(searchParams.page)
      : DEFAULT_PAGE;
  const limit =
    !!searchParams?.limitPerPage && !isNaNValue(searchParams.limitPerPage)
      ? Number(searchParams.limitPerPage)
      : DEFAULT_PERPAGE;

  const roleResponse = await getRoles();
  const roles = roleResponse.data;

  const users = await getUsers({ page, limitPerPage: limit });

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Staff Management</h1>
        <InviteUserButton roles={roles} />
      </div>
      <UserList
        className=""
        roles={roles}
        users={users.data}
        currentPage={users.meta?.currentPage || 1}
        totalItems={users.meta?.totalItems || 0}
        pageSize={users.meta?.itemsPerPage || 1}
      />
    </section>
  );
}

export default StaffPage;
