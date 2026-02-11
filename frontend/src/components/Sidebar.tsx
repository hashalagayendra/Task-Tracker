import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Hexagon } from "lucide-react";

function Sidebar() {
  const { currentSection, setCurrentSection, clearUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/user/logout");
      clearUser();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
      // Even if backend fails, clear frontend state
      clearUser();
      navigate("/login");
    }
  };

  return (
    <div className="w-full  h-screen bg-(--sidebar-bg) flex flex-col  ">
      <div className="w-full h-20 pt-5">
        <div className="flex   justify-center gap-5 px-5">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Hexagon className="text-white w-10 h-10" fill="currentColor" />
          </div>
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
          className={` text-white/75 transform transition-all duration-200 hover:text-white w-full py-2  hover:bg-white/10 text-center rounded-md font-semibold ${currentSection === "DashBoard" ? "!bg-blue-600 !text-white" : ""}`}
          onClick={() => setCurrentSection("DashBoard")}
        >
          Dash Board
        </div>
        <div
          className={` text-white/75 transform transition-all duration-200 hover:text-white w-full py-2 hover:bg-white/10 text-center rounded-md font-semibold ${currentSection === "Tasks" ? "!bg-blue-600 !text-white" : ""}`}
          onClick={() => setCurrentSection("Tasks")}
        >
          Tasks
        </div>
        <div
          className={` text-white/75 transform transition-all duration-200 hover:text-white w-full py-2 hover:bg-white/10 text-center rounded-md font-semibold ${currentSection === "Analyzing" ? "!bg-blue-600 !text-white" : ""}`}
          onClick={() => setCurrentSection("Analyzing")}
        >
          Analyzing
        </div>
      </div>
      <div className="w-full  flex gap-4 justify-center px-10 py-2">
        <button
          onClick={handleLogout}
          className="border-2 w-full border-red-600 bg-red-600/10 rounded-md px-4 py-2 text-white hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
