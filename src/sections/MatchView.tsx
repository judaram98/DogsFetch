import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import Button from "../components/Button";

interface Params {
  setMatch: (value: boolean) => void;
  favoriteDogs: string[];
  setFavoriteDogs: (value: string[]) => void;
}

interface Dog {
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const MatchView = ({ setMatch, favoriteDogs, setFavoriteDogs }: Params) => {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const matchDog = async () => {
    const response = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/dogs/match",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteDogs),
      }
    );
    const dogData = await response.json();
    const newId = [dogData.match];
    const dogList = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newId),
      }
    );
    const dogsData = await dogList.json();
    setMatchedDog(dogsData[0]);
  };

  const keepLooking = () => {
    setMatch(false);
    setFavoriteDogs([]);
  };

  useEffect(() => {
    matchDog();
  }, []);

  return (
    <div className="h-[70%] flex flex-col items-center justify-around">
      <h1 className="font-bold text-5xl text-gray-500">It's a match!</h1>
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12  xl:w-4/12 2xl:w-3/12 border rounded-lg p-1 relative">
        <img
          src={matchedDog?.img}
          alt="Name"
          className="rounded-md object-cover w-full h-96"
        />
        <p className="font-bold text-xl px-2 mt-2">{matchedDog?.name}</p>
        <div className="flex justify-between items-center -mt-1 px-2">
          <p className="text-gray-400">{matchedDog?.age} Years</p>
          <p className="text-xs font-light text-gray-400">
            {matchedDog?.zip_code}
          </p>
        </div>
        <div className="absolute top-3 right-3 py-1 px-3 font-light text-xs rounded-md text-white bg-[#300C39]">
          {matchedDog?.breed}
        </div>
      </div>
      <div
        className="w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12  xl:w-3/12 2xl:w-2/12"
        onClick={keepLooking}
      >
        <Button type="submit" value="Search Again" selected={true} />
      </div>
    </div>
  );
};

export default MatchView;
