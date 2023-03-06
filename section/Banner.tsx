import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  notFoundImage,
  cloudImage,
  mistImage,
  rainImage,
  snowImage,
  clearImage,
} from "../assets";

interface ResultWeather {
  weather?: any;
  temp?: string;
  humidity?: number;
  windSpeed?: number;
  location?: string;
}

export default function Banner() {
  const [location, setLocation] = useState<string>("Jakarta");

  const [result, setResult] = useState<ResultWeather>({
    weather: [],
    temp: "",
    humidity: 0,
    windSpeed: 0,
    location: "",
  });

  // calling api
  useEffect(() => {
    async function getDataWeatherByCity() {
      const APIKey = "97aa49b935f1f1a27b3062f2c43c5fca";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`
      );

      setResult({
        weather: response?.data?.weather,
        location: response?.data?.name,
        temp: response.data?.main?.temp,
        humidity: response.data?.main?.humidity,
        windSpeed: response.data?.wind?.speed,
      });
    }

    getDataWeatherByCity();
  }, [location]);

  return (
    <div className="bg-gradient-to-b from-[#B4C9FF] to-white h-screen w-screen">
      <div className="max-w-5xl mx-auto flex justify-center items-center h-full">
        <div className="bg-white flex flex-col justify-between h-[40rem] w-[35rem] rounded-2xl shadow-lg px-10 py-12">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#7E7E7E]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <h1 className="font-bold text-2xl">{result?.location}</h1>
            </div>

            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-[#7E7E7E]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center">
            {result?.weather[0]?.main === "Rain" && (
              <Image src={rainImage} alt={"rain"} className="w-80" />
            )}
            {result?.weather[0]?.main === "Clear" && (
              <Image src={clearImage} alt={"clear"} className="w-80" />
            )}
            {result?.weather[0]?.main === "Snow" && (
              <Image src={snowImage} alt={"snow"} className="w-80" />
            )}
            {result?.weather[0]?.main === "Clouds" && (
              <Image src={cloudImage} alt={"cloud"} className="w-80" />
            )}
            {result?.weather[0]?.main === "Haze" && (
              <Image src={mistImage} alt={"haze"} className="w-80" />
            )}
          </div>
          <div className="flex justify-center ">
            {/* temp */}
            <div className="flex space-x-10">
              <div className="flex items-center space-x-5">
                <div className="text-3xl">
                  <i className="fa-solid fa-wind"></i>
                </div>

                <div className="-space-y-1">
                  <h1 className="font-bold text-3xl">{result?.temp}</h1>
                  <h1 className="font-medium text-xl text-gray-500">
                    Kelembaban
                  </h1>
                </div>
              </div>

              {/* speed */}
              <div className="flex items-center  space-x-5">
                <div className="text-3xl">
                  <i className="fa-solid fa-water"></i>
                </div>

                <div className="-space-y-1">
                  <h1 className="font-bold text-3xl">{result?.windSpeed}</h1>
                  <h1 className="font-medium text-xl text-gray-500">
                    Kecepatan angin
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
