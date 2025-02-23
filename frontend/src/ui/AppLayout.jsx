import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useState } from "react";

function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  function openSidebar() {
    setSidebarOpen(true);
  }
  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen">
      <Header
        isSidebarOpen={isSidebarOpen}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Main isSidebarOpen={isSidebarOpen}>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
