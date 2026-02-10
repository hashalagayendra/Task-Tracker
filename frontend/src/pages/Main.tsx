import React from "react";
import Sidebar from "../components/Sidebar";

import Dashboard from "./Dashboard";
import TaskList from "./TaskList";

function Main() {
  return (
    <div className="bg-(--bg-color) flex">
      <div className="w-72 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* main body  */}
      <div className=" flex-1 px-10 py-8">
        <Dashboard></Dashboard>
        <TaskList></TaskList>
      </div>
    </div>
  );
}

export default Main;
