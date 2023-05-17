import { ImageComponent } from "@/components/image";
import React from "react";

interface ExploreCardProps {
  handleOpenModal: () => void;
  alt: string;
  src: string;
  title: string;
  containerClassname: string;
}

export function ExploreCardComponent({
  handleOpenModal,
  alt,
  containerClassname,
  src,
  title,
}: ExploreCardProps) {
  return (
    <div
      onClick={handleOpenModal}
      className="opacity-[1.5] relative w-[400px] h-[400px] flex justify-center items-center text-[24px]  tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden"
    >
      <ImageComponent
        alt={alt}
        h={"h-full"}
        w={"w-full"}
        src={`/images/${src}`}
        containerClassname={containerClassname}
      />
      <p className="absolute inset-0 z-40 flex items-center justify-center text-[24px] w-[80%] mx-auto text-center">
        {title}
      </p>
    </div>
  );
}
