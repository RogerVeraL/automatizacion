import DataTable from "../ui/datatable";
import { columns } from "../../app/columns";
import { getUsers } from "../../app/users";

const Proceso1 = async () => {
  const users = await getUsers();

  return (
    <DataTable
      data={users}
      columns={columns}
      caption="Lista de usuarios"
      globalFilterColumn="name"
    />
  );
};

export default Proceso1;
