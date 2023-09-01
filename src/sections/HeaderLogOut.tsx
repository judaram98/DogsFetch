import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import FetchLogo from "../assets/Fetch_Logo.jpeg";

const HeaderLogOut = () => {
  const navigate = useNavigate();

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

  return (
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
        <Button type="submit" value="Log Out" selected={true} />
      </nav>
    </header>
  );
};

export default HeaderLogOut;
