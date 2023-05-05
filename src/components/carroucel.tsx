import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { orderList } from "@/function/orderGridList";
import { homeGridImages } from "../constants/homeGridImages";
import { ImageGridType } from "@/types";
import { ImageComponent } from "./image";

interface CarroucelPorps {
  index: number;
}

export default function CarouselComponent({}: CarroucelPorps) {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  return (
    <div className="relative overflow-hidden flex h-[500px] w-[700px] overflow-x-auto rounded-md justify-center items-center gap-4">
      <BsFillArrowLeftCircleFill onClick={handlePrev} />
      <ImageComponent
        alt={list[currentSlide]?.alt}
        h={"h-[500px] "}
        w={"w-[700px]"}
        src={list[currentSlide]?.url}
        imageClassname="rounded-md"
        containerClassname={"z-20 overflow-hidden"}
      />
      <BsFillArrowRightCircleFill size={30} onClick={handleNext} />
    </div>
  );
}
