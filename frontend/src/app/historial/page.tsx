import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import InProgressPage from "../../components/InProgressPage";

export default function HistorialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <InProgressPage title="Historial" />
      </div>
    </div>
  );
}
