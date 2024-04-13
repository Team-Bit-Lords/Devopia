import Link from "next/link";

const links = [
  { href: "/dashboard", label: "DashBoard" },
  { href: "/assignments", label: "Assignments" },
  { href: "/attendance", label: "Attendance" },
];

const NavLinks = () => {
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={`/teacher${link.href}`} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
