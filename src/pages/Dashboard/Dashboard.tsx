import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import FetchLogo from "../../assets/Fetch_Logo.jpeg";
import TextField from "../../components/TextField";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import DogCard from "../../components/DogCard";

interface Dog {
  id: number;
  img: string;
  name: string;
  age: number;
  zip_code: number;
  breed: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [breeds, setBreeds] = useState([]);
  const [Dogs, setDogs] = useState<Dog[]>([]);

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

  const logout = async () => {
    const response = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      navigate("/");
    }
  };

  const dogFetch = async () => {
    const response = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=0",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        queryParams: {
          breeds: selectedBreed,
          zipCodes: "",
          ageMin: "",
          ageMax: "",
        },
      }
    );
    const data = await response.json();
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
    breedFetch();
  }, []);

  useEffect(() => {
    dogFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <main className="h-screen px-20 pt-14">
      <header
        className="flex flex-col items-center relative h-[20%]"
        role="banner"
      >
        <img src={FetchLogo} alt="Logo" className="h-5/6" />
        <h1 className="text-3xl font-light text-[#300C39] -mt-4 tracking-widest">
          Dogs
        </h1>
        <nav
          className="w-32 absolute right-0"
          onClick={() => {
            logout();
          }}
        >
          <Button type="submit" value="Log Out" />
        </nav>
      </header>
      <section className="flex items-center h-[10%]" role="search">
        <TextField
          type="text"
          id="search"
          value={search}
          placeholder="Search for dogs"
          setValue={setSearch}
        />
        <Dropdown
          items={breeds}
          selectedItem={selectedBreed}
          setSelectedItem={setSelectedBreed}
        />
      </section>
      <main className="h-[60%] overflow-scroll" role="region">
        <div className="w-full flex flex-wrap gap-10 mx-7">
          {Dogs.map((dog) => {
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
    </main>
  );
};

export default Dashboard;
