import { CategoryType } from "@/models/category/CategoryType";
import CreateCategoryButton from "./components/CreateCategoryButton";
import { CategoryCard } from "./components/CategoryCard";

function CategoriesPage() {
  const mockCategories: CategoryType[] = Array.from({ length: 5 }).map(
    (_, i) => ({ id: i + 1, name: `Category ${i + 1}`, menus: [] }),
  );
  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Categories Management</h1>
        <CreateCategoryButton />
      </div>
      <div className="grid gap-3 tablet:gap-4 grid-cols-1 tablet:grid-cols-4">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesPage;
