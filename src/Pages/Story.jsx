import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { createPortal } from "react-dom"; // Import createPortal
import "leaflet/dist/leaflet.css";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiOutlinePlus } from "react-icons/ai"; // Add icon for the button
import Header from "../Components/Header";
import UploadStory from "../Components/UploadStory";
import { Link } from "react-router-dom";
// Example video data with location and video URL
const videoData = [
  {
    latitude: 51.505,
    longitude: -0.09,
    videoUrl:
      "https://videos.pexels.com/video-files/4434242/4434242-uhd_2160_3840_24fps.mp4", // Replace with valid URL
    title: "Video 1",
  },
  {
    latitude: 51.515,
    longitude: -0.1,
    videoUrl:
      "https://videos.pexels.com/video-files/4434242/4434242-uhd_2160_3840_24fps.mp4", // Replace with valid URL
    title: "Video 2",
  },
];

const Story = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const openPopup = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const closePopup = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation();
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
          <Link to="/addstory"> <button
            className="absolute top-4 right-4 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-md z-50"
            style={{ zIndex: 1000 }}
          >
            <AiOutlinePlus className="text-2xl" />
          </button></Link>

          <MapContainer
            center={[51.505, -0.09]}
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
                position={[video.latitude, video.longitude]}
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
              onClick={closePopup}
            >
              <div
                className="relative w-full md:w-1/2 lg:w-1/3 max-w-full max-h-[90vh]"
                onClick={handleVideoClick}
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
                        {selectedVideo.title}
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
