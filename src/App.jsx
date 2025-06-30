import "./App.css";
import React, { useState,useEffect } from "react"; // Use 'React' (capitalized) in imports
import { useSelector } from "react-redux";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup"; // Ensure this is correct
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar";
import Story from "./Pages/Story";
import UnderConstruction from "./Pages/UnderConstruction";
import Forum from "./Pages/Forum";
import Post from "./Pages/Post";
import Profile from "./Pages/Profile";
import { getMyInfo } from "./Toolkit/slices/appConfigSlice";
import OnlyIfUserNotLoggedIn from "./Components/OnlyIfUserNotLoggedIn";
import RequireUser from "./Components/RequireUser";
import CreatePost from "./Pages/CreatePost";
import ProfileUpdate from "./Pages/ProfileUpdate";
import FeedLoad from "./Components/feedLoad";
import UploadStory from "./Components/UploadStory";
import Notifications from "./Components/Notification";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { axiosClient } from "./utils/axiosClient";
import TravelAdvisor from "./Pages/TravelAdvisor";
import Search from "./Pages/Search";
import Loader from "./Components/Loader";

function App() {
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const userId = myProfile?._id;
  const [notifications, setNotifications] = useState([]);
  const notificationMessages = {
    like: "liked your post! ❤️",
    comment: "commented on your post! 💬",
    follow: "followed you! 🔥",
    Achivement: "You Got An Achievement!",
  };
  // Fetch Notifications
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await axiosClient.get("/user/getnotification");
        const sortedNotifications = data.notifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, [userId]);
  const toasting = (message) =>{
    toast.success(message);
  }
  useEffect(() => {
    if (!userId) return;

    const newsocket = io("http://localhost:3000", { autoConnect: true });
    newsocket.emit("join", userId);
    const handleNewNotification = (notification) => {
      const message = `${notification?.sender?.username} ${notificationMessages[notification?.type] || "performed an action!"}`;
      toasting(message);
      setNotifications((prev) =>
        [notification, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    };

    newsocket.on("newNotification", handleNewNotification);

    return () => {
      newsocket.disconnect();
    };
  }, [userId]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/underconstruction" element={<UnderConstruction />} />
        <Route path="/*" element={<PageNotFound />} />
        {/* Only show login/signup routes if the user is not logged in */}
        <Route element={<OnlyIfUserNotLoggedIn />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Corrected */}
          
        </Route>
        {/* Other routes that require authentication */}
        <Route element={<RequireUser />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/traveladvisor" element={<TravelAdvisor />} />
          <Route path="/updateprofile" element={<ProfileUpdate />} />
          <Route path="/story" element={<Story />} />
          <Route path="/addstory" element={<UploadStory />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<FeedLoad />}>
            <Route path="/forum" element={<Forum />} />
            <Route path="/post/:id" element={<Post />} />
          </Route>
          <Route path="/profile/:id" element={<Profile />} />
          
          <Route path="/loader" element={<Loader />} />
          <Route path="/notification" element={<Notifications notifications={notifications} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
