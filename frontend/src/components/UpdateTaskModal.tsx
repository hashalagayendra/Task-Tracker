import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import type { Task } from "../context/UserContext";

const TaskPriority = {
  high: "high",
  medium: "medium",
  low: "low",
} as const;

type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

interface UpdateTaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdated: (updatedTask: Task) => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  task,
  onClose,
  onUpdated,
}) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState<TaskPriority>(
    task.priority as TaskPriority,
  );
  const [estimatedTime, setEstimatedTime] = useState(
    String(Math.floor(task.estimatedTime / 60)),
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: Record<string, unknown> = {};

      if (title !== task.title) payload.title = title;
      if (description !== (task.description || ""))
        payload.description = description;
      if (priority !== task.priority) payload.priority = priority;

      const newEstMinutes = Number(estimatedTime);
      const oldEstMinutes = Math.floor(task.estimatedTime / 60);
      if (newEstMinutes !== oldEstMinutes)
        payload.estimatedTime = newEstMinutes;

      if (Object.keys(payload).length === 0) {
        toast("No changes made");
        onClose();
        return;
      }

      const res = await axios.patch(`/task/${task.id}`, payload);
      onUpdated(res.data);
      toast.success("Task updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#18181B] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-white/5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Update Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Task Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className="w-full bg-[#27272A] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-500 border border-transparent focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="w-full bg-[#27272A] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-500 border border-transparent focus:border-blue-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">
              Estimated Time (mins)
            </label>
            <input
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g. 60"
              className="w-full bg-[#27272A] text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-500 border border-transparent focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              Set Priority
            </label>
            <div className="flex bg-[#27272A] p-1 rounded-lg w-fit">
              {[
                { label: "Low", value: TaskPriority.low },
                { label: "Medium", value: TaskPriority.medium },
                { label: "High", value: TaskPriority.high },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    priority === option.value
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
