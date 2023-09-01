import { useState } from "react";
import apiService from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import FetchLogo from "../../assets/Fetch_Logo.jpeg";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await apiService.fetchData(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );
    if (response.ok) {
      navigate("principal");
    }
  };

  return (
    <header className="w-full h-screen flex flex-col justify-center items-center">
      <img src={FetchLogo} alt="Logo" className="w-2/12" />
      <h1 className="text-3xl font-light text-[#300C39] -mt-4 tracking-widest">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-3/12 mt-5 flex flex-col gap-5"
        role="form"
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-500 pl-3"
          >
            Name:
          </label>
          <TextField
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            setValue={setName}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-500 pl-3"
          >
            Email:
          </label>
          <TextField
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            setValue={setEmail}
          />
        </div>
        <Button type="submit" value="Log In" />
      </form>
    </header>
  );
};

export default Login;
