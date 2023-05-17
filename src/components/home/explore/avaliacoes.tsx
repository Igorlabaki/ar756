import { comentarios } from "@/constants/comentarios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function AvaliacoesComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [directtion, setDirecttion] = useState(0);
  function handlePrev() {
    setDirecttion(-1);
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? comentarios.length - 1 : prevSlide - 1
    );
  }

  function handleNext() {
    setDirecttion(1);
    setCurrentSlide((prevSlide) =>
      prevSlide === comentarios.length - 1 ? 0 : prevSlide + 1
    );
  }

  const variants = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? `-100%` : `100%`,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? `100%` : `-100%`,
        opacity: 0,
        transition: { durantion: 1.5, ease: "easeInOut" },
      };
    },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentSlide === comentarios.length - 1) {
        setCurrentSlide(() => 0);
      } else {
        setCurrentSlide((curr) => (curr + 1) % comentarios.length);
      }
    }, 8000); // intervalo de 5 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="overflow-hidden w-full flex font-semibold  min-h-[100px] max-h-[100px] justify-center items-center">
      <IoIosArrowBack
        size={25}
        className="z-50 mt-5 cursor-pointer"
        onClick={() => handlePrev()}
      />
      <AnimatePresence initial={false}>
        <motion.div
          className="flex flex-col w-full gap-y-3 min-h-[100px]"
          variants={variants}
          animate="animate"
          initial="initial"
          exit={"exit"}
          key={currentSlide}
          custom={directtion}
        >
          <div className="flex flex-col items-center justify-center gap-y-3 text-[20px]">
            <p>{comentarios[currentSlide].username}</p>
            <hr className="text-[#555D2D] w-[15px] my-auto  border-[0.2px] border-[#555D2D]" />
          </div>
          <p className="italic w-[80%] text-[18px] mx-auto text-center ">
            `{comentarios[currentSlide].comentario}`
          </p>
        </motion.div>
      </AnimatePresence>
      <IoIosArrowForward
        size={25}
        className="z-50 mt-5 cursor-pointer "
        onClick={() => {
          handleNext();
        }}
      />
    </div>
  );
}
