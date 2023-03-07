import Loading from "@/components/Loading";
import { Search } from "@/components/Search";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
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
  error?: boolean;
  loading?: boolean;
  message?: string;
}

export default function Banner() {
  const [location, setLocation] = useState<string>("Jakarta");

  const [result, setResult] = useState<ResultWeather>({
    weather: [],
    temp: "",
    humidity: 0,
    windSpeed: 0,
    location: "",
    error: false,
    loading: true,
    message: "",
  });

  // calling api
  useEffect(() => {
    async function getDataWeatherByCity() {
      const APIKey = "97aa49b935f1f1a27b3062f2c43c5fca";
      try {
        setResult({ loading: true });
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`
        );

        setResult({
          weather: response?.data?.weather,
          location: response?.data?.name,
          temp: response.data?.main?.temp,
          humidity: response.data?.main?.humidity,
          windSpeed: response.data?.wind?.speed,
          error: false,
          loading: false,
        });
      } catch (error: any) {
        setResult({
          loading: false,
          weather: [],
          location: "",
          temp: "",
          humidity: 0,
          windSpeed: 0,
          error: true,
          message: error?.response?.data?.message,
        });
      }
    }

    getDataWeatherByCity();
  }, [location]);

  return (
    <div className="bg-gradient-to-b from-[#91abec] to-yellow-200 h-screen w-screen">
      <div className="max-w-5xl mx-auto flex justify-center items-center h-full ">
        <div className="bg-white flex flex-col space-y-8 lg:space-y-12 h-[33rem] w-[22rem] md:h-[38rem] md:w-[25rem] lg:h-[43rem] lg:w-[35rem] rounded-2xl shadow-lg px-10 py-12">
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

              <h1 className="font-medium text-2xl">{result?.location}</h1>
            </div>

            <Search location={setLocation} />
          </div>

          {result.loading ? (
            <Loading />
          ) : result.error ? (
            <div className="space-y-10">
              <div className="flex justify-center">
                <Image
                  src={rainImage}
                  alt={"rain"}
                  className="w-40 md:w-52 lg:w-56"
                />
              </div>
              <h1 className="font-bold text-2xl md:text-3xl flex justify-center">
                {result?.message}
              </h1>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                {result?.weather[0]?.main === "Rain" && (
                  <Image
                    src={rainImage}
                    alt={"rain"}
                    className="w-40 md:w-52 lg:w-56"
                  />
                )}
                {result?.weather[0]?.main === "Clear" && (
                  <Image
                    src={clearImage}
                    alt={"clear"}
                    className="w-40 md:w-52 lg:w-56"
                  />
                )}
                {result?.weather[0]?.main === "Snow" && (
                  <Image
                    src={snowImage}
                    alt={"snow"}
                    className="w-40 md:w-52 lg:w-56"
                  />
                )}
                {result?.weather[0]?.main === "Clouds" && (
                  <Image
                    src={cloudImage}
                    alt={"cloud"}
                    className="w-40 md:w-52 lg:w-56"
                  />
                )}
                {result?.weather[0]?.main === "Haze" && (
                  <Image
                    src={mistImage}
                    alt={"haze"}
                    className="w-40 md:w-52 lg:w-56"
                  />
                )}
              </div>

              <div className="space-y-2">
                <h1 className="font-bold text-5xl  lg:text-6xl flex justify-center">
                  {result?.temp}
                  <span className="text-2xl md:text-3xl lg:text-4xl"> °C</span>
                </h1>
                <h1 className="font-bold text-2xl  lg:text-3xl flex justify-center">
                  {result?.weather[0]?.description}
                </h1>
              </div>
              <div className="flex justify-center ">
                {/* temp */}
                <div className="flex space-x-10 justify-evenly w-full">
                  <div className="flex items-center space-x-5">
                    <div className="text-2xl md:text-3xl">
                      <i className="fa-solid fa-wind"></i>
                    </div>

                    <div className="-space-y-1">
                      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                        {result?.humidity} %
                      </h1>
                      <h1 className="font-medium  text-lg md:text-xl text-gray-500">
                        Humidity
                      </h1>
                    </div>
                  </div>

                  {/* speed */}
                  <div className="flex items-center   space-x-5">
                    <div className="text-2xl md:text-3xl">
                      <i className="fa-solid fa-water"></i>
                    </div>

                    <div className="-space-y-1">
                      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                        {result?.windSpeed}
                      </h1>
                      <h1 className="font-medium  text-lg md:text-xl text-gray-500">
                        Wind Speed
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
