import { Loader } from "lucide-react";
import { useUpdateOwnerVehicleMutation } from "../hooks/owner.hook";

const UpdateModal = ({ isOpen, onClose, vehicle, refetch }) => {
  if (!isOpen || !vehicle) return null;

  const { mutate, isLoading } = useUpdateOwnerVehicleMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      vehicleName: e.target.vehicleName.value,
      modelName: e.target.modelName.value,
      vehicleNumber: vehicle.vehicleNumber,
      availableFrom: e.target.availableFrom.value,
      availableTo: e.target.availableTo.value,
      isBooked: e.target.isBooked.checked,
    };
    mutate(payload, {
      onSuccess: () => {
        onClose();
        refetch();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-4 w-96"
      >
        <h2 className="text-xl font-bold">Update Vehicle</h2>

        <input
          type="text"
          name="vehicleName"
          defaultValue={vehicle.vehicleName}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="modelName"
          defaultValue={vehicle.modelName}
          className="w-full p-2 border rounded"
        />

        <input
          type="time"
          name="availableFrom"
          defaultValue={vehicle.availableFrom}
          className="w-full p-2 border rounded"
        />

        <input
          type="time"
          name="availableTo"
          defaultValue={vehicle.availableTo}
          className="w-full p-2 border rounded"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isBooked"
            defaultChecked={vehicle.isBooked}
          />
          <span>Booked</span>
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
