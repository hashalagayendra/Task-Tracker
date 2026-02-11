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
    <div className="flex-1 px-4 md:px-10 py-8 overflow-y-auto h-full">
      <TaskPageHeadder
        title="My Task"
        subtitle="Stay Organized, Complete Tasks, Achieve Goals "
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-10">
        <SearchBox />
        <div className="flex gap-4">
          <button
            onClick={handleOpenModal}
            className="flex-1 md:flex-none px-10 py-2 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-center"
          >
            Add Task
          </button>
        </div>
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
