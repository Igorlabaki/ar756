import React, { useEffect, useState } from "react";
import { ImageComponent } from "../image";
import { ButtonComponent } from "../button";
import { slides } from "@/constants/slides";
import { motion, AnimatePresence } from "framer-motion";

export function MainCarroucel() {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (curr === slides.length - 1) {
        setCurr(() => 0);
      } else {
        setCurr((curr) => (curr + 1) % slides.length);
      }
    }, 4000); // intervalo de 5 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative flex flex-shrink-0 w-full h-screen bg-gray-700">
      <div className="flex w-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            className="w-full max-h-screen min-w-full"
            key={slides[curr]?.url}
            src={slides[curr]?.url}
            initial={{
              x: `100%`,
            }}
            exit={{
              x: `-100%`,
              transition: {
                type: "linear",
                stiffness: 30,
                damping: 30,
              },
            }}
            animate={{
              x: 0,
              transition: {
                type: "linear",
                stiffness: 30,
                damping: 10,
              },
            }}
          />
        </AnimatePresence>
      </div>
      <ButtonComponent
        title="RESERVAR"
        className={`
        before:
          text-opacity-40
          z-30
          absolute
          px-10
          left-[45%]
          top-[50%]
          py-4
          text-[20px]
          hover:bg-zinc-900
          hover:text-opacity-100
           tracking-[0.30rem] text-white rounded-md bg-black/50
          transition duration-300 ease-in-out transform hover:scale-110 active:scale-90 active:transition-none active:duration-500
          `}
      />
    </div>
  );
}

{
  /* <AnimatePresence mode="wait">
<motion.img
  key={curr}
  alt={slides[curr]?.alt}
  src={slides[curr]?.url}
  className="w-full max-h-screen brightness-90"
  initial={{ opacity: 0.5 }}
  animate={{ opacity: 1, transition: { duration: 0.5 } }}
  exit={{ opacity: 0.5, transition: { duration: 1 } }}
  transition={{ duration: 0.5 }}
/>
</AnimatePresence> */
}
