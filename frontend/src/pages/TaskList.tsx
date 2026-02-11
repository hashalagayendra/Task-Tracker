import { useState } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskPageHeadder from "../components/TaskPageHeadder";
import SearchBox from "../components/SearchBox";
import TaskPageCardContainer from "../components/TaskPageCardContainer";

function TaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className=" flex-1 px-10 py-8">
      <TaskPageHeadder
        title="My Task"
        subtitle="Stay Organized, Complete Tasks, Achieve Goals "
      />
      <div className="flex justify-between mt-10">
        <SearchBox />
        <div>
          <div className="px-10 py-2 bg-zinc-500/10 rounded-md text-white">
            Filter
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-10 py-2 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Add Task
        </button>
      </div>

      <TaskPageCardContainer />

      {isModalOpen && (
        <CreateTaskModal
          onClose={handleCloseModal}
          onSuccess={() => {
            // Optional: refresh tasks here if needed
            // For now just close the modal
          }}
        />
      )}
    </div>
  );
}

export default TaskList;
