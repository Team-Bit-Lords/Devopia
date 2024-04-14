import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";

const links = [
  { href: "/dashboard", label: "DashBoard" , img: <MdOutlineDashboard /> },
  { href: "/assignments", label: "Assignments" , img:<MdOutlineLibraryBooks />  },
  { href: "/attendance", label: "Attendance" , img: <FaFileSignature /> },
  { href: "/addquiz", label: "Add a Quiz" , img: <MdQuiz />
},

];

const NavLinks = () => {
  return (
    <ul className="menu  text-2xl font-medium">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <div className="flex my-2">
              {link.img}
            <Link href={`/teacher${link.href}`} className="capitalize">
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
