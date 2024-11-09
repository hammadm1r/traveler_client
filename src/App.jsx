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
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login"  element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/home" element={<Home />} />
    </Routes>

    </>
  );
}

export default App;
