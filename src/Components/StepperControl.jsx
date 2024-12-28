import React from "react";

const StepperControl = ({ currentStep, setCurrentStep, handleNext }) => {

  // Handle "Back" button click
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Go to the previous step
    }
  };

  return (
    <div className="container flex justify-around mt-12 mb-2">
      <button
        onClick={handleBack}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep == 1 ? "hidden" : "block"
        }`}
      >
        Back
      </button>

      <button
        onClick={handleNext}
        className={`bg-white text-teal-600 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-teal-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep == 3 ? "hidden" : "block"}`}
      >
        Next
      </button>
    </div>
  );
};

export default StepperControl;
