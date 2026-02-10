import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
function Sidebar() {
  type SidebarItems = "Dashboard" | "Task" | "Analyzing";
  const [active, setActive] = useState<SidebarItems>("Dashboard");
  return (
    <div className="w-full max-w-64 h-screen bg-(--sidebar-bg) flex flex-col border-r border-(--accent-blue) ">
      <div className="w-full h-20 pt-5">
        <div className="flex   justify-center gap-5 px-5">
          <div className=" w-30 h-16 rounded-md bg-blue-600">f</div>
          <div className="flex flex-col ">
            <div className="text-white font-semibold text-xl ">Task Master</div>
            <div className="text-white/60 text-[10px]  pr-4">
              Stay Organized, Complete Tasks, Achieve Goals
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 h-full flex flex-col gap-4 px-10">
        <div
          className={` text-white/75 transform transition-all duration-200 hover:text-white w-full py-2  hover:bg-white/10 text-center rounded-md font-semibold ${active === "Dashboard" ? "!bg-blue-600 !text-white" : ""}`}
          onClick={() => setActive("Dashboard")}
        >
          Dash Board
        </div>
        <div
          className={` text-white/75 transform transition-all duration-200 hover:text-white w-full py-2 hover:bg-white/10 text-center rounded-md font-semibold ${active === "Task" ? "!bg-blue-600 !text-white" : ""}`}
          onClick={() => setActive("Task")}
        >
          Tasks
        </div>
        <div
          className={` text-white/75 transform transition-all duration-200 hover:text-white w-full py-2 hover:bg-white/10 text-center rounded-md font-semibold ${active === "Analyzing" ? "!bg-blue-600 !text-white" : ""}`}
          onClick={() => setActive("Analyzing")}
        >
          Analyzing
        </div>
      </div>
      <div className="w-full  flex gap-4 justify-center px-10 py-2">
        <button className="border-2 w-full border-red-600 bg-red-600/10 rounded-md px-4 py-2 text-white">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
