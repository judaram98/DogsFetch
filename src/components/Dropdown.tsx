import React, { useState } from "react";
import ArrowDown from "../assets/Arrow_Down.svg";

interface DropdownProps {
  items: string[];
  selectedItem: string | null;
  setSelectedItem: (value: string) => void;
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
      className={`relative w-10/12 sm:w-7/12 md:w-5/12 flex flex-col justify-start z-10 ${
        isOpen ? "max-h-96" : "max-h-10"
      }`}
    >
      <button
        className="border border-neutral-300 text-gray-500 font-light rounded-lg h-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedItem || "Filter by breed"}
      </button>
      <img
        src={ArrowDown}
        alt="Arrow"
        className={`cursor-pointer w-5 absolute right-3 top-3 duration-100 ${
          isOpen ? "rotate-180" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <ul className="bg-white w-full border border-neutral-300 rounded-lg max-h-96 overflow-scroll no-scrollbar absolute top-10">
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
