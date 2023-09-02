import { useState } from "react";
import Heart from "../assets/Heart.svg";
import HeartFilled from "../assets/Heart_Filled.svg";
interface DogCardProps {
  id: string;
  img: string;
  name: string;
  age: number;
  zip: number;
  breed: string;
  favoriteDogs: string[];
  setFavoriteDogs: (value: string[]) => void;
}

const DogCard = ({
  id,
  img,
  name,
  age,
  zip,
  breed,
  favoriteDogs,
  setFavoriteDogs,
}: DogCardProps) => {
  const [render, setRender] = useState(false);

  const toggleFavorite = (id: string) => {
    if (favoriteDogs.includes(id)) {
      const newFavoriteDogs = favoriteDogs.filter((itemId) => itemId !== id);
      setFavoriteDogs(newFavoriteDogs);
      setRender(!render);
    } else {
      const newFavoriteDogs = [...favoriteDogs, id];
      setRender(!render);
      setFavoriteDogs(newFavoriteDogs);
    }
  };

  return (
    <div className="w-full border rounded-lg p-1 relative">
      <img
        src={img}
        alt="Name"
        className="rounded-md object-cover w-full h-60"
      />
      <div className="flex justify-between items-center px-2 mt-2">
        <p className="font-bold text-xl">{name}</p>
        <img
          src={`${favoriteDogs.includes(id) ? HeartFilled : Heart}`}
          alt="Like"
          className="w-5 cursor-pointer"
          onClick={() => {
            toggleFavorite(id);
          }}
        />
      </div>
      <div className="flex justify-between items-center -mt-1 px-2">
        <p className="text-gray-400">{age} Years</p>
        <p className="text-xs font-light text-gray-400">{zip}</p>
      </div>
      <div className="absolute top-3 right-3 py-1 px-3 font-light text-xs rounded-md text-white bg-[#300C39]">
        {breed}
      </div>
    </div>
  );
};

export default DogCard;
