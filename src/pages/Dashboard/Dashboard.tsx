import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import FetchLogo from "../../assets/Fetch_Logo.jpeg";
import TextField from "../../components/TextField";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import DogCard from "../../components/DogCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [breeds, setBreeds] = useState([]);
  // const [Dogs, setDogs] = useState([]);

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
    console.log(data);
    if (data) {
      // const dogsInfo = await apiService.fetchData(
      //   "https://frontend-take-home-service.fetch.com/dogs",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     credentials: "include",
      //     queryParams: JSON.stringify(data.resultIds),
      //   }
      // );
      // console.log(dogsInfo);
    }
  };

  useEffect(() => {
    breedFetch();
  }, []);

  useEffect(() => {
    dogFetch();
  }, [search]);

  return (
    <div className="h-screen px-20 pt-14">
      <header className="flex flex-col items-center relative h-[20%]">
        <img src={FetchLogo} alt="Logo" className="h-5/6" />
        <h1 className="text-3xl font-light text-[#300C39] -mt-4 tracking-widest">
          Dogs
        </h1>
        <div
          className="w-32 absolute right-0"
          onClick={() => {
            logout();
          }}
        >
          <Button type="submit" value="Log Out" />
        </div>
      </header>
      <section className="flex items-center h-[10%]">
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
      <section className="h-[60%] overflow-scroll">
        <div className="w-full flex flex-wrap gap-10 mx-7">
          <DogCard
            img="https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg"
            name="Emory"
            age={10}
            zip={48333}
            breed="Chihuahua"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
