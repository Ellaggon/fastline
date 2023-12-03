import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { CartContext, useAuth } from "../hooks/useContext";

const Modals = () => {
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);

  
  return (
    <div>
      <button onClick={openModal1}>Modal 1</button>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <form className="p-5">
          <h2 className="text-lg font-semibold text-center">Registrarme1</h2>
          <input
            type="text"
            name="email"
            id="signup-email"
            className="w-full h-8 pl-3 rounded-lg shadow-md mt-16"
            placeholder="Email"
            onChange={(e) => setEmailRegister(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="signup-password"
            className="w-full h-10 mt-5 pl-3 rounded-lg shadow-md"
            placeholder="Password"
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
          <div className="flex justify-end p-4 border-gray-200 mt-5">
            <button
              className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-600 mt-10"
              onClick={(e) => handleRegister(e)}
            >
              Save changes
            </button>
          </div>
        </form>
      </Modal>

      <button onClick={openModal2}>Modal 2</button>
      <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
        <form>
          <h2 className="text-lg font-semibold text-center">Acceder</h2>

          <input
            type="email"
            name="email"
            id="signup-email"
            className="w-full h-10 pl-3 rounded-lg shadow-md mt-16"
            placeholder="Email"
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="signup-password"
            className="w-full h-10 mt-5 pl-3 rounded-lg shadow-md"
            placeholder="Password"
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          <div className="flex justify-end p-4 border-gray-200 mt-5">
            <button
              className="mr-2 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-600 mt-10 shadow-md"
              onClick={(e) => handleLogin(e)}
            >
              Sign in
            </button>
            <button
              className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-600 mt-10 shadow-md"
              onClick={(e) => handleLoginGoogle(e)}
            >
              Google
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Modals;
