import { Empty } from "antd";

import { getCategories } from "@/libs/fetching/category-data";

import CreateCategoryButton from "../components/CreateCategoryButton";
import { CategoryCard } from "../components/CategoryCard";

async function CategoriesPage() {
  const res = await getCategories();
  const categories = res.data;

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Categories Management</h1>
        <CreateCategoryButton />
      </div>
      <div className="grid gap-3 tablet:gap-4 grid-cols-1 tablet:grid-cols-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} data={category} />
          ))
        ) : (
          <Empty
            className="col-span-full mt-5"
            description="No category data"
          />
        )}
      </div>
    </section>
  );
}

export default CategoriesPage;
