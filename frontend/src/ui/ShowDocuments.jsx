import { useState } from "react";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";
import { FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";

const getFileIcon = (attachment) => {
  const url = attachment.attachmentUrl || "";
  const fileType = attachment.fileType || ""; // Use stored mimetype if available
  const fileName = attachment.fileName || ""; // Use stored filename if available

  if (fileType === "application/pdf" || (!fileType && /\.pdf$/i.test(fileName)) || (!fileType && !fileName && /\.pdf/i.test(url))) {
      return <FaFilePdf className="text-red-500 text-4xl" />;
  }
  if (fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || (!fileType && /\.docx?$/i.test(fileName)) || (!fileType && !fileName && /\.docx?/i.test(url))) {
      return <FaFileWord className="text-blue-500 text-4xl" />;
  }
  // Add more conditions here for other file types if needed
  return <FaFileAlt className="text-gray-500 text-4xl" />; // Default icon
};


function ShowDocuments() {
  const { user, isLoading } = useUser();
  const [active, setActive] = useState(0);
  const [documentType, setDocumentType] = useState("Company Letters");

  if (isLoading) { 
    return <FullScreenSpinner />;
  }

  const attachments = user?.data?.attachments || [];
  const data = attachments.filter(
    (el) => el.documentType?.toLowerCase() === documentType.toLowerCase()
  );

  const docTypes = [
    "Company Letters",
    "ID proofs",
    "Education Certificates",
    "Other",
  ];

  return (
    <div className="p-2 w-full">
      <div className="flex flex-wrap border-b border-gray-300 mb-4">
        {docTypes.map((el, ind) => (
          <button
            key={ind}
            className={`px-3 py-2 mr-1 mb-1 text-sm hover:cursor-pointer font-medium focus:outline-none border border-b-0 rounded-t ${
              active === ind
                ? "bg-indigo-100 border-indigo-300 text-indigo-700" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 border-gray-300" 
            }`}
            onClick={() => { 
              setActive(ind);
              setDocumentType(el); 
            }}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.length > 0 ? (
          data.map((el, id) => {
            // Check if it's an image based on stored file type primarily
            const isImage = el.fileType?.startsWith("image/");
            const displayFileName = el.fileName || "Download File";

            return (
              <div
                key={el.publicId || id} 
                className="border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center shadow hover:shadow-md transition-shadow duration-200"
              >
                {isImage ? (
                  <a href={el.attachmentUrl} target="_blank" rel="noopener noreferrer" title={`View image: ${displayFileName}`}>
                    <img
                      src={el.attachmentUrl}
                      alt={el.description || displayFileName}
                      className="w-32 h-32 object-cover border border-gray-300 rounded mb-2"
                      loading="lazy" 
                    />
                  </a>
                ) : (
                  <a
                    href={el.attachmentUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center group"
                    title={`Download ${displayFileName}`}
                  >
                    <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
                       {getFileIcon(el)}
                    </div>
                    <span className="text-xs text-gray-700 break-words w-full group-hover:text-indigo-600">
                      {displayFileName}
                    </span>
                  </a>
                )}
                {el.description && (
                   <p className="text-xs text-gray-500 mt-1 w-full break-words">{el.description}</p>
                )}
              </div>
            );
          })
        ) : ( 
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 font-semibold rounded w-fit p-2 mx-auto bg-gray-50 border">
              No documents found for "{documentType}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowDocuments;