import { useEffect, useState } from "react";
import DogCard from "../components/DogCard";
import apiService from "../services/apiService";

interface Dog {
  id: number;
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
}

const Dogs = ({ selectedBreed, order, setTotalResults, page }: Params) => {
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
    <main className="h-[60%] overflow-scroll" role="region">
      <div className="w-full flex flex-wrap gap-10 mx-7">
        {dogs.map((dog) => {
          return (
            <DogCard
              key={dog.id}
              img={dog.img}
              name={dog.name}
              age={dog.age}
              zip={dog.zip_code}
              breed={dog.breed}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Dogs;
