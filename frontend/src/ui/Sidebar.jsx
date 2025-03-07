import { useState } from "react";
import SidebarMenus from "./SidebarMenus";
import ProfilePhoto from "./ProfilePhoto";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";
import UpdatePhoto from "./UpdatePhoto";

function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const [isDropdownClicked, setIsDropdownClicked] = useState(null);
  const [photoClicked, setPhotoClicked] = useState(false);
  const { user, isLoading } = useUser();

  function handleDropdown(id) {
    setIsDropdownClicked((prev) => (prev === id ? null : id));
  }

  if (isLoading || !user?.data?.general) {
    return <FullScreenSpinner />;
  }

  const { firstName, lastName, photoUrl } = user.data.general;

  return (
    <>
      <div
        className={`${
          !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        } col-start-1 col-end-3 sm:col-end-2 row-start-2 row-end-3 z-1000 flex flex-col items-center py-2  bg-gray-900 text-white w-full transition-all ease-in-out duration-300 min-h-screen sm:overflow-y-auto px-6 sm:px-8`}
      >
        <ProfilePhoto
          img={photoUrl}
          name={firstName + " " + lastName}
          setPhotoClicked={setPhotoClicked}
        />
        <SidebarMenus
          isDropdownClicked={isDropdownClicked}
          handleDropdown={handleDropdown}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      {photoClicked && <UpdatePhoto setPhotoClicked={setPhotoClicked} />}
    </>
  );
}

export default Sidebar;
