import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { createPortal } from "react-dom";
import "leaflet/dist/leaflet.css";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai"; // Add icon for the button
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-hot-toast";
import Logo from "../assets/Images/logoColor.png";
import L from "leaflet";
import ProfileImage from "../Components/ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getStoryData, likeAndUnlikeStory } from "../Toolkit/slices/storySlice";
const Story = () => {
  const dispatch = useDispatch();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const videoRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const story = useSelector((state) => state.story.story);
  const storyStatus = useSelector((state) => state.story.status);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
        setLat(51.505); // Default latitude
        setLong(-0.09); // Default longitude
      }
    );

    if (storyStatus === "idle") {
      console.log(storyStatus);
      dispatch(getStoryData());
    }
  }, [dispatch, storyStatus]);
  useEffect(() => {
    if (selectedVideo) {
      setIsLiked(selectedVideo.isLiked); // Sync when video changes
    }
  }, [selectedVideo]);
  const handleLike = (storyId) => {
    dispatch(likeAndUnlikeStory({ storyId }));
    setAnimating(true);
    setIsLiked((prev) => !prev);
  };
  // Render Outlet when feed is available, else render loading or placeholder
  if (storyStatus === "loading") {
    return <Loader />;
  }

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
          {lat && long ? (
            <MapContainer
              center={[lat, long]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Loop through video data and create markers */}
              {story.map((video) => (
                <Marker
                  key={video._id} // Ensure each marker has a unique key
                  position={[video.location.latitude, video.location.longitude]}
                  eventHandlers={{
                    click: () => openPopup(video),
                  }}
                  icon={L.divIcon({
                    className: "custom-marker",
                    html: `<div class="w-8 h-8 border-2 border-bgPrimary rounded-full overflow-hidden">
      <img src="${video?.user.profilePicture?.url}" alt="User" class="w-full h-full object-contain" />
    </div>`,
                    iconSize: [20, 20], // Set marker size
                    iconAnchor: [20, 20], // Adjust anchor point
                  })}
                />
              ))}
            </MapContainer>
          ) : (
            <div className="flex justify-center items-center h-full">
              Loading map...
            </div>
          )}
        </div>

        {/* Custom Popup for Selected Video */}
        {selectedVideo &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black bg-opacity-50"
              onClick={closePopup} // Close the popup when clicking outside
            >
              <div
                className="relative w-full max-w-md h-auto bg-white rounded-lg shadow-md overflow-y-auto"
                onClick={handleVideoClick} // Prevent closing the popup when interacting with the video
              >
                <video
                  ref={videoRef}
                  className="w-full h-auto rounded-lg shadow-md"
                  controls
                  autoPlay
                  volume={1}
                  style={{ maxHeight: "60vh" }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)} // Update state on pause
                >
                  <source src={selectedVideo?.videoUrl} type="video/mp4" />
                  <source
                    src={selectedVideo?.video?.url}
                    type="video/x-matroska"
                  />
                  Your browser does not support the video tag.
                </video>

                {isPlaying && (
                  <>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-y-4">
                      <div
                        className=""
                        onClick={() => handleLike(selectedVideo._id)}
                      >
                        {
                        isLiked ? (
                          
                          <FcLike className="text-3xl hover:text-red-500" />
                        ) : (
                          <CiHeart 
                            className={`text-3xl transition-transform ${
                              animating ? "scale-125" : ""
                            }`}
                          />
                        )}
                        {/* Display video title */}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-4">
                      <div className="text-white text-lg font-semibold bg-black bg-opacity-60 px-4 py-2 rounded-md">
                        {selectedVideo.title}
                      </div>
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
