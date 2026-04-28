"use client";

import UserList from "./UserList";
import { withUserList } from "./withUserList";

const ConnectedUserList = withUserList(UserList);

export { ConnectedUserList as UserList };
