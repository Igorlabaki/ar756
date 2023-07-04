"use client";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { orderList } from "@/function/orderGridList";
import { homeGridImages } from "../constants/homeGridImages";
import { ImageGridType } from "@/types";
import { ImageComponent } from "./image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

interface CarroucelPorps {
  index: number;
}

export default function CarouselComponent({ index }: CarroucelPorps) {
  const [currentSlide, setCurrentSlide] = useState(index - 1);
  const [directtion, setDirecttion] = useState(0);

  function handlePrev() {
    setDirecttion(0);
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? homeGridImages.length - 1 : prevSlide - 1
    );
  }

  function handleNext() {
    setDirecttion(1);
    setCurrentSlide((prevSlide) =>
      prevSlide === homeGridImages.length - 1 ? 0 : prevSlide + 1
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        // seta para esquerda
        handlePrev();
      } else if (event.key === "ArrowRight") {
        // seta para direita
        handleNext();
      }
    }

    document?.addEventListener("keydown", handleKeyDown);

    return () => {
      document?.addEventListener("keydown", handleKeyDown);
    };
  }, []);

  const variants = {
    initial: (directtion: number) => {
      return {
        x: directtion > 0 ? `-100%` : "100%",
      };
    },
    exit: (directtion: number) => {
      return {
        x: directtion > 0 ? `100%` : "-100%",
        opacity: 0,
        transition: {
          type: "linear",
          stiffness: 50,
          damping: 50,
        },
      };
    },
    animate: {
      x: 0,
      transition: {
        type: "linear",
        stiffness: 50,
        damping: 50,
      },
    },
  };

  return (
    <div className="flex items-center justify-center gap-x-8">
      <div className="items-center justify-center p-1 text-white bg-black rounded-full z-60">
        <IoIosArrowBack
          onClick={handlePrev}
          size={30}
          className="cursor-pointer"
        />
      </div>
      <div className="h-[600px] w-[900px] overflow-hidden">
        <AnimatePresence>
          <motion.img
            className="h-[600px] w-[900px] overflow-hidden rounded-md"
            key={homeGridImages[currentSlide]?.url}
            src={homeGridImages[currentSlide]?.url}
            variants={variants}
            initial={"initial"}
            exit={"exit"}
            animate={"animate"}
            custom={directtion}
          />
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center p-1 text-white bg-black rounded-full ">
        <IoIosArrowForward
          size={30}
          onClick={handleNext}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
