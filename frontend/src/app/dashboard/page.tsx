"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DashboardContent from "../../components/DashboardContent";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => setIsSidebarOpen((v) => !v);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar collapsed={!isSidebarOpen} onToggle={handleToggleSidebar} />
        <DashboardContent />
      </div>
    </div>
  );
}
