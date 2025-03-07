import { FaPen } from "react-icons/fa";

function ProfilePhoto({ img, name, setPhotoClicked }) {
  return (
    <div className="flex flex-col items-center p-6 mb-4 border-b border-b-gray-400 w-full">
      <FaPen
        className="self-end cursor-pointer"
        onClick={() => setPhotoClicked(true)}
      />
      <img
        src={img || "user.webp"}
        alt="profile-photo"
        className="rounded-full h-32 w-32 xs:h-36 xs:w-36 mx-auto"
      />
      <h3 className="text-xl pt-3 capitalize">{name || "user"}</h3>
    </div>
  );
}

export default ProfilePhoto;
