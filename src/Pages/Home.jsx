import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
function Home() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);
  // State to hold weather data
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

              // Fetch weather data using the latitude and longitude
              const response = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=${API_KEY}=${latitude},${longitude}`
              );

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              setWeatherData(data); // Update state with fetched data
              console.log(data);
              setLoading(false);
            },
            (error) => {
              console.error("Error getting location:", error);
              setLoading(false);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  return (
    <div className="h-screen bg-cover bg-center overflow-x-hidden bg-image-home ">
      {/* Welcome Message */}
      <div className="grid grid-cols-2">
      <div className="flex flex-col items-start justify-start ml-6 mt-16 sm:ml-16 sm:mt-20 md:ml-20 md:mt-28">
        <p className="text-white text-2xl font-medium sm:text-2xl md:text-3xl lg:text-4xl">
          Welcome back,
        </p>
        <span className="text-white text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          Hammad Farooq
        </span>
      </div>
      <div>        
        <p className="text-white text-center text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold font-custom  justify-start ml-6 mt-16 sm:ml-16 sm:mt-20 md:ml-20 md:mt-28 tracking-wider">
      {currentTime} {/* This displays the current time */}</p></div>
      </div>
      

      {/* Grid Container for Sections */}
      <div className="h-auto bg-cover bg-center overflow-x-hidden grid md:grid-cols-7 gap-4 mt-2 px-4 sm:px-8 sm:gap">
        {/* Left Section */}
        <div className="col-span-3 sm:flex flex-col items-center mt-10">
          <div>
            <p className="uppercase text-white text-sm text-left font-light md:text-base lg:text-lg">
              Upcoming Trips
            </p>
          </div>
          <div className="bg-white bg-opacity-30 backdrop-blur-sm p-4 rounded-lg text-center shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md">
            <p className="text-white text-md font-semibold md:text-lg lg:text-xl">
              No trip scheduled
            </p>
            <button className="text-white bg-opacity-30 backdrop-blur-sm p-2 rounded-lg border border-white mt-4 hover:bg-opacity-50 transition duration-300 ease-in-out"><Link to="/UnderConstruction">
              + Add new trip</Link>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-4 sm:flex flex-col items-center mt-10 ">
          <div>
            <p className="uppercase text-white text-sm text-left font-light md:text-base lg:text-lg">
              Weather
            </p>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg text-center shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : weatherData ? (
              <div>
                <p className="text-white text-lg font-semibold">
                  {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
                </p>
                <div className="flex text-center align-middle justify-center">
                  <img
                    src={weatherData.current.condition.icon}
                    alt="Wheather Icon"
                  />
                  <p className="text-white font-medium text-md text-center justify-center self-center">
                    {weatherData.current.temp_c}°C -{" "}
                    {weatherData.current.condition.text}
                  </p>
                </div>
                <p className="text-white font-medium text-md text-center justify-center self-center">
                    Humidity : {weatherData.current.heatindex_c}°C 
                  </p>

                <div>
                <p className="uppercase text-white text-sm font-light md:text-base lg:text-sm">Timezone : {weatherData.location.tz_id}</p>
                </div>
                <div>
                  <p className="uppercase text-white text-sm font-light md:text-base lg:text-sm">{weatherData.current.last_updated}</p>
                  </div>
              </div>
            ) : (
              <p className="text-white">Unable to fetch weather data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
