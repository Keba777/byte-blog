interface Props {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}

const TagSelect = ({ tag, isSelected, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(tag)}
      className={`px-3 py-1 rounded-full cursor-pointer ${
        isSelected
          ? "border border-blue-500 bg-blue-500 text-white"
          : "border border-gray-300 bg-gray-100 text-gray-700"
      }`}
    >
      {tag}
    </div>
  );
};

export default TagSelect;
