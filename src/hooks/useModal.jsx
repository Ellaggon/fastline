import { useState } from "react";

// Exportamos la logica del OPEN/CLOSE de los modales
export const useModal = (initialValue = false) => {

  const [isOpen, setIsOpen] = useState(initialValue);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    [isOpen, openModal, closeModal]
  )
}
