function SearchBox() {
  return (
    <div className="flex items-center bg-[#18181b] border border-zinc-700 rounded-lg px-3 py-2 w-full sm:w-[300px] hover:border-zinc-600 transition-colors group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-zinc-500 group-focus-within:text-zinc-300 transition-colors"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        type="text"
        placeholder="Search Tasks"
        className="bg-transparent border-none outline-none text-zinc-200 text-sm ml-2 flex-grow placeholder-zinc-600"
      />

      <button className="text-zinc-500 hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default SearchBox;
