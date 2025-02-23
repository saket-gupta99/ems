import { useEffect, useState } from "react";
import { tabsConfig } from "../data/tabsConfig";
import MobileTabs from "../ui/MobileTabs";
import ShowDocuments from "../ui/ShowDocuments";

function Profile() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isWindowSizeSmall, setIsWindowSmall] = useState(true);

  useEffect(() => {
    function handleChange() {
      setIsWindowSmall(window.innerWidth < 640);
    }

    handleChange();

    window.addEventListener("resize", handleChange);

    return () => window.removeEventListener("resize", handleChange);
  }, []);

  const ActiveTab = tabsConfig[currentTab].element;

  const nextTab = () => {
    if (currentTab < tabsConfig.length - 1) setCurrentTab(currentTab + 1);
  };

  const prevTab = () => {
    if (currentTab > 0) setCurrentTab(currentTab - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {isWindowSizeSmall && (
        <MobileTabs
          currentTab={currentTab}
          prevTab={prevTab}
          nextTab={nextTab}
        />
      )}

      {!isWindowSizeSmall && (
        <div className="flex w-full justify-between shadow-xl">
          {tabsConfig.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <div
                className={`flex flex-col items-center justify-center p-5 w-full ${
                  currentTab === index && "bg-gray-200"
                } hover:bg-gray-200 cursor-pointer`}
                key={tab.icon}
                onClick={() => setCurrentTab(index)}
              >
                {<Icon size={30} />}
                <span className="">{tab.name}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="w-full p-4 rounded shadow-xl transition-transform duration-500">
        <ActiveTab />
      </div>

      {tabsConfig[currentTab].name === "Attachments" && (
        <div className="w-full p-4 rounded shadow-xl transition-transform duration-500">
          <ShowDocuments />
        </div>
      )}
    </div>
  );
}

export default Profile;
