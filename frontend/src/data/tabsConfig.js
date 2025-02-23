import AttachmentTab from "../features/employee/AttachmentTab";
import ContactTab from "../features/employee/ContactTab";
import GeneralTab from "../features/employee/GeneralTab";
import PersonalTab from "../features/employee/PersonalTab";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";

export const tabsConfig = [
  {
    name: "General",
    element: GeneralTab,
    icon: FaUserCircle,
  },
  {
    name: "Personal",
    element: PersonalTab,
    icon: FaRegUser,
  },
  {
    name: "Contact",
    element: ContactTab,
    icon: BiSolidContact,
  },
  {
    name: "Attachments",
    element: AttachmentTab,
    icon: ImAttachment,
  },
];
