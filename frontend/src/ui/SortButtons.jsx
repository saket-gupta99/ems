function SortButtons({ setSelectedDays, selectedDays }) {
  return (
    <div className="col-span-3 sm:col-start-3 sm:col-end-4 inset-shadow-xs inset-shadow-slate-500 rounded p-1 flex w-full justify-between mt-5 sm:mt-0">
      <button
        onClick={() => setSelectedDays(0)}
        className={`${
          selectedDays === 0
            ? "bg-blue-400 md:px-3 rounded cursor-pointer"
            : "hover:cursor-pointer"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => setSelectedDays(7)}
        className={`${
          selectedDays === 7
            ? "bg-blue-400 md:px-3 rounded cursor-pointer"
            : "hover:cursor-pointer"
        }`}
      >
        Last 7 days
      </button>
      <button
        onClick={() => setSelectedDays(30)}
        className={`${
          selectedDays === 30
            ? "bg-blue-400 md:px-3 rounded cursor-pointer"
            : "hover:cursor-pointer"
        }`}
      >
        Last 30 days
      </button>
    </div>
  );
}

export default SortButtons;
