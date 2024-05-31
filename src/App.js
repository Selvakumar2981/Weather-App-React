import React, { useState } from "react";
import trees from "./Resources/Animation - 1705552131148.json";
import axios from "axios";
import Lottie from "react-lottie";
export default function App() {
  const [ip, setIp] = useState("");
  const [data,setData] = useState({
        temp:0,
        humidity:0,
        high_temp:0
  })
  const submit = async (e) => {
    e.preventDefault();
    const responses = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${ip}&appid=21f10744539dbbf1f149c533fbc67eb3`
    );
    setData({ ...data, temp: responses.data.main.temp-273.15 })
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: trees,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };
  return (
    <>
      <h1 className="md:text-[60px] text-4xl text-center my-8">
        <span className="hidden md:inline">Welcome to</span>
        <span className="text-teal-400 md:inline block">WeatherApp</span>
        <span className="hidden md:inline">🌱</span>
      </h1>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-1/2 h-96 border-dashed border-4 rounded-lg">
          <form
            action=""
            className="w-full  flex justify-center py-7"
            onSubmit={submit}
          >
            <input
              type="text"
              placeholder="Enter city name.."
              className="h-10 w-96 text-2xl border-teal-400 outline-teal-400"
              onChange={(e) => setIp(e.target.value)}
            />
            <button
              type="submit"
              className="h-11 ms-6 bg-teal-400 text-white w-32 rounded-lg border-solid border-2"
            >
              Search
            </button>
          </form>
          <h1 className="text-center text-2xl"> 🌡️ {data.temp}</h1>
        </div>
        <div className="w-full md:w-1/2 md:h-96 h-48 p-4">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </>
  );
}
