import { useState } from "react";
const TABLE_ROWS = 10;

function Table({ columns, data, text, onClick }) {
  const [currentPage, setcurrentPage] = useState(1);

  const totalPages = data?.length > 0 ? Math.ceil(data.length / TABLE_ROWS) : 0;
  const modifiedData = data?.length
    ? data.slice(
        currentPage * TABLE_ROWS - TABLE_ROWS,
        currentPage * TABLE_ROWS
      )
    : [];

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage < totalPages) setcurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setcurrentPage(currentPage - 1);
  };

  return (
    <div className="overflow-x-auto col-span-3 w-full mx-auto sm:mt-12 mb-32 my-10">
      <h1 className="text-xl font-semibold mb-2 text-center">{text}</h1>
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            {columns?.map((col, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {modifiedData?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-100"
              onClick={() => onClick(row.employeeId)}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 p-2 capitalize"
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <>
          <button
            className="px-3 py-1 disabled:bg-gray-300 hover:cursor-pointer"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            prev
          </button>
          {pageButtons.map((page) => (
            <button
              key={page}
              className="px-3 py-1 hover:cursor-pointer"
              onClick={() => setcurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 disabled:bg-gray-300 hover:cursor-pointer"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            next
          </button>
        </>
      )}
    </div>
  );
}

export default Table;
