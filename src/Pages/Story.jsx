import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { createPortal } from "react-dom";
import "leaflet/dist/leaflet.css";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiOutlinePlus } from "react-icons/ai"; // Add icon for the button
import Header from "../Components/Header";
import UploadStory from "../Components/UploadStory";
import { Link } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";

// Example video data with location and video URL

const Story = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch geolocation
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });

        // Fetch story data
        const response = await axiosClient.get('/story/getstory');
        console.log(response.data.result.allStory);
        setVideoData(response.data.result.allStory);  
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);  // Empty dependency array means this effect runs once on mount

  const openPopup = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const closePopup = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation(); // Prevent closing the popup when interacting with the video
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleAddStory = () => {
    alert(<UploadStory />);
  };

  return (
    <>
      {/* Title Section */}
      <Header />
      <div className="flex flex-col md:flex-row">
        {/* Map Section */}
        <div className="flex-grow h-[80vh] md:w-2/3 relative z-0">
          {/* Add Story Button */}
          <Link to="/addstory">
            <button
              className="absolute top-4 right-4 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-md z-50"
              style={{ zIndex: 1000 }}
            >
              <AiOutlinePlus className="text-2xl" />
            </button>
          </Link>

          {/* Map */}
          <MapContainer
            center={[lat || 51.505, long || -0.09]} // Fallback to a default location if lat/long are not set
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Loop through video data and create markers */}
            {videoData.map((video, index) => (
              <Marker
                key={index}
                position={[video.location.latitude, video.location.longitude]}
                eventHandlers={{
                  click: () => openPopup(video),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* Custom Popup for Selected Video */}
        {selectedVideo &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex justify-center items-center p-4"
              onClick={closePopup}  // Close the popup when clicking outside
            >
              <div
                className="relative w-full md:w-1/2 lg:w-1/3 max-w-full max-h-[90vh]"
                onClick={handleVideoClick} // Prevent closing the popup when interacting with the video
              >
                <video
                  ref={videoRef}
                  className="w-full h-auto rounded-lg shadow-md"
                  controls
                  autoPlay
                  volume={1}
                  style={{ maxHeight: "60vh" }}
                  onPlay={handlePlay}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {isPlaying && (
                  <>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-y-4">
                      <div className="text-white text-lg font-semibold bg-black bg-opacity-60 px-4 py-2 rounded-md">
                        {selectedVideo.title}  {/* Display video title */}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-4">
                      <FcLikePlaceholder className="text-3xl hover:text-yellow-400 transition duration-300" />
                    </div>
                  </>
                )}
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
};

export default Story;
