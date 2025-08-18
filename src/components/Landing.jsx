import React, { useState } from "react";
import { ShinyButton } from "./ShinyButton";
import OwnerRegistrationFrom from "../components/Modal";
import CreateRenterForm from "../components/Modal";
import { useRegisterVehicleOwnerMutation } from "../hooks/auth.hook";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateRenterMutation } from "../hooks/auth.hook";
const Landing = () => {
  const navigate = useNavigate();
  //owner ceation fields
  const [isRegistrationFromOpen, setIsRegistrationFromOpen] = useState(false);
  const mutation = useRegisterVehicleOwnerMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [file, setFile] = useState(null);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [modelName, setModelName] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //renter fileds
  const [isCreateRenter, setIsCreateRenter] = useState(false);
  const createRenterMutation = useCreateRenterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOwner = async (e) => {
    e.preventDefault();
    const formatTime = (time) => {
      if (!time) return "";
      return time.length === 5 ? `${time}:00` : time;
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);
    formData.append("vehicleImage", file);
    formData.append("vehicleName", vehicleName);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("modelName", modelName);
    formData.append("availableFrom", formatTime(availableFrom));
    formData.append("availableTo", formatTime(availableTo));
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    mutation.mutate(formData);
  };

  const handleSubmitRenter = async (e) => {
    e.preventDefault();
    createRenterMutation.mutate(formData);
  };

  if (mutation.isSuccess) {
  }
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
          <p className="font-semibold text-base lg:text-lg text-gray-500 text-shadow-gray-300 mx-auto mt-8 text-center">
            Your ride, your way. Fast, simple, reliable bookings – wheels at
            your fingertips.
          </p>
        </div>
        <div className="mt-10 h-40 lg:h-20 ">
          <div className="mt-10 w-screen flex flex-col items-center lg:flex-row  gap-4 lg:justify-center px-auto ">
            <div
              className="w-full max-w-80"
              onClick={() => setIsRegistrationFromOpen(true)}
            >
              <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Go to Admin Panel
              </ShinyButton>
            </div>
            <div
              className="w-full max-w-80"
              onClick={() => setIsCreateRenter(true)}
            >
              <ShinyButton className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Book a ride
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
      <OwnerRegistrationFrom
        isOpen={isRegistrationFromOpen}
        onClose={() => setIsRegistrationFromOpen(false)}
      >
        <form
          onSubmit={handleSubmitOwner}
          className="bg-white shadow-xl p-[1px] md:p-3 w-full max-w-2xl mx-auto flex flex-col gap-1 md:gap-8"
        >
          {/* Title */}
          <h2 className="text-md md:text-2xl font-bold text-center text-gray-800">
            Owner & Vehicle Registration
          </h2>

          {/* Owner Info */}
          <div className="p-1 md:p-4 md:border rounded-lg bg-gray-50 shadow-inner">
            <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">
              Owner Details
            </h3>
            <div className="grid grid-cols-2 gap-1 md:gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone No
                </label>
                <input
                  type="number"
                  placeholder="Enter phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="p-4 md:border rounded-lg bg-gray-50 shadow-inner">
            <h3 className="text-sm md:text-lg font-semibold text-gray-700 mb-2 md:mb-4">
              Vehicle Details
            </h3>
            <div className="grid grid-cols-2 gap-1 md:gap-4">
              <div className="col-span-2">
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  placeholder="Vehicle name"
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-1 md:p-2"
                />
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Upload Vehicle Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg p-1 md:p-2"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  placeholder="Enter vehicle number"
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Model Name
                </label>
                <input
                  type="text"
                  placeholder="Enter model name"
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Available From
                </label>
                <input
                  type="time"
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Available To
                </label>
                <input
                  type="time"
                  onChange={(e) => setAvailableTo(e.target.value)}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-1.5 md:p-3 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-[1px] w-3/4 mx-auto md:w-full md:mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 cursor-pointer rounded-lg shadow-md transition duration-300 text-center"
          >
            {mutation.isPending ? (
              <Loader className="mx-auto" />
            ) : (
              <span>Create account</span>
            )}
          </button>
          <div className="text-xs md:text-base font-semibold text-gray-800 mx-auto">
            Already have an account{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/ownerLogin")}
            >
              login
            </span>
          </div>
        </form>
      </OwnerRegistrationFrom>

      <CreateRenterForm
        isOpen={isCreateRenter}
        onClose={() => setIsCreateRenter(false)}
      >
        <form
          onSubmit={handleSubmitRenter}
          className="bg-white shadow-xl p-6 w-full max-w-2xl mx-auto flex flex-col gap-8"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Create account to Book ride
          </h1>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-3 outline-none"
            />
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-3 outline-none"
            />
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 rounded-lg p-3 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Create Account
          </button>
          <div className="text-xs md:text-base font-semibold text-gray-800 mx-auto">
            Already have an account{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/renterLogin")}
            >
              login
            </span>
          </div>
        </form>
      </CreateRenterForm>
    </>
  );
};

export default Landing;
