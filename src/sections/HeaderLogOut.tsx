import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import apiService from "../services/apiService";
import FetchLogo from "../assets/Fetch_Logo.png";
import Log_Out from "../assets/Log_Out.svg";

interface Params {
  match: boolean;
  setMatch: (value: boolean) => void;
  favoriteDogs: string[];
  canMatch: boolean;
  setCanMatch: (value: boolean) => void;
}

const HeaderLogOut = ({
  match,
  setMatch,
  favoriteDogs,
  canMatch,
  setCanMatch,
}: Params) => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

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

  const toggleMatch = () => {
    if (!match && favoriteDogs.length > 0) {
      setMatch(true);
      setCanMatch(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className="flex flex-col items-center relative h-[20%]"
      role="banner"
    >
      <span
        className={`animate-ping absolute h-32 w-32 rounded-full bg-[#FBA819] opacity-10 top-5 ${
          favoriteDogs.length != 0 && canMatch ? "" : "hidden"
        }`}
      ></span>
      <span
        className={`animate-ping absolute h-20 w-20 rounded-full bg-[#FBA819] opacity-10 top-10 ${
          favoriteDogs.length != 0 && canMatch ? "" : "hidden"
        }`}
      ></span>
      <img
        src={FetchLogo}
        alt="Logo"
        className={`h-5/6 z-10 ${
          favoriteDogs.length != 0 && canMatch ? "cursor-pointer" : ""
        }`}
        onClick={toggleMatch}
      />
      <h1 className="text-3xl font-light text-[#300C39] -mt-4 tracking-widest z-10">
        {favoriteDogs.length != 0 && canMatch ? "Tap to match" : "Dogs"}
      </h1>
      <nav
        className="w-32 absolute right-0 flex justify-end"
        onClick={() => {
          logout();
        }}
      >
        {isSmallScreen ? (
          <img src={Log_Out} alt="Log out" className="text-[#300C39] w-10" />
        ) : (
          <Button type="submit" value="Log Out" selected={true} />
        )}
      </nav>
    </header>
  );
};

export default HeaderLogOut;
