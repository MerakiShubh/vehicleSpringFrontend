import React, { useEffect, useState } from "react";
import {
  useBookVehicleMutation,
  useGetAvailableVehicleQuery,
} from "../hooks/renter.hook";
import { Loader } from "lucide-react";

const RenterDashboard = () => {
  const { data, isLoading, refetch } = useGetAvailableVehicleQuery();
  const mutation = useBookVehicleMutation();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("data ---------------------__>", data);
  }, [data]);

  const handleBookClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsBookingOpen(true);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const isTimeInRange = (startTime, endTime, availableFrom, availableTo) => {
    // Convert "HH:mm:ss" and "HH:mm" to minutes since midnight for easy comparison
    const toMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      console.log("hr-->", h, " min--->", m);
      return h * 60 + m;
    };

    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    const availStart = toMinutes(availableFrom);
    const availEnd = toMinutes(availableTo);

    console.log(start, " ", end, " ", availStart, " ", availEnd);

    return start >= availStart && end <= availEnd;
  };

  const handleSubmit = (e) => {
    console.log("value ----------->", formData);
    e.preventDefault();
    if (!selectedVehicle) return;

    // validate times
    if (
      !isTimeInRange(
        formData.startTime,
        formData.endTime,
        selectedVehicle.availableFrom,
        selectedVehicle.availableTo
      )
    ) {
      setError(
        `Please choose a time between ${selectedVehicle.availableFrom} and ${selectedVehicle.availableTo}`
      );
      return;
    }

    mutation.mutate(
      {
        vehicleNumber: selectedVehicle.vehicleNumber,
        payload: formData,
      },
      {
        onSuccess: () => {
          console.log("vehicle booked successfully");
          setIsBookingOpen(false);
          refetch();
        },
      }
    );
  };

  if (isLoading) return <p className="p-4">Loading vehicles...</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>

      {data?.map((vehicle, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-4">
            <img
              src={vehicle.vehiclePicture}
              alt={vehicle.vehicleName}
              className="w-24 h-20 object-cover rounded-lg border"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {vehicle.vehicleName} ({vehicle.modelName})
              </h3>
              <p className="text-sm text-gray-600">
                Number: {vehicle.vehicleNumber}
              </p>
              <p className="text-sm text-gray-600">
                Available: {vehicle.availableFrom} - {vehicle.availableTo}
              </p>
              <p
                className={`text-sm font-medium ${
                  vehicle.isBooked ? "text-red-500" : "text-green-600"
                }`}
              >
                {vehicle.isBooked ? "Booked" : "Available"}
              </p>
            </div>
          </div>

          {/* Book Button */}
          <div>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition cursor-pointer"
              onClick={() => handleBookClick(vehicle)}
            >
              Book Vehicle
            </button>
          </div>
        </div>
      ))}

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              Book {selectedVehicle?.vehicleName}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="source"
                placeholder="Source"
                value={formData.source}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />

              {/* error message */}
              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {mutation.isPending ? (
                    <Loader className="animate-spin mx-auto" />
                  ) : (
                    "Confirm booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenterDashboard;
