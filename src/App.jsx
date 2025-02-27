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


function App() {
  const [socket,setSocket] = useState()
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const userId = myProfile?._id;

  useEffect(() => {
    if (!userId) return;

    const newsocket = io("http://localhost:3000", { autoConnect: true });


    newsocket.emit("join", userId);
    setSocket(newsocket)

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
          <Route path="/updateprofile" element={<ProfileUpdate />} />
          <Route path="/story" element={<Story />} />
          <Route path="/addstory" element={<UploadStory />} />
          <Route path="/" element={<FeedLoad />}>
            <Route path="/forum" element={<Forum />} />
            <Route path="/post/:id" element={<Post />} />
          </Route>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/notification" element={<Notifications socket={socket} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
