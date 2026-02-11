import NotStartedCard from "./NotStartedCard";
import PausedCard from "./PausedCard";
import RunningCard from "./RunningCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "notStarted" | "running" | "pause" | "done";
  priority: "high" | "medium" | "low";
  estimatedTime: number;
  startTime?: string;
  endTime?: string;
  createdAt: string;
}

interface MainTaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
}

function MainTaskCard({ task, onDelete, onUpdate }: MainTaskCardProps) {
  const priorityLabel =
    task.priority === "high"
      ? "High Piority"
      : task.priority === "medium"
        ? "Medium Priority"
        : "Low Priority";

  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timeEstimate = `${task.estimatedTime} Min`;

  switch (task.status) {
    case "running":
      return (
        <RunningCard
          title={task.title || "Untitled Task"}
          date={date}
          priority={priorityLabel}
          timeEstimate={timeEstimate}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
        />
      );
    case "pause":
      return (
        <PausedCard
          title={task.title || "Untitled Task"}
          date={date}
          priority={priorityLabel}
          timeEstimate={timeEstimate}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
        />
      );
    case "notStarted":
    case "done":
    default:
      return (
        <NotStartedCard
          title={task.title || "Untitled Task"}
          date={date}
          priority={priorityLabel}
          timeEstimate={timeEstimate}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
        />
      );
  }
}

export default MainTaskCard;
