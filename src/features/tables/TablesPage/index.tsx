import { Empty } from "antd";

import { getTables } from "@/libs/fetching/table-data";

import { TableCard } from "../components/TableCard";
import CreateTableButton from "../components/CreateTableButton";

async function TablesPage() {
  const res = await getTables();
  const tables = res.data;

  return (
    <section>
      <div className="mb-5 flex items-start justify-between">
        <h1 className="text-3xl font-medium">Table Management</h1>
        <CreateTableButton />
      </div>
      <div className="grid gap-3 tablet:gap-4 grid-cols-1 tablet:grid-cols-4">
        {tables.length > 0 ? (
          tables.map((table) => <TableCard key={table.id} data={table} />)
        ) : (
          <Empty className="col-span-full mt-5" description="No Table data" />
        )}
      </div>
    </section>
  );
}

export default TablesPage;
