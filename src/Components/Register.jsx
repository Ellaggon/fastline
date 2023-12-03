import { useState } from "react";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import { useAuth } from "../hooks/useContext";

const Register = () => {
  const auth = useAuth();
  
  const [isOpenRegister, openRegister, closeRegister] = useModal(false);

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };

  return (
    <>
      <button onClick={openRegister}>Register</button>
      <Modal isOpen={isOpenRegister} closeModal={closeRegister}>
        <form className="p-5">
          <h2 className="text-lg font-semibold text-center">Registro</h2>
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
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Register;
