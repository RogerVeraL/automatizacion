import DataTable from "../ui/datatable";
import { columns } from "../../app/columns";
import { getUsers } from "../../app/users";

const Proceso1 = async () => {
  const users = await getUsers();

  return (
    <div
      className="h-[80vh] W-[30vw] overflow-none rounded-md border p-2"
      role="region"
      aria-label="Tabla de usuarios con desplazamiento independiente"
      tabIndex={0}
    >
      <DataTable
        data={users}
        columns={columns}
        caption="Lista de usuarios"
        globalFilterColumn="nombre"
      />
    </div>
  );
};

export default Proceso1;
