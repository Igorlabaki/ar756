"use client";
import { ImageComponent } from "@/components/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/components/button";

export default function Home() {
  const slides = [
    { url: "/images/piscina-fundo.jpeg", alt: "piscina fundo" },
    { url: "/images/salao-dentro.jpeg", alt: "salao dentro" },
    { url: "/images/salao-interno.jpeg", alt: "salao dentro" },
    { url: "/images/salao-interno2.jpeg", alt: "salao interno 2" },
    { url: "/images/sinuca.jpeg", alt: "sinuca" },
  ];

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
    <main className="relative flex flex-col items-center justify-center max-h-screen min-h-screen">
      <div className="absolute flex-shrink-0 w-full h-screen">
        <ImageComponent
          alt={slides[curr]?.alt}
          h={"h-screen "}
          w={"w-full"}
          src={slides[curr]?.url}
          containerClassname={"z-20"}
        />
      </div>
      <ButtonComponent
        title="RESERVAR"
        className="z-40 px-10 py-4 text-[20px] hover:bg-black transition duration-500 tracking-[0.30rem] text-white rounded-md bg-black/50"
      />
    </main>
  );
}
