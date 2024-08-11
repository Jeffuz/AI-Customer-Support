import { IoClose } from "react-icons/io5";

export default function Modal({ open, onClose, children }: {open:boolean, onClose: any, children: any}) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#F9FAFB] rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-600"
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
}
