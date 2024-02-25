"use client";
import LocationForm from "@/components/Dropzone/LocationForm";
import OpeningHoursForm from "@/components/Dropzone/OpeningHoursForm";
import Stepper from "@/components/Dropzone/Stepper";
import { useState } from "react";

const StepperContainer = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = [
    { component: <LocationForm onNext={handleNext} />, label: "Location" },
    {
      component: <OpeningHoursForm onNext={handleNext} onPrev={handlePrev} />,
      label: "Opening Hours",
    },
  ];

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow">
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="mt-4">{steps[activeStep].component}</div>
    </div>
  );
};

export default StepperContainer;
