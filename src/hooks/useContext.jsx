import { auth } from "../Helper/Firebase.config";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

// Creacion del hook useAuth y manejo del error
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // List es un hook que reune todos las publicaciones en el home
  const [list, setList] = useState([]);
  // Item es un hook que reune las publicaciones de la API de platzi en el home
  const [item, setItem] = useState(null);

  const [user, setUser] = useState("");

  // MANEJO del estado del REGISTRO
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  // Hooks para la captura de información
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // console.log("item: ", item)

  // Funciones de firebase Auth: REGISTER / LOGIN / LOGIN-GOOGLE / LOGOUT
  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
  };
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
  };
  const loginWithGoogle = async () => {
    const resGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, resGoogle);
  };
  const logout = async () => {
    const res = await signOut(auth);
  };

  // Este método se utiliza para escuchar cambios en el estado de autenticación del usuario.
  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No hay usuario suscrito");
        setUser("");
      } else {
        setUser(currentUser);
      }
    });
    return () => suscribed();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
        setUser,
        list,
        setList,
        item,
        setItem,
        emailRegister,
        setEmailRegister,
        passwordRegister,
        setPasswordRegister,
        emailLogin,
        passwordLogin,
        setEmailLogin,
        setPasswordLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
