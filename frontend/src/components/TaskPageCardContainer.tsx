import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import MainTaskCard from "./TaskCards/MainTaskCard";

function TaskPageCardContainer() {
  const {
    tasks,
    tasksLoading,
    fetchTasks,
    deleteTask,
    startTask,
    pauseTask,
    completeTask,
  } = useUser();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = (id: string) => {
    // TODO: Open update modal
    console.log("Update task:", id);
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl text-white font-bold mb-5">All Tasks</h1>
      <div className="bg-gradient-to-r from-green-400/5 to-(--bg-color) px-7 pt-5 pb-10 rounded-xl border border-green-500/20">
        {tasksLoading ? (
          <p className="text-zinc-400 text-center py-10">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-zinc-400 text-center py-10">
            No tasks yet. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {tasks.map((task) => (
              <MainTaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onUpdate={handleUpdate}
                onStart={startTask}
                onPause={pauseTask}
                onComplete={completeTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskPageCardContainer;
