import { useState } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Signup/>
    </>
  );
}

export default App;
