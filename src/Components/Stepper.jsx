import React, { useEffect, useState } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);

  const updateStep = (stepNumber, steps) => {
    return steps.map((step, index) => {
      if (index === stepNumber) {
        return {
          ...step,
          highlighted: true,
          selected: true,
          completed: true,
        };
      } else if (index < stepNumber) {
        return {
          ...step,
          highlighted: false,
          selected: true,
          completed: true,
        };
      } else {
        return {
          ...step,
          highlighted: false,
          completed: false,
          selected: false,
        };
      }
    });
  };

  useEffect(() => {
    const stepState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0 ? true : false,
      selected: index === 0 ? true : false,
    }));
    
    const updatedSteps = updateStep(currentStep - 1, stepState);
    setNewStep(updatedSteps);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div key={index} className={`w-full flex items-center ${index !== newStep.length - 1 ? '' : ''}`}>
      <div className="relative flex flex-col items-center text-teal-600">
        <div className={`rounded-full transition duration-500 ease-in-out border-2 ${step.selected ? 'border-teal-600' : 'border-gray-300'} h-12 w-12 flex items-center justify-center py-3`}>
          {index + 1}
        </div>
        <div className="absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase">
          {step.description}
        </div>
      </div>
      {index !== newStep.length - 1 && (
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out"></div>
      )}
    </div>
  ));

  return <div className="mx-4 p-4 flex justify-between items-center">{displaySteps}</div>;
};

export default Stepper;

