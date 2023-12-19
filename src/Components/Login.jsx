import { useContext } from "react";
import { AuthContext, useAuth } from "../hooks/useContext";
import { analytics } from "../Helper/firebase.config";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";

const Login = () => {
  const auth = useAuth();
  // Destructuracion de usuario para la inyeccion del email al renderizado
  const { emailLogin, setEmailLogin, passwordLogin, setPasswordLogin } =
    useContext(AuthContext);
  const [isOpenLogin, openLogin, closeLogin] = useModal(false);

  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(emailLogin, passwordLogin);
    console.log(analytics);
  };
  // console.log("auth", auth.login)
  const handleLoginGoogle = (e) => {
    e.preventDefault();
    auth.loginWithGoogle(emailLogin, passwordLogin);
  };

  return (
    <>
      <button onClick={openLogin}>Login</button>
      <Modal isOpen={isOpenLogin} closeModal={closeLogin}>
        <form className="p-5">
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
              Ingresar
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
    </>
  );
};

export default Login;
