import React, { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar";
import { CartContext, useAuth } from "../hooks/useContext";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { appFirebase } from "../Helper/Firebase.config";

const PostPage = () => {
  const context = useContext(CartContext);
  const auth = useAuth();
  const db = getFirestore(appFirebase);
  const { email, uid } = auth.user;

  const valorInicial = {
    title: "",
    from: "",
    to: "",
    category: "",
    description: "",
    img: "",
    price: "",
    email: "",
    password: "",
    uid: "",
  };

  // MANEJO del estado del REGISTRO
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  
  const [user, setUser] = useState(valorInicial);
  const [list, setList] = useState([]);
  console.log("user: ", user);
  
  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };

  const emailReg = () => setEmailRegister(user.email);
  const passwordReg = () => setPasswordRegister(user.password);
  
  
  // Funciones para capturar el valor de los inputs
  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    emailReg();
    passwordReg();
  };

  // Condicionales para capturar el email y uid del usuario
  if (!user.email) user.email = email;
  if (!user.uid) user.uid = uid;

  const guardarDatos = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      await addDoc(collection(db, "usuarioss"), {
        ...user,
      });
      handleRegister(e);
    } catch (err) {
      console.error(err.message);
    }
    setUser({ ...valorInicial });
  };

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarioss"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setList(docs);
      } catch (err) {
        console.error(err);
      }
    };
    getLista();
  }, []);

  return (
    <Layout>
      <Navbar />
      <h2 className="text-lg font-semibold text-center mt-3 mb-8">
        PÚBLICA tu primer viaje GRATIS
      </h2>

      <article className="flex items-center justify-center  relative bg-slate-100 rounded-lg w-3/4 md:w-2/3 lg:w-1/2 p-4">
        <form className="p-5" onSubmit={guardarDatos}>
          <label className="font-bold text-sm ml-3">Título</label>
          <input
            type="text"
            name="title"
            id="signup-title"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Ingresa el titulo"
            onChange={capturarInputs}
            value={user.title}
          />
          <label className="font-bold text-sm ml-3">Trayectoria</label>
          <input
            type="text"
            name="from"
            id="signup-from"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Desde"
            onChange={capturarInputs}
            value={user.from}
          />
          <input
            type="text"
            name="to"
            id="signup-to"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Destino"
            onChange={capturarInputs}
            value={user.to}
          />
          <label className="font-bold text-sm ml-3">Tipo de vehiculo</label>
          <input
            type="text"
            name="category"
            id="signup-category"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Bus / Van / Cedan / Bus mini"
            onChange={capturarInputs}
            value={user.category}
          />
          <label className="font-bold text-sm ml-3">Descripción</label>
          <textarea
            name="description"
            id="signup-description"
            className="w-full pl-3 pt-2 rounded-lg shadow-md mb-5"
            cols={50}
            rows={5}
            placeholder="Describe como es tu servicio"
            onChange={capturarInputs}
            value={user.description}
          />
          <label className="font-bold text-sm ml-3">Precio</label>
          <input
            type="text"
            name="price"
            id="signup-price"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Ingresa el precio de tú servicio"
            onChange={capturarInputs}
            value={user.price}
          />

          {!context.user && (
            <div>
              <label className="font-bold text-sm ml-3">Email</label>
              <input
                type="email"
                name="email"
                id="signup-email"
                className="w-full h-10 pl-3 rounded-lg shadow-md mb-5"
                placeholder="Email"
                onChange={capturarInputs}
                value={user.email}
              />
            </div>
          )}
          {!context.user && (
            <div>
              <label className="font-bold text-sm ml-3">Password</label>
              <input
                type="password"
                name="password"
                id="signup-password"
                className="w-full h-10 pl-3 rounded-lg shadow-md"
                placeholder="Password"
                onChange={capturarInputs}
                value={user.password}
              />
            </div>
          )}
          <div className="flex justify-end p-4 border-gray-200 mt-5">
            <button className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-600 mt-10">
              Continuar
            </button>
          </div>
        </form>
      </article>
    </Layout>
  );
};

export default PostPage;
