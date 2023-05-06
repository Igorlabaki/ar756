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

interface CarroucelPorps {
  index: number;
}

export default function CarouselComponent({ index }: CarroucelPorps) {
  const [currentSlide, setCurrentSlide] = useState(index - 1);
  const [list, setList] = useState(orderList(homeGridImages));

  function handlePrev() {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? homeGridImages.length - 1 : prevSlide - 1
    );
  }

  function handleNext() {
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-x-8">
      <div className="items-center justify-center p-1 text-white bg-black rounded-full z-60">
        <IoIosArrowBack
          onClick={handlePrev}
          size={30}
          className="cursor-pointer"
        />
      </div>
      <div className="relative  flex h-[500px] w-[800px] overflow-x-auto rounded-md justify-center items-center gap-4">
        <ImageComponent
          alt={list[currentSlide]?.alt}
          h={"h-[500px] "}
          w={"w-[800px]"}
          src={list[currentSlide]?.url}
          imageClassname="rounded-md"
          containerClassname={"z-20 overflow-hidden rounded-md"}
        />
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
