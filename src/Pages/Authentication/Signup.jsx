import React, { useState } from "react";
import AccountInformation from "./steps/AccountInformation";
import AccountSetup from "./steps/AccountSetup";
import Stepper from "../../Components/Stepper";
import StepperControl from "../../Components/StepperControl"; // Corrected capitalization
import Complete from "./steps/Complete";
import authPng from "../../assets/Images/NewYork-pana1.png";
import logoLight from "../../assets/Images/logoLight.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    email: "",
    password: "",
    // Add other fields as necessary
  });
  const [accountSetupInfo, setAccountSetupInfo] = useState({
    fullname: "",
    bio: "",
    dateOfBirth: "",
    kofi:"",
    profilePicture: null,
    interests: [],
  });

  // Removed unused state `step` since displayStep function handles component rendering
  const steps = ["Account Information", "Account Setup", "Complete"];

  const handleNext = () => {
    if (currentStep === 1) {
      console.log(accountInfo);
      // Perform validation for AccountInformation step
      if (!accountInfo.username || !accountInfo.email || !accountInfo.password) {
        alert("All fields are required.");
        return;
      }
    }
    if (currentStep === 2 ){
      console.log(accountSetupInfo);
      if(!accountSetupInfo.fullname || !accountSetupInfo.bio ||!accountSetupInfo.dateOfBirth || !accountSetupInfo.profilePicture || !accountSetupInfo. interests){
        alert("Please fill in all required fields in the Account Setup step.");
      return; // Do not proceed if fields are not filled
      }
    }
    // Proceed to the next step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Go to the next step
    }
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <AccountInformation setCurrentStep={setCurrentStep} accountInfo={accountInfo} setAccountInfo={setAccountInfo} />;
      case 2:
        return <AccountSetup setCurrentStep={setCurrentStep}  accountSetupInfo={accountSetupInfo} setAccountSetupInfo={setAccountSetupInfo}/>;
      case 3:
        return <Complete  accountInfo={accountInfo} accountSetupInfo={accountSetupInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center overflow-x-hidden grid md:grid-cols-7">
      {/* Left Section */}
      <div className="col-span-3 min-h-screen bg-[#A5DDEA] hidden sm:flex flex-col items-center justify-center relative">
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
          <StepperControl currentStep={currentStep} setCurrentStep={setCurrentStep} handleNext={handleNext}/>
          <p className="text-center text-sm sm:text-base">
          Already have an Account?{" "}
          <span className="text-[#AC68F7] cursor-pointer">
          <Link to="/login" >Log In</Link>
          </span>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
