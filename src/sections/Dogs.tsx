import { useEffect, useState } from "react";
import DogCard from "../components/DogCard";
import apiService from "../services/apiService";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: number;
  breed: string;
}

interface Params {
  selectedBreed: string;
  order: string;
  setTotalResults: (value: number) => void;
  page: number;
  favoriteDogs: string[];
  setFavoriteDogs: (value: string[]) => void;
}

const Dogs = ({
  selectedBreed,
  order,
  setTotalResults,
  page,
  favoriteDogs,
  setFavoriteDogs,
}: Params) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  const dogFetch = async () => {
    const response = await apiService.fetchData(
      `https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=${
        page * 25
      }${selectedBreed ? `&breeds=${selectedBreed}` : ``}&sort=name:${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    setTotalResults(data.total);
    const dogList = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data.resultIds),
      }
    );
    const dogsData = await dogList.json();
    setDogs(dogsData);
  };

  useEffect(() => {
    dogFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBreed, order, page]);

  return (
    <main
      className="h-[55%] md:h-[60%] overflow-scroll no-scrollbar"
      role="region"
    >
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
        {dogs.map((dog) => {
          return (
            <DogCard
              id={dog.id}
              key={dog.id}
              img={dog.img}
              name={dog.name}
              age={dog.age}
              zip={dog.zip_code}
              breed={dog.breed}
              favoriteDogs={favoriteDogs}
              setFavoriteDogs={setFavoriteDogs}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Dogs;
