import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { createPortal } from "react-dom"; // Import createPortal
import "leaflet/dist/leaflet.css";
import { FcLikePlaceholder } from "react-icons/fc";

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
  // Add more data as needed
];

const Story = () => {
  const [selectedVideo, setSelectedVideo] = useState(null); // Track the selected video
  const [isPlaying, setIsPlaying] = useState(false); // Track if the video is playing

  const videoRef = useRef(null); // Reference to the video element

  // Open video popup
  const openPopup = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false); // Reset playing state when a new video is selected
  };

  // Close video popup
  const closePopup = () => {
    setSelectedVideo(null);
    setIsPlaying(false); // Reset playing state when closing the popup
  };

  // Prevent video close if clicked inside the video player
  const handleVideoClick = (e) => {
    e.stopPropagation(); // Prevent closing when clicking on the video player
  };

  // Handle video play
  const handlePlay = () => {
    setIsPlaying(true); // Mark the video as playing when the play event occurs
  };

  return (
    <>
      {/* Title Section */}
      <div className="bg-gradient-to-r from-blue-400 to-teal-400 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Story Section</h1>
        <p className="mt-2 text-lg">Discover videos at various locations</p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Map Section */}
        <div className="flex-grow h-[80vh] md:w-2/3 relative z-0">
          {/* Set z-index for the map */}
          <MapContainer
            center={[51.505, -0.09]} // Default position
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
              onClick={closePopup} // Close video when clicking outside
            >
              {/* Video Content */}
              <div
                className="relative w-full md:w-1/2 lg:w-1/3 max-w-full max-h-[90vh]"
                onClick={handleVideoClick} // Prevent close when clicking inside the video
              >
                {/* Video */}
                <video
                  ref={videoRef}
                  className="w-full h-auto rounded-lg shadow-md"
                  controls
                  autoPlay
                  volume={1} // Set video to full volume
                  style={{ maxHeight: "60vh" }}
                  onPlay={handlePlay} // Trigger when the video starts playing
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Wrapper for both elements */}
                {isPlaying && (
                  <>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-y-4">
                      {/* Title */}
                      <div className="text-white text-lg font-semibold bg-black bg-opacity-60 px-4 py-2 rounded-md">
                        {selectedVideo.title}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-4">
                      {/* Like Button */}
                      <FcLikePlaceholder className="text-3xl text-white hover:text-yellow-400 transition duration-300" />
                    </div>
                  </>
                )}
              </div>
            </div>,
            document.body // Attach the popup to the body, not the map container
          )}
      </div>
    </>
  );
};

export default Story;
