import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import apiService from "../services/apiService";
import Button from "../components/Button";

interface Search {
  selectedBreed: string;
  setSelectedBreed: (value: string) => void;
  order: string;
  setOrder: (value: string) => void;
}

const SearchFilter = ({
  selectedBreed,
  setSelectedBreed,
  order,
  setOrder,
}: Search) => {
  const [breeds, setBreeds] = useState([]);
  const [asc, setAsc] = useState(false);
  const [desc, setDesc] = useState(false);

  const breedFetch = async () => {
    const response = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/dogs/breeds",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data) {
      setBreeds(data);
    }
  };

  const toggleOrder = (value: string) => {
    setOrder(value);
  };

  useEffect(() => {
    breedFetch();
  }, []);

  useEffect(() => {
    if (order === "asc") {
      setAsc(true);
      setDesc(false);
    } else {
      setAsc(false);
      setDesc(true);
    }
  }, [order]);

  return (
    <section
      className="flex justify-between items-center h-[15%] md:h-[10%] flex-col md:flex-row"
      role="search"
    >
      <Dropdown
        items={breeds}
        selectedItem={selectedBreed}
        setSelectedItem={setSelectedBreed}
      />
      <div className="w-7/12 sm:w-5/12 md:w-3/12 lg:w-2/12 h-full flex items-center justify-between">
        <p>Sort:</p>
        <div
          className="w-4/12"
          onClick={() => {
            toggleOrder("asc");
          }}
        >
          <Button type="submit" value="Asc" selected={asc} />
        </div>
        <div
          className="w-4/12"
          onClick={() => {
            toggleOrder("desc");
          }}
        >
          <Button type="submit" value="Desc" selected={desc} />
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
