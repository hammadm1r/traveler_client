import { useState } from "react";
import "./App.css";
import Login from "./Pages/Authentication/Login"
import Signup from "./Pages/Authentication/Signup"
import Stepper from "./Components/Stepper";
import StepperControl from "./Components/StepperControl";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signup/>
    </>
  );
}

export default App;
