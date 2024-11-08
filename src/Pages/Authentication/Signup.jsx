import React, { useState } from "react";
import AccountInformation from "./steps/AccountInformation";
import AccountSetup from "./steps/AccountSetup";
import Stepper from "../../Components/Stepper";
import StepperControl from "../../Components/StepperControl"; // Corrected capitalization
import Complete from "./steps/Complete";
import authPng from "../../assets/Images/NewYork-pana1.png";
import logoLight from "../../assets/Images/logoLight.png";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Removed unused state `step` since displayStep function handles component rendering
  const steps = ["Account Information", "Account Setup", "Complete"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <AccountInformation setCurrentStep={setCurrentStep} />;
      case 2:
        return <AccountSetup setCurrentStep={setCurrentStep} />;
      case 3:
        return <Complete />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center overflow-x-hidden grid md:grid-cols-7">
      {/* Left Section */}
      <div className="col-span-3 min-h-screen bg-[#A5DDEA] hidden sm:flex flex-col items-center justify-center relative">
        <div className="absolute top-0 left-4 sm:left-10">
          <img src={logoLight} alt="logo" className="w-24 h-auto sm:w-32" />
        </div>
        <div className="text-left text-2xl font-bold text-[rgba(0,0,0,0.55)] sm:ml-10 mt-20 sm:mt-0">
          <p>
            Get reliable and accurate travel
            <br /> information all on one site.
          </p>
          <img src={authPng} alt="Travel illustration" className="mt-8" />
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-4 flex items-center justify-center bg-white min-h-screen px-4 sm:px-0 py-8 sm:py-0">
        <div className="w-full max-w-md">
          {/* Optional: control width */}
          {displayStep(currentStep)}
          <Stepper steps={steps} currentStep={currentStep} />
          <StepperControl currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
