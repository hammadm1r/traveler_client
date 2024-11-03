import { useState } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Authentication/Login";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Login/>
    </>
  );
}

export default App;
