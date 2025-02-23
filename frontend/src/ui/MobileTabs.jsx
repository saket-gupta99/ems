import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { tabsConfig } from "../data/tabsConfig";

function MobileTabs({ currentTab, prevTab, nextTab }) {
  const Icon = tabsConfig[currentTab].icon;

  return (
    <div className="flex gap-2 items-center justify-center p-5 bg-gray-200 shadow-xl rounded">
      <button
        onClick={prevTab}
        className="p-2 cursor-pointer rounded-full disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={currentTab === 0}
      >
        <FaLessThan />
      </button>
      <div className="flex flex-col items-center">
        <div className="">{<Icon size={30} />}</div>
        <span className="font-bold">{tabsConfig[currentTab].name}</span>
      </div>
      <button
        onClick={nextTab}
        className="p-2 cursor-pointer rounded-full disabled:text-gray-400  disabled:cursor-not-allowed"
        disabled={currentTab === tabsConfig.length - 1}
      >
        <FaGreaterThan />
      </button>
    </div>
  );
}

export default MobileTabs;
