import React from "react";
import { TagOptions } from "@/data/tags";

const TagList = () => {
  return (
    <div className="my-4">
      <select className="px-3 py-2  rounded font-bold text-dark-light focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <option value="all" className="font-semibold">
          All Tags
        </option>
        {TagOptions.map((tag) => (
          <option key={tag} className="font-semibold" value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagList;
