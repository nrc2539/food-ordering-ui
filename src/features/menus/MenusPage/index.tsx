import { getMenus } from "@/libs/fetching/menu-data";
import { getCategories } from "@/libs/fetching/category-data";

import CreateMenuButton from "../components/CreateMenuButton";
import { MenuList } from "../components/MenuList";

async function ManusPage() {
  const responseCategory = await getCategories();
  const categories = responseCategory.data;

  const responseMenu = await getMenus();
  const menus = responseMenu.data;

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Menus Management</h1>
        <CreateMenuButton categories={categories} />
      </div>
      <MenuList className="" menus={menus} categories={categories} />
    </section>
  );
}

export default ManusPage;
