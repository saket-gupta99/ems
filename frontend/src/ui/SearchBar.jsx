function SearchBar({ search, setSearch }) {
  return (
    <div className="col-span-3 md:col-start-3 md:col-end-4 space-x-1.5 space-y-1.5 text-center md:flex items-center">
      <h1 className="font-semibold text-lg md:mt-1">Get Employee: </h1>
      <input
        type="text"
        className="border border-gray-500 rounded p-1 mt-1.5"
        placeholder="Search by employee ID"
        value={search}
        onChange={(e) => setSearch(e.target.value.toUpperCase().trim())}
      />
    </div>
  );
}

export default SearchBar;
