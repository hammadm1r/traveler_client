import "./App.css";
import Login from "./Pages/Authentication/Login"
import Signup from "./Pages/Authentication/Signup"
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import { Routes,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Story from "./Pages/Story";
import UnderConstruction from "./Pages/UnderConstruction";
import Forum from "./Pages/Forum";
import Post from "./Pages/Post"
import Profile from "./Pages/Profile";
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/underconstruction" element={<UnderConstruction />} />
      <Route path="/login"  element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/home" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profile/:id" element={<Profile/>} />
    </Routes>

    </>
  );
}

export default App;
