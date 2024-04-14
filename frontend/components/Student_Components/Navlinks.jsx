import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { MdRedeem } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const links = [
  { href: "/dashboard", label: "DashBoard", img: <MdOutlineDashboard /> },
  { href: "/leaderboard", label: "Leaderboard" , img: <MdLeaderboard />},
  { href: "/chat", label: "Chatbot" , img: <IoIosChatboxes /> },
  { href: "/redeem", label: "Redeem" , img: <MdRedeem />},
  { href: "/assignments", label: "Assignments" , img: <MdLibraryBooks />},
  { href: "/profile", label: "profile" , img: <CgProfile /> },
];

const NavLinks = () => {
  return (
    <ul className="menu text-2xl font-medium">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <div className="flex my-2">
              {link.img}
              <Link href={`/student${link.href}`} className="capitalize">
                {link.label}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
