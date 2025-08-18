import ReactDom from "react-dom";
import { useEffect } from "react";
import { X } from "lucide-react";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="p-2 md:p-6 bg-white rounded-lg relative w-[90%] max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="top-2 right-2 absolute  cursor-pointer block md:hidden"
            onClick={onClose}
          >
            <X className="text-lg font-semibold" />
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
