import { FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SingleNav({ icon, text, dropdown, path, onClick }) {
  const navigate = useNavigate();

  return (
    <li
      className="flex items-center justify-between border-b border-b-gray-500 cursor-pointer pb-0.5 hover:text-gray-300"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="pl-2" onClick={() => navigate(path)}>
          {text}
        </span>
      </div>
      <div className="self-center">{dropdown && <FaSortDown size={20} />}</div>
    </li>
  );
}

export default SingleNav;
