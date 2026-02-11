import React from "react";
import Sidebar from "../components/Sidebar";

import Dashboard from "./Dashboard";
import TaskList from "./TaskList";
import { useUser } from "../context/UserContext";

function Main() {
  const { currentSection } = useUser();
  return (
    <div className="bg-(--bg-color) flex">
      <div className="w-72 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* main body  */}
      <div className=" flex-1  py-8">
        {currentSection === "DashBoard" && <Dashboard />}
        {currentSection === "Tasks" && <TaskList />}
      </div>
    </div>
  );
}

export default Main;
