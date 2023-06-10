import React, { createContext, useEffect, useState } from "react";
import { IMoodalsContextRepository } from "../context/repositories/IModalsContextRepository";

export const ModalsContext = createContext({} as IMoodalsContextRepository);

export function ModalsProvider({ children }: any) {
  // Reservas Modal
  const [reservaModalIsOpen, setReservaModalIsOpen] = useState<boolean>(false);
  const [warningIsTrue, setWarningIsTrue] = useState<boolean>(false);

  function handleOpenReservaModal() {
    setReservaModalIsOpen(() => true);
  }
  function handleCloseReservaModal() {
    setReservaModalIsOpen(() => false);
  }

  function handleTurnOffWarning() {
    setWarningIsTrue(() => false);
  }

  function handleTurnOnWarning() {
    setWarningIsTrue(() => true);
    setTimeout(handleTurnOffWarning, 3500);
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
        warningIsTrue,
        reservaModalIsOpen,
        handleOpenReservaModal,
        handleCloseReservaModal,
        handleTurnOnWarning,
        handleTurnOffWarning,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
