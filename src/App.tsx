import "./App.css";
import { HealthForm } from "./HealthForm";
import { TravelForm } from "./TravelForm";
import { UserForm } from "./UserForm";
import { useMultistepForm } from "./useMultistepForm";
import { FormEvent, useState } from "react";
import Confetti from "react-confetti";
import React, { useRef } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  departureday: string;
  departuremonth: string;
  departureyear: string;
  returnday: string;
  returnmonth: string;
  returnyear: string;
  accommodation: string;
  specialreq: string;
  email: string;
  phone: number;
  healthy: boolean;
  contactname: string;
  contactnumber: number;
  medical: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: 0,
  nationality: "",
  departureday: "",
  departuremonth: "",
  departureyear: "",
  returnday: "",
  returnmonth: "",
  returnyear: "",
  accommodation: "",
  specialreq: "",
  email: "",
  phone: 0,
  healthy: false,
  contactname: "",
  contactnumber: 0,
  medical: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <TravelForm {...data} updateFields={updateFields} />,
      <HealthForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isLastStep) {
      setIsSubmitted(true);
    } else {
      next();
    }
  }

  const resetForm = () => {
    setData(INITIAL_DATA);
    setIsSubmitted(false);
  };
  return (
    <div className='bg-[#191919] overflow-y-auto'>
      <nav className='bg-gradient-to-r from-[#ffa103] to-[#f0030f] opacity-80'>
        <div className='flex justify-between items-center mx-8 uppercase'>
          <img
            src='/assets/logo2.png'
            alt='logo'
            width={170}
            height={60}
            onClick={resetForm}
            className='hover:cursor-pointer'
          />

          <div className='flex gap-6 hover:cursor-pointer text-white'>
            <p>Home</p>
            <p>About</p>
            <p>Destinations</p>
          </div>
        </div>
      </nav>
      <div className='items-center flex flex-col justify-center mt-16'>
        <h1 className='text-white text-5xl font-bold '>
          Embark on a Journey to Mars with{" "}
          <span className='bg-gradient-to-r from-[#ffa103] to-[#f0030f] inline-block text-transparent bg-clip-text'>
            Celestial Escapes
          </span>
        </h1>{" "}
        <img src='/assets/mars3.gif' alt='mars' width={800} className='mt-16' />
      </div>

      <div className='flex justify-center text-center'>
        <button
          onClick={() => divRef.current?.scrollIntoView({ behavior: "smooth" })}
          className='bg-gradient-to-r from-[#ffa103] to-[#f0030f] inline-block text-white p-4 mt-16 rounded-full hover:shadow-md text-md hover:scale-105 active:scale-90 transition duration-150 uppercase  '
        >
          Get Started
        </button>
      </div>

      {isSubmitted ? <Confetti width={1900} height={1445} /> : null}
      <div
        ref={divRef}
        className='relative bg-white mt-60 mb-20 border p-4 rounded-md mx-auto w-[600px] text-black items-center'
      >
        {isSubmitted ? (
          // Show congratulations message when submitted
          <div className='text-center flex-col justify-center mt-auto items-center p-4'>
            <img
              src='/assets/logo.png'
              alt='logo'
              width={170}
              height={60}
              className='mx-auto mb-4'
            />
            <h2 className='font-semibold text-xl'>
              Congratulations, you are signed up!
            </h2>
            <p className='text-center mt-4'>
              Thank you for completing the Mars Expedition Application Form!
              Your journey to Mars awaits you. We are thrilled to have you on
              board for this incredible adventure. Our team will review your
              application, and further details about the expedition will be
              shared with you soon.
            </p>
          </div>
        ) : (
          // Show the form when not submitted
          <form onSubmit={onSubmit}>
            <div className='absolute top-2 right-2 '>
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div className='mt-2 flex gap-2 justify-end mt-auto'>
              {!isFirstStep && (
                <button
                  type='button'
                  onClick={back}
                  className='border p-4 rounded-md bg-gradient-to-r from-red-400 to-red-700 hover:scale-105 transition active:scale-90 duration-150 hover:shadow-xl'
                >
                  Back
                </button>
              )}
              <button
                type='submit'
                className='border p-4 rounded-md bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-105 transition active:scale-90 duration-150 hover:shadow-xl '
              >
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
