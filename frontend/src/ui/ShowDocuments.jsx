import { useState } from "react";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";
import { FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";

const getFileIcon = (url) => {
  if (/\.pdf$/i.test(url))
    return <FaFilePdf className="text-red-500 text-4xl" />;
  if (/\.docx?$/i.test(url))
    return <FaFileWord className="text-blue-500 text-4xl" />;
  return <FaFileAlt className="text-gray-500 text-4xl" />;
};

function ShowDocuments() {
  const { user, isLoading } = useUser();
  const [active, setActive] = useState(0);
  const [documentType, setDocumentType] = useState("company letters");

  if (isLoading || !user.data.attachments) {
    return <FullScreenSpinner />;
  }

  const data = user.data.attachments.filter(
    (el) => el.documentType === documentType
  );

  return (
    <div className="p-2 w-full">
      <div className="flex flex-wrap">
        {[
          "Company Letters",
          "ID proofs",
          "Education Certificates",
          "Other",
        ].map((el, ind) => (
          <button
            key={ind}
            className={`${
              active === ind ? "bg-gray-300" : ""
            } px-2 p-1 cursor-pointer border border-gray-300`}
            onClick={(e) => {
              setActive(ind);
              setDocumentType(e.target.innerText.toLowerCase());
            }}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="p-3 text-center flex justify-center mt-5">
        {data.length > 0 &&
          data.map((el, id) => {
            const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(
              el.attachmentUrl
            );

            return (
              <div key={id} className="border p-2 flex flex-col items-center">
                {isImage ? (
                  <img
                    src={el.attachmentUrl}
                    alt={el.fileName || "Uploaded Image"}
                    className="w-40 h-40 object-cover border rounded"
                  />
                ) : (
                  <a
                    href={el.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-blue-500 underline"
                  >
                    {getFileIcon(el.attachmentUrl)}
                    <span>{el?.fileName || "View Document"}</span>
                  </a>
                )}
              </div>
            );
          })}
        {!data.length && (
          <p className="bg-gray-600 text-white font-semibold rounded w-fit p-1">
            No Documents Found
          </p>
        )}
      </div>
    </div>
  );
}

export default ShowDocuments;
