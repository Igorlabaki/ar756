import React, { useState, ReactNode } from "react";
import { ButtonComponent } from "./button";
import { useAnimation, motion } from "framer-motion";
import useModalsContext from "@/hook/useModalsContext";

interface CardProps {
  children: ReactNode;
  className?: string;
  w: string;
  h: string;
}

export function CardComponent({ children, className, w, h }: CardProps) {
  const controls = useAnimation();
  const [animate, setAnimate] = useState(false);
  const { handleOpenReservaModal } = useModalsContext();

  const handleClick = () => {
    setAnimate(true);
    controls.start({ scale: 0.5, transition: { duration: 0.2 } }).then(() => {
      controls.start({ scale: 1, transition: { duration: 0.2 } });
      setAnimate(false);
    });
  };

  return (
    <div
      className={`bg-white w-[430px] ${w} ${h}  flex flex-col pt-7 pb-10   justify-start items-center gap-y-10 z-30
      ${className}
    `}
    >
      {children}
      <motion.button
        className={`
          z-30
          w-[150px]
          h-[55px]
          text-[15px]
           tracking-[3px] text-white rounded-md bg-black
           mt-6
          transition duration-300 ease-in-out transform hover:scale-110 active:scale-90 active:transition-none active:duration-500
        `}
        variants={{
          rest: { scale: 1 },
          clicked: { scale: 0.5 },
        }}
        animate={controls}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
          handleOpenReservaModal && handleOpenReservaModal();
        }}
      >
        RESERVAR
      </motion.button>
    </div>
  );
}
