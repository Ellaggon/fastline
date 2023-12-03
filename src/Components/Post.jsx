import { useContext } from "react";
import { CartContext } from "../hooks/useContext";
import { NavLink } from "react-router-dom";

const Post = () => {
  const context = useContext(CartContext);
  return (
    <article
      className={`${
        context.postModal ? "flex" : "hidden"
      } fixed bg-black bg-opacity-20 inset-0 z-10 overflow-y-auto items-center justify-center`}
      tabIndex="-1"
    >
      <div className="flex items-center justify-center  relative bg-white rounded-lg w-3/4 md:w-2/3 lg:w-1/2 h-2/3 p-4">
        <form className="p-5">
          <h2 className="text-lg font-semibold text-center mt-3 mb-8">
            PÚBLICA tu primer viaje GRATIS
          </h2>
          <svg
            className="absolute right-3 top-3 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              context.closePostModal();
            }}
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
          <label className="font-bold text-sm ml-3">Título</label>
          <input
            type="text"
            name="title"
            id="signup-email"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Ingresa el titulo"
            onChange={(e) => setEmailRegister(e.target.value)}
          />
          <label className="font-bold text-sm ml-3">Tipo de servicio</label>
          <select className="block mb-5 mt-1 px-3 h-7 rounded-md">
            <option value="Categories">Elige una opción </option>
          </select>

          <div className="flex justify-end p-4 border-gray-200 mt-5">
            <button
              className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-600 mt-10"
              onClick={() => context.closePostModal()}
            >
              <NavLink to="/post-page">Continuar</NavLink>
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Post;
