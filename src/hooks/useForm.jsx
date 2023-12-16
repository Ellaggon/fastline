import { useContext, useState } from "react";
import { AuthContext } from "./useContext";

export const useForm = (initialForm, validateForm) => {
  const {user, setEmailRegister, setPasswordRegister} = useContext(AuthContext)

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const emailReg = () => setEmailRegister(user.email);
  const passwordReg = () => setPasswordRegister(user.password);

  // Funciones para capturar el valor de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    emailReg();
    passwordReg();
  };

  const handleBlur = (e) => {
    handleChange(e)
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {};

  return {
    form,
    setForm,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
  };
};
