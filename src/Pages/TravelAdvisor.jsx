import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../Components/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MoreInfoModal from "../Components/MoreInfoModel";
const TravelAdvisor = () => {
  const [province, setProvince] = useState("");
  const [destinationType, setDestinationType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null); // Track the selected place

  const openModal = (place) => {
    setSelectedPlace(place);
  };

  const closeModal = () => {
    setSelectedPlace(null);
  };
  const provinces = [
    "Punjab",
    "Sindh",
    "Khyber−Pakhtunkhwa",
    "Balochistan",
    "Gilgit−Baltistan",
    "Islamabad",
    "Azad−Kashmir",
  ];

  const destinationTypes = [
    "Mountainous",
    "Valley",
    "Lake",
    "Waterfall",
    "Coastal",
    "Hill Station",
    "Mosque",
    "Fort",
    "Temple",
    "Museum",
    "National Park",
    "Monument",
    "Resort",
    "Desert",
    "Mine",
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://aae26050-01cf-47f0-b15c-7d6f334e28f6-00-25sw2s41mfz0l.pike.replit.dev:5000/recommend?district=${encodeURIComponent(
          province
        )}&category=${encodeURIComponent(destinationType)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setResults(data); // assuming data is an array of recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="h-auto flex flex-col items-center justify-center bg-cover  bg-center text-white py-10" style={{
        backgroundImage:
          "url('https://res.cloudinary.com/djiqzvcev/image/upload/v1751669906/30765-3-travel-photos_c2rmpx.png')",
      }}>
        <div className=" fixed w-full h-full top-0 left-0"></div>

        <h1 className="text-4xl font-bold mb-2 relative z-10">
          Discover Your Next Adventure
        </h1>
        <p className="mb-6 text-lg relative z-10">
          Select your province and destination type, and let us suggest the best
          travel spots for you!
        </p>

        <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-96">
          <div className="mb-4">
            <label className="block text-lg mb-2">Province</label>
            <div className="flex items-center bg-white p-2 rounded-lg">
              <FaMapMarkerAlt className="text-gray-700 mr-2" />
              <select
                className="w-full bg-transparent text-black focus:outline-none"
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="">Select Province</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Destination Type</label>
            <div className="flex items-center bg-white p-2 rounded-lg">
              <MdOutlineTravelExplore className="text-gray-700 mr-2" />
              <select
                className="w-full bg-transparent text-black focus:outline-none"
                onChange={(e) => setDestinationType(e.target.value)}
              >
                <option value="">Select Type</option>
                {destinationTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white p-3 rounded-lg mt-4 hover:opacity-80 transition"
          >
            Find My Destination
          </button>
        </div>

        {loading && (
          <AiOutlineLoading3Quarters className="mt-6 text-4xl animate-spin" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
          {results.map((place, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-lg shadow-lg w-80 relative"
            >
              {/* Map positioned on top */}
              <div className="relative h-40 w-full">
                <MapContainer
                  center={[place.latitude, place.longitude]}
                  zoom={13}
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[place.latitude, place.longitude]}>
                    <Popup>{place._key}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              {/* Place title */}
              <h2 className="text-xl font-bold mt-2">{place._key}</h2>
              <p className="text-sm mt-1 truncate">{place.Desc}</p>
              <p className="text-xs text-gray-300 mt-1">
                {place.district} • Lat: {place.latitude.toFixed(3)} • Lng:{" "}
                {place.longitude.toFixed(3)}
              </p>
              <button className="mt-2 text-blue-300 hover:underline" 
            onClick={() => openModal(place)}>
                More Info
              </button>
            </div>
          ))}
        </div>
        {selectedPlace && (
        <MoreInfoModal place={selectedPlace} onClose={closeModal} />
      )}
      </div>
    </>
  );
};

export default TravelAdvisor;
