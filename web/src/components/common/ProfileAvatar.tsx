"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import userAvatar from "../../../public/images/user.png";

interface Props {
  imageUrl?: string;
  onLogout: () => void;
}

export default function ProfileAvatar({ imageUrl, onLogout }: Props) {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  const handleClickOutside = (event: any) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setPopoverVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" onClick={handleClickOutside}>
      <div className="md:ml-3 md:px-0 px-14 rounded-full  flex justify-center items-center">
        <button title="button" onClick={togglePopover} ref={buttonRef}>
          <Image
            width={100}
            height={100}
            className="w-10 h-10 rounded-full"
            src={imageUrl || userAvatar}
            alt="image"
          />
        </button>
      </div>
      {popoverVisible && (
        <div className="z-10 absolute right-0 mt-3 bg-gray-100  divide-y divide-gray-400 rounded-lg shadow w-40">
          <ul className="py-2 text-sm text-gray-600 ">
            <li className=" border-b-2 border-gray-200">
              <a
                href="/profile"
                className="block px-4 py-2  hover:text-gray-900 "
              >
                Profile
              </a>
            </li>
            <li className="">
              <button
                onClick={onLogout}
                className="block px-4 py-2 hover:text-gray-900 "
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
