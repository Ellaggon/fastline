import ReactDOM from "react-dom";

// Importamos la logica de modales como proops para todos los modales y le inyectamos los controles predeterminados mediante destructuracion
const Modal = ({ children, isOpen, closeModal }) => {
  return ReactDOM.createPortal(
    <article
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed bg-black bg-opacity-20 inset-0 z-20 overflow-y-auto items-center justify-center`}
      onClick={closeModal}
    >
      <div className="flex items-center justify-center  relative bg-white rounded-lg w-3/4 md:w-2/3 lg:w-1/2 h-1/2 p-4"
      onClick={(e)=> e.stopPropagation()}>
        <svg
          className="absolute right-3 top-3 cursor-pointer"
          onClick={closeModal}
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        {children}
      </div>
    </article>,
    document.getElementById("modal")
  );
};

export default Modal;
