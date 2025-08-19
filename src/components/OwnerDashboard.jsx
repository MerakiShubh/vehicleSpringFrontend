import { useOwnerGetVehiclesQuery } from "../hooks/owner.hook";

export const OwnerDashboard = () => {
  const { data, isLoading } = useOwnerGetVehiclesQuery();

  if (isLoading) return <p className="p-4">Loading vehicles...</p>;

  return (
    <div className="grid grid-cols-[7.5rem_1fr] grid-rows-[80px_1fr] h-screen">
      {/* Navbar */}
      <nav className="col-span-2 row-start-1 bg-blue-400 flex justify-center md:justify-around items-center border-b-2 border-gray-400/65 z-10">
        <h1 className="text-black font-bold text-xl cursor-pointer hover:text-2xl/relaxed transition-all">
          bookVehicle
        </h1>
      </nav>

      <div className="row-start-2 col-start-1 bg-gray-200/50 hidden md:block"></div>

      <div className="row-start-2 col-start-2 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">My Vehicles</h2>

        {data?.map((vehicle) => (
          <div
            key={vehicle.id}
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

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition cursor-pointer">
                Update
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
