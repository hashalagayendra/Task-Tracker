import React from "react";

function UserIcon() {
  return (
    <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-fuchsia-500/20">
        {"H"}
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white leading-tight">
          {"Hsala gayendra"}
        </span>
        <span className="text-xs text-zinc-500">{"@hslagayendra9987"}</span>
      </div>
    </div>
  );
}

export default UserIcon;
