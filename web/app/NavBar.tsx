import Link from "next/link";
import logo from "@/public/images/logo.svg";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const NavBar = () => {
  return (
    <nav className="p-2 flex justify-between items-center space-x-5  bg-gray-100">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>

        <ul className="flex space-x-5 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Link href="/login" className="px-4 py-2 rounded ">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
