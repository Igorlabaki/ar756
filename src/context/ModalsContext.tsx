import React, { createContext, useEffect, useState } from "react";
import { IMoodalsContextRepository } from "../context/repositories/IModalsContextRepository";

export const ModalsContext = createContext({} as IMoodalsContextRepository);

export function ModalsProvider({ children }: any) {
  // Reservas Modal
  const [reservaModalIsOpen, setReservaModalIsOpen] = useState<boolean>(false);

  function handleOpenReservaModal() {
    setReservaModalIsOpen(() => true);
  }
  function handleCloseReservaModal() {
    setReservaModalIsOpen(() => false);
  }

  useEffect(() => {
    if (reservaModalIsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [reservaModalIsOpen]);
  //
  return (
    <ModalsContext.Provider
      value={{
        reservaModalIsOpen,
        handleOpenReservaModal,
        handleCloseReservaModal,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
