import { isNaNValue } from "@/libs/utils";
import { getMenus } from "@/libs/fetching/menu-data";
import { getCategories } from "@/libs/fetching/category-data";
import { DEFAULT_PAGE, DEFAULT_PERPAGE } from "@/libs/constant";

import CreateMenuButton from "../components/CreateMenuButton";
import { MenuList } from "../components/MenuList";
import { MenusPageProps } from "./interface";

async function ManusPage({ searchParams }: MenusPageProps) {
  const page =
    !!searchParams.page && !isNaNValue(searchParams.page)
      ? Number(searchParams.page)
      : DEFAULT_PAGE;
  const limit =
    !!searchParams?.limitPerPage && !isNaNValue(searchParams.limitPerPage)
      ? Number(searchParams.limitPerPage)
      : DEFAULT_PERPAGE;
  const responseCategory = await getCategories();
  const categories = responseCategory.data;
  const menus = await getMenus({ limitPerPage: limit, page });

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Menus Management</h1>
        <CreateMenuButton categories={categories} />
      </div>
      <MenuList
        menus={menus.data}
        currentPage={menus.meta?.currentPage || 1}
        totalItems={menus.meta?.totalItems || 0}
        pageSize={menus.meta?.itemsPerPage || 1}
        categories={categories}
      />
    </section>
  );
}

export default ManusPage;
