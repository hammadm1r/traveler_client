import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../Components/Header";

const TravelAdvisor = () => {
  const [province, setProvince] = useState("");
  const [destinationType, setDestinationType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const provinces = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"];
  const destinationTypes = ["Mountains", "Beaches", "Historical Sites"];

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setResults([
        { name: "Fairy Meadows", image: "fairy.jpg", description: "A breathtaking spot in the mountains." },
        { name: "Gwadar Beach", image: "gwadar.jpg", description: "A beautiful beach with stunning views." },
        { name: "Lahore Fort", image: "lahore.jpg", description: "A historic site full of rich culture." },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
    <Header />
    <div className="h-auto flex flex-col items-center justify-center bg-cover  bg-center bg-travelAdvisor text-white py-10" >
      <div className=" fixed w-full h-full top-0 left-0"></div>
      
      <h1 className="text-4xl font-bold mb-2 relative z-10">Discover Your Next Adventure</h1>
      <p className="mb-6 text-lg relative z-10">Select your province and destination type, and let us suggest the best travel spots for you!</p>
      
      <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-96">
        <div className="mb-4">
          <label className="block text-lg mb-2">Province</label>
          <div className="flex items-center bg-white p-2 rounded-lg">
            <FaMapMarkerAlt className="text-gray-700 mr-2" />
            <select className="w-full bg-transparent text-black focus:outline-none" onChange={(e) => setProvince(e.target.value)}>
              <option value="">Select Province</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Destination Type</label>
          <div className="flex items-center bg-white p-2 rounded-lg">
            <MdOutlineTravelExplore className="text-gray-700 mr-2" />
            <select className="w-full bg-transparent text-black focus:outline-none" onChange={(e) => setDestinationType(e.target.value)}>
              <option value="">Select Type</option>
              {destinationTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-400 to-green-400 text-white p-3 rounded-lg mt-4 hover:opacity-80 transition">
          Find My Destination
        </button>
      </div>

      {loading && <AiOutlineLoading3Quarters className="mt-6 text-4xl animate-spin" />}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
        {results.map((place, index) => (
          <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-lg shadow-lg w-80">
            <img src={place.image} alt={place.name} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-xl font-bold mt-2">{place.name}</h2>
            <p className="text-sm mt-1">{place.description}</p>
            <button className="mt-2 text-blue-300 hover:underline">More Info</button>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-sm text-gray-300 relative z-10">
        © 2025 Traveler | Follow us on social media
      </footer>
    </div>
    </>
  );
};

export default TravelAdvisor;
