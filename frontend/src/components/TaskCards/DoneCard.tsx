import { Trash2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function DoneCard({
  title,
  description,
  date,
  priority,
  timeToSpend,
  estimatedTimeSeconds,
  totalUsedSeconds,
  onDelete,
}: {
  title: string;
  description?: string;
  date: string;
  priority: string;
  timeToSpend: number; // estimated - totalUsed
  estimatedTimeSeconds: number;
  totalUsedSeconds: number;
  onDelete?: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isEarly = timeToSpend >= 0;
  const absTimeToSpend = Math.abs(timeToSpend);
  const displayMinutes = Math.floor(absTimeToSpend / 60);

  const progressPercent =
    estimatedTimeSeconds > 0
      ? Math.round((totalUsedSeconds / estimatedTimeSeconds) * 100)
      : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-zinc-900 border border-green-500/50 border-t-2 border-t-green-500 rounded-xl group max-w-[350px]">
      {/* Status Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-green-500">Completed</span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <MoreHorizontal size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 z-50 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 min-w-[160px]">
              <button
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/30 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 gap-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
        {description || "No description provided for this task."}
      </p>

      {/* Info Section */}
      <div className="flex items-start justify-between mb-6">
        {/* Left Side: Date & Priority */}
        <div className="flex flex-col gap-3">
          {/* Date Pill */}
          <span className="px-4 py-2 rounded-md bg-blue-600 text-white text-xs font-medium w-fit">
            {date}
          </span>

          {/* Priority Pill */}
          <span
            className={`px-4 py-2 rounded-md text-xs font-medium w-fit ${
              priority.toLowerCase().includes("high")
                ? "bg-red-900/50 text-red-400"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {priority}
          </span>
        </div>

        {/* Right Side: Efficiency Metric */}
        <div className="text-right">
          <div
            className={`flex items-baseline gap-1 ${isEarly ? "text-green-500" : "text-red-500"}`}
          >
            <span className="text-5xl font-bold">{displayMinutes}</span>
            <div className="flex flex-col items-start leading-none">
              <span className="text-lg font-semibold">Min</span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                {isEarly ? "Before" : "Late"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
          <span>00:00</span>
          <span>{formatTime(estimatedTimeSeconds)}</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2">
          <div
            className={`${isEarly ? "bg-green-500" : "bg-red-500"} h-2 rounded-full transition-all duration-1000`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
        <div
          className={`text-right text-sm font-bold mt-1 ${isEarly ? "text-green-500" : "text-white"}`}
        >
          {progressPercent}%
        </div>
      </div>

      {/* Bottom Button Area */}
      <div className="w-full py-2.5 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center justify-center">
        <span className="text-green-500 font-bold text-sm">Task Completed</span>
      </div>
    </div>
  );
}

export default DoneCard;
