import { useState } from "react";
import FetchLogo from "../../assets/Fetch_Logo.jpeg";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        // Aquí podrías manejar la lógica de éxito
        // onLoginSuccess();
        console.log(response);
      } else {
        // Aquí podrías manejar la lógica de error
        console.error("Error login in");
      }
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <img src={FetchLogo} alt="Logo" className="w-2/12" />
      <h1 className="text-3xl font-light text-[#300C39] -mt-4 tracking-widest">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="w-3/12 mt-5 flex flex-col gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-500 pl-3"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="px-3 border border-neutral-300 tex-neutral-300 font-normal rounded-lg h-10 outline-[#FBA819]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-500 pl-3"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 border border-neutral-300 tex-neutral-300 font-normal rounded-lg h-10 outline-[#FBA819]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FBA819] hover:bg-[#E1981F] text-white py-2 rounded-lg"
        >
          Iniciar Sesión
        </button>
      </form>
    </section>
  );
};

export default Login;
