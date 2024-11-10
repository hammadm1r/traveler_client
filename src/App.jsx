import { useState } from "react";
import "./App.css";
import Login from "./Pages/Authentication/Login"
import Signup from "./Pages/Authentication/Signup"
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import Stepper from "./Components/Stepper";
import StepperControl from "./Components/StepperControl";
import { Routes,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Story from "./Pages/Story";
import UnderConstruction from "./Pages/UnderConstruction";
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
    </Routes>

    </>
  );
}

export default App;
