import { TableCard } from "../components/TableCard";
import CreateTableButton from "../components/CreateTableButton";

function TablesPage() {
  const mockTables = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Table No.${i + 1}`,
    isAvailable: i > 1,
  }));
  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Table Management</h1>
        <CreateTableButton />
      </div>
      <div className="grid gap-3 tablet:gap-4 grid-cols-1 tablet:grid-cols-4">
        {mockTables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </section>
  );
}

export default TablesPage;
