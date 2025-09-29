import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import InProgressPage from "../../components/InProgressPage";

export default function ConfiguracionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <InProgressPage title="Configuración" />
      </div>
    </div>
  );
}
