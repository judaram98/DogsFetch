import React, { useState } from "react";

interface DropdownProps {
  items: string[];
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedItem,
  setSelectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative w-5/12 ml-10 flex flex-col justify-start ${
        isOpen ? "max-h-96" : "max-h-10"
      }`}
    >
      <button
        className="border border-neutral-300 text-gray-500 font-light rounded-lg h-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem || "Filter by breed"}
      </button>
      {isOpen && (
        <ul className="bg-white w-full border border-neutral-300 rounded-lg max-h-96 overflow-scroll absolute top-10">
          {items.map((item, index) => (
            <li
              className="cursor-pointer h-10 tex-center text-gray-500 font-light flex items-center justify-center hover:bg-neutral-100 rounded-lg"
              key={index}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
