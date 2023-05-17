import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
export interface PropsNewModal {
  children: any;
  animate?: boolean;
  onClose: any;
  styleExternal?: string;
  styleInternal?: string;
}

export function ModalComponent({
  onClose,
  children,
  styleExternal,
  styleInternal,
  animate,
}: PropsNewModal) {
  const handleOutsideClick = (e: any) => {
    if (animate) {
      setTimeout(() => {
        if (e.target.id === "modal-root") {
          onClose();
        }
      }, 5000);
    } else {
      if (e.target.id === "modal-root") {
        onClose();
      }
    }
  };
  const modalRoot =
    document.getElementById("modal-root") ?? document.createElement("div");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      aria-hidden="true"
      id={"modal-root"}
      onClick={(e) => handleOutsideClick(e)}
      className={`${
        styleExternal ? styleExternal : "bg-black/40"
      } flex  w-full h-full justify-center items-center fixed top-0 right-0 z-40 `}
    >
      <div id="internal_modal" className={`${styleInternal} absolute z-[100]`}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
