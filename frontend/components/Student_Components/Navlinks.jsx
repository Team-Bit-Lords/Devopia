import Link from "next/link";

const links = [
  { href: "/dashboard", label: "DashBoard" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/chat", label: "Chatbot" },
  { href: "/redeem", label: "Redeem" },
  { href: "/assignments", label: "Assignments" },
  { href: "/profile", label: "profile" },
];

const NavLinks = () => {

  
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={`/student${link.href}`} className="capitalize">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
