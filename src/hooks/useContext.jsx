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

export const CartContext = createContext();

// Creacion del hook useAuth y manejo del error
export const useAuth = () => {
  const context = useContext(CartContext);
  if(!context) {
    console.log("error creating auth context");
  }
  return context;
};


export const CartProvider = ({ children }) => {
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
    console.log(res);
  };

  // Este método se utiliza para escuchar cambios en el estado de autenticación del usuario.
  const [user, setUser] = useState("");
  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser){
        console.log("No hay usuario suscrito");
        setUser("");
      } else {
        setUser(currentUser);
      }
    })
    return () => suscribed();
  }, [])

  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);

  return (
    <CartContext.Provider
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
