import { RoleType } from "@/models/user/RoleType";
import InviteUserButton from "../components/InviteUserButton";
import { UserType } from "@/models/user/UserType";
import { UserList } from "../components/UserList";

function StaffPage() {
  const mockRoles: RoleType[] = [
    { id: 1, name: "admin" },
    { id: 2, name: "staff" },
  ];
  const mockUsers: UserType[] = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Usermock ${i < 2 ? "Admin" : "User"}`,
    email: `user${i + 1}@email.com`,
    role:
      i < 2
        ? {
            id: mockRoles[0].id,
            name: mockRoles[0].name,
          }
        : {
            id: mockRoles[1].id,
            name: mockRoles[1].name,
          },
  }));
  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Staff Management</h1>
        <InviteUserButton roles={mockRoles} />
      </div>
      <UserList className="" users={mockUsers} roles={mockRoles} />
    </section>
  );
}

export default StaffPage;
