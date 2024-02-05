import React from "react";
import Image from "next/image";
import userAvatar from "../../../public/images/user.png";

interface Props {
  userProfile?: string;
  username: string;
}

const ProfileBar = ({ userProfile, username }: Props) => {
  return (
    <div className="fixed left-0 top-0 h-full bg-gray-200 p-4">
      <div className="flex items-center mb-4">
        <Image
          src={userProfile || userAvatar}
          alt="User"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="font-semibold">{username}</span>
      </div>
    </div>
  );
};

export default ProfileBar;
