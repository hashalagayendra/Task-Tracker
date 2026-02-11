import NotStartedCard from "./NotStartedCard";
import PausedCard from "./PausedCard";
import RunningCard from "./RunningCard";
import type { Task } from "../../context/UserContext";

interface MainTaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
  onStart?: (id: string) => void;
  onPause?: (id: string) => void;
}

function MainTaskCard({
  task,
  onDelete,
  onUpdate,
  onStart,
  onPause,
}: MainTaskCardProps) {
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
          estimatedTimeSeconds={task.estimatedTime}
          totalElapsedSeconds={task.totalElapsedSeconds || 0}
          activeTrackerStartTime={task.activeTrackerStartTime}
          onDelete={() => onDelete?.(task.id)}
          onUpdate={() => onUpdate?.(task.id)}
          onPause={() => onPause?.(task.id)}
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
          onStart={() => onStart?.(task.id)}
        />
      );
  }
}

export default MainTaskCard;
