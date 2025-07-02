import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Home() {
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // States
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [newItem, setNewItem] = useState("");

  const isFirstLoad = useRef(true);

  // Update current time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
    console.log("Loaded wishlist:", storedWishlist);
  }, []);

  // Save wishlist to localStorage (ignore initial load)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    console.log("Saving wishlist to localStorage:", wishlist);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add wishlist item
  const addWishlistItem = () => {
    if (!newItem.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: newItem.trim(),
    };
    setWishlist((prev) => [...prev, newEntry]);
    setNewItem("");
  };

  // Delete item from wishlist
  const deleteItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
  };

  // Fetch weather data
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
              );
              if (!response.ok) throw new Error("Weather API error");

              const data = await response.json();
              setWeatherData(data);
              setLoading(false);
            },
            (error) => {
              console.error("Geolocation error:", error);
              setLoading(false);
            }
          );
        } else {
          console.log("Geolocation not supported.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  return (
   <div
  className="h-screen bg-center bg-no-repeat bg-cover overflow-x-hidden"
  style={{
    backgroundImage: "url('https://res.cloudinary.com/djiqzvcev/image/upload/v1735323187/Profile_Pictures/z85wimxtvordqrr9u3sd.png')",
  }}>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-start justify-start ml-6 mt-16 sm:ml-16 sm:mt-20 md:ml-20 md:mt-28">
          <p className="text-white text-2xl font-medium sm:text-2xl md:text-3xl lg:text-4xl">
            Welcome back,
          </p>
          <span className="text-white text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {myProfile?.fullname}
          </span>
        </div>
        <div>
          <p className="text-white text-center text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold font-custom justify-start ml-6 mt-16 sm:ml-16 sm:mt-20 md:ml-20 md:mt-28 tracking-wider">
            {currentTime}
          </p>
        </div>
      </div>

      {/* Grid Container */}
      <div className="h-auto grid md:grid-cols-7 gap-4 mt-2 px-4 sm:px-8">
        {/* Wishlist */}
        <div className="col-span-3 sm:flex flex-col items-center mt-10">
          <p className="uppercase text-white text-sm text-left font-light md:text-base lg:text-lg mb-2">
            Wishlist
          </p>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg text-center shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md">
            {wishlist.length === 0 ? (
              <p className="text-white text-md font-semibold md:text-lg lg:text-xl">
                No items in wishlist
              </p>
            ) : (
              <ul className="text-white font-medium text-left list-disc list-inside space-y-1">
                {wishlist.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.title}</span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-200 hover:text-red-400 text-sm ml-2"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Input Field */}
            <div className="mt-4">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter a place..."
                className="p-2 rounded w-full text-white bg-white bg-opacity-20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-white transition duration-200 mb-2"
              />
              <button
                onClick={addWishlistItem}
                className="text-white bg-white bg-opacity-10 backdrop-blur-sm p-2 rounded-lg border border-white w-full hover:bg-opacity-20 transition duration-300 ease-in-out"
              >
                + Add to wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Weather */}
        <div className="col-span-4 sm:flex flex-col items-center mt-10">
          <p className="uppercase text-white text-sm text-left font-light md:text-base lg:text-lg mb-2">
            Weather
          </p>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg text-center shadow-lg w-full max-w-xs md:max-w-sm lg:max-w-md">
            {loading ? (
              <Loader />
            ) : weatherData ? (
              <div>
                <p className="text-white text-lg font-semibold">
                  {weatherData.location.name}, {weatherData.location.region},{" "}
                  {weatherData.location.country}
                </p>
                <div className="flex justify-center items-center mt-2">
                  <img src={weatherData.current.condition.icon} alt="Weather Icon" />
                  <p className="text-white font-medium text-md ml-2">
                    {weatherData.current.temp_c}°C - {weatherData.current.condition.text}
                  </p>
                </div>
                <p className="text-white font-medium text-md mt-1">
                  Humidity: {weatherData.current.humidity}%
                </p>
                <p className="uppercase text-white text-sm mt-1">
                  Timezone: {weatherData.location.tz_id}
                </p>
                <p className="uppercase text-white text-sm">
                  {weatherData.current.last_updated}
                </p>
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
