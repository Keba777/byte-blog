"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/authSlice";
import ProfileAvatar from "./ProfileAvatar";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const NavBar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(setUser(null));
    router.push("/");
  };

  return (
    <nav className=" fixed top-0 w-full z-50 py-3 pe-5 px-5 flex justify-between items-center space-x-5  bg-gray-100">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>

        <ul className="flex space-x-5 text-sm">
          {links.map((link) => (
            <li
              key={link.href}
              className={`hover:text-slate-800 ${
                currentPath === link.href ? "text-slate-900" : "text-slate-500"
              }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {user ? (
          <ProfileAvatar
            onLogout={handleLogout}
            imageUrl={user?.profilePicture}
          />
        ) : (
          <Link
            href="/login"
            className={`text-[#3C3C3C] text-base font-semibold font-montserrat pl-5 cursor-pointer hover:text-gray-400`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
