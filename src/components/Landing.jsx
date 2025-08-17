import { ArrowRight } from "lucide-react";
import React from "react";
import { ShinyButton } from "./ShinyButton";

const Landing = () => {
  return (
    <>
      <div className="overflow-hidden">
        <nav className="w-full h-20 fixed inset-x-0 bg-blue-400 opacity-85 flex justify-center md:justify-around items-center border-b-2 border-gray-400/65">
          <h1 className="text-black font-bold text-xl cursor-pointer hover:text-2xl/relaxed transition-all">
            bookVehicle
          </h1>
          <div className="hidden md:block"></div>
        </nav>

        <div className="mt-80 flex flex-col w-full px-4">
          <h1 className="text-2xl lg:text-5xl font-semibold text-black mx-auto text-wrap text-center">
            Book your ride with{" "}
            <span className="text-2xl lg:text-5xl text-blue-500 font-bold">
              vehicleBooking
            </span>{" "}
            <br />
            and get good experience
          </h1>
          <p className="font-semibold text-lg text-gray-500 text-shadow-gray-300 mx-auto mt-8 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
            minus quam possimus aut
          </p>
        </div>
        <div className="mt-10 h-40 lg:h-20 ">
          <div className="mt-10 w-screen flex flex-col items-center lg:flex-row  gap-4 lg:justify-center px-auto ">
            <div className="w-full max-w-80">
              <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Get Start As Admin
              </ShinyButton>
            </div>
            <div className="w-full max-w-80">
              <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Get Start As Client
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
