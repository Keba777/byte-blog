import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";


const Like = () => {
  const [toggle, setToggle] = useState(false);
  const onToggle = () => {
    setToggle(!toggle);
  };
  return (
    <span onClick={onToggle} className="flex items-center cursor-pointer  border rounded-full p-2">
      {toggle ?  <BsFillHeartFill className="text-red-500"/>: <BsHeart /> }
    </span>
  );
};

export default Like;
