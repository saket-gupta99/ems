function SearchByDate({ date, setDate }) {
  return (
    <div className=" col-span-3 w-full text-center p-3 md:col-start-1 md:col-end-2 space-x-1.5 space-y-1.5">
      <span className="text-lg font-semibold">Search by date: </span>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-1 rounded"
      />
    </div>
  );
}

export default SearchByDate;
