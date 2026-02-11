import { useState, useRef, useEffect } from "react";
import { PlayIcon, MoreHorizontal, Trash2, Pencil } from "lucide-react";

function NotStartedCard({
  title,
  date,
  priority,
  timeEstimate,
  onDelete,
  onUpdate,
  onStart,
}: {
  title: string;
  date: string;
  priority: string;
  timeEstimate: string;
  onDelete?: () => void;
  onUpdate?: () => void;
  onStart?: () => void;
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

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-600 transition-colors group  max-w-[350px]">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 gap-2 ">
        <h3 className="text-base font-bold text-white">{title}</h3>
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
                  onUpdate?.();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
              >
                <Pencil size={14} />
                Update Task
              </button>
              <button
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-zinc-400 mb-12">
        Design the Home screen according to the client requirements in the
        brief. Carefully lay out the style, color and font. Design the Home
        screen according to the client requirements in the brief. Carefully lay
        out the style, color and font.
      </p>

      {/* Middle Info Section */}
      <div className="flex items-start justify-between  mb-8">
        {/* Left Side: Date & Priority */}
        <div className="flex flex-col gap-3  transform -translate-y-3">
          {/* Date Pill */}
          <span className="px-4 py-2 rounded-md bg-blue-900 text-blue-100 text-xs font-medium w-fit">
            {date}
          </span>

          {/* Priority Pill */}
          <span
            className={`px-4 py-2 rounded-md text-xs font-medium w-fit ${
              priority === "High Piority"
                ? "bg-red-900/50 text-red-400"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {priority}
          </span>
        </div>

        {/* Right Side: Time Estimate */}
        <div className="text-left transform -translate-y-4">
          <span className="text-base text-white">Estimated Time</span>
          <div className="flex -mt-1 items-baseline gap-1">
            <span className="text-6xl font-bold text-white">
              {Math.floor(Number(timeEstimate.split(" ")[0]) / 60)}
            </span>
            <span className="text-lg font-bold text-white">Min</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onStart?.()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/20 w-full justify-center cursor-pointer"
        >
          <PlayIcon />
          Start
        </button>
      </div>
    </div>
  );
}

export default NotStartedCard;
