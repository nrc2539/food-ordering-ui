"use client";

import MenuList from "./MenuList";
import { withMenuList } from "./withMenuList";

const ConnectedMenuList = withMenuList(MenuList);

export { ConnectedMenuList as MenuList };
