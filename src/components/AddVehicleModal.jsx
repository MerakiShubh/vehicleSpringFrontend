import { useState } from "react";
import axios from "axios";
import { useAddOwnerVehicleMutation } from "../hooks/owner.hook";
import { Loader } from "lucide-react";

const AddVehicleModal = ({ isOpen, onClose, refetch }) => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [modelName, setModelName] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [file, setFile] = useState(null);
  const mutation = useAddOwnerVehicleMutation();

  const formatTime = (time) => {
    if (!time) return "";
    return time.length === 5 ? `${time}:00` : time;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleImage", file);
    formData.append("vehicleName", vehicleName);
    formData.append("modelName", modelName);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("availableFrom", formatTime(availableFrom));
    formData.append("availableTo", formatTime(availableTo));
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    mutation.mutate(formData, {
      onSuccess: () => {
        console.log("Vehicle added successfully");
        refetch();
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60  bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Model Name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              {mutation.isPending ? <Loader className="animate-spin" /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
