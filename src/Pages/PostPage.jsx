import React, { useContext, useEffect } from "react";
import Layout from "../Components/Layout";
import Navbar from "../Components/Navbar";
import { AuthContext, useAuth } from "../hooks/useContext";
import { useForm } from "../hooks/useForm";
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
import { NavLink } from "react-router-dom";

const initialForm = {
  title: "",
  from: "",
  to: "",
  category: "",
  description: "",
  img: "",
  price: "",
  fono: "",
  email: "",
  password: "",
  uid: "",
};
const validationsForm = (form) => {
  let errors = {};
  let regexLettersNum = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+[0-9]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexDescription = /^.{1,255}$/;
  let regexNum = /^[0-9]+$/;
  let regexPassword = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/

  if (!form.category.trim()) {
    errors.category = "Debes elegir el tipo de vehiculo";
  }

  if (!form.title.trim()) {
    errors.title = "El campo 'Titulo' es requerido";
  }

  if (!form.from.trim()) {
    errors.from = "Este campo es requerido";
  } else if (!regexLettersNum.test(form.title.trim())) {
    errors.title = "El campo 'Origen' sólo acepta letras y espacios en blanco";
  }

  if (!form.to.trim()) {
    errors.to = "Este campo es requerido";
  } else if (!regexLettersNum.test(form.title.trim())) {
    errors.title = "El campo 'Destino' sólo acepta letras y espacios en blanco";
  }

  if (!form.description.trim()) {
    errors.description = "El campo 'Descripción' es requerido";
  } else if (!regexDescription.test(form.description.trim())) {
    errors.description =
      "El campo 'Descripción' no debe exceder los 255 caracteres";
  }

  if (!form.fono.trim()) {
    errors.fono = "El campo 'Número de telefono' es requerido";
  } else if (!regexNum.test(form.fono.trim())) {
    errors.fono = "El campo 'Número de telefono' solo puede contener numeros";
  }

  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
  }

  if (!form.password.trim()) {
    errors.password = "El campo 'Password' es requerido";
  } else if (!regexPassword.test(form.password.trim())){
    errors.password = "El campo 'Password' debe contener ";
  }

  console.log("form", form);

  return errors;
};

const PostPage = () => {
  const auth = useAuth();
  const db = getFirestore(appFirebase);
  const { user, setUser, setList } = useContext(AuthContext);
  const { form, setForm, errors, loading, response, handleChange, handleBlur } =
    useForm(initialForm, validationsForm);
  console.log(errors);

  // Condicionales para capturar el email y uid del usuario en Firebase y ejecutarlos en el post (en caso que haya login de usuario activo)
  if (!form.email) form.email = user.email;
  if (!form.uid) form.uid = user.uid;

  const handleRegister = (e) => {
    e.preventDefault();
    auth.register(emailRegister, passwordRegister);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "usuarioss"), {
        ...form,
      });
      if (!user) handleRegister(e);
    } catch (err) {
      console.error(err.message);
    }
    setForm({ ...initialForm });
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

      <article className="flex items-center justify-center  relative bg-slate-100 rounded-lg w-3/4 md:w-2/3 lg:w-1/2 p-4 mb-10">
        <form className="flex flex-col p-5 gap-3 " onSubmit={guardarDatos}>
          <div className="flex justify-between">
            <label className="font-bold text-sm ml-3 ">Tipo de vehiculo</label>
            <select
              className="p-1 px-2 cursor-pointer rounded-md"
              name="category"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.category}
              required
            >
              <option>Elige</option>
              <option>Bus</option>
              <option>Van</option>
              <option>Cedan</option>
              <option>Transfer</option>
              <option>Limosina</option>
            </select>
          </div>
          {errors.category && <small className="text-red-600 ml-3 text-right">{errors.category}</small>}

          <label className="font-bold text-sm ml-3 mt-5">Título</label>
          <input
            type="text"
            name="title"
            id="signup-title"
            className="w-full h-8 pl-3 rounded-lg shadow-md"
            placeholder="Ingresa el titulo"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.title}
            required
          />
          {errors.title && (
            <small className="text-red-600 ml-3">{errors.title}</small>
          )}

          <label className="font-bold text-sm ml-3 mt-5">Trayectoria</label>
          <div>
            <input
              type="text"
              name="from"
              id="signup-from"
              className="w-full h-8 pl-3 rounded-lg shadow-md"
              placeholder="Ingresar origen"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.from}
              required
            />
            {errors.from && (
              <small className="text-red-600 ml-3">{errors.from}</small>
            )}

            <input
              type="text"
              name="to"
              id="signup-to"
              className="w-full h-8 pl-3 rounded-lg shadow-md mt-5"
              placeholder="Ingresa un destino"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.to}
              required
            />
            {errors.to && (
              <small className="text-red-600 ml-3">{errors.to}</small>
            )}
          </div>

          <label className="font-bold text-sm ml-3 mt-5">Descripción</label>
          <textarea
            name="description"
            id="signup-description"
            className="w-full pl-3 pt-2 rounded-lg shadow-md"
            cols={50}
            rows={5}
            placeholder="Describe como es tu servicio"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.description}
          />
          {errors.description && (
            <small className="text-red-600 ml-3">{errors.description}</small>
          )}

          <label className="font-bold text-sm ml-3 mt-5">Precio</label>
          <input
            type="text"
            name="price"
            id="signup-price"
            className="w-full h-8 pl-3 rounded-lg shadow-md mb-5"
            placeholder="Ingresa el precio de tú servicio"
            onChange={handleChange}
            value={form.price}
          />
          <label className="font-bold text-sm ml-3">Número de telefono</label>
          <input
            type="text"
            name="fono"
            id="fono"
            className="w-full h-8 pl-3 rounded-lg shadow-md"
            placeholder="+ 56 9  XXXXXXXX"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.fono}
            required
          />
          {errors.fono && (
            <small className="text-red-600 ml-3">{errors.fono}</small>
          )}

          {!user && (
            <div>
              <label className="font-bold text-sm ml-3">Email</label>
              <input
                type="email"
                name="email"
                id="signup-email"
                className="w-full h-10 pl-3 rounded-lg shadow-md mb-5"
                placeholder="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.email}
                required
              />
            </div>
          )}
          {errors.email && (
            <small className="text-red-600 ml-3">{errors.email}</small>
          )}
          {!user && (
            <div>
              <label className="font-bold text-sm ml-3">Password</label>
              <input
                type="password"
                name="password"
                id="signup-password"
                className="w-full h-10 pl-3 rounded-lg shadow-md"
                placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.password}
                required
              />
            </div>
          )}
          {!user && (
            <div>
              {errors.password && (
                <small className="text-red-600 ml-3">{errors.password}</small>
              )}
            </div>
          )}
          <div className="flex justify-end p-4 border-gray-200 mt-5">
            <button className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-600 mt-10">
              <NavLink to="/">Continuar</NavLink>
            </button>
          </div>
        </form>
      </article>
    </Layout>
  );
};

export default PostPage;
