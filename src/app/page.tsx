"use client";
import { ImageComponent } from "@/components/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

export default function Home() {
  const slides = [
    { url: "/images/piscina-fundo.jpeg", alt: "piscina fundo" },
    { url: "/images/piscina-frente.jpeg", alt: "piscina frente" },
    { url: "/images/piscina-cima.jpeg", alt: "piscina cima" },
  ];

  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (curr === slides.length - 1) {
        setCurr(() => 0);
      } else {
        setCurr((curr) => (curr + 1) % slides.length);
      }
    }, 5000); // intervalo de 5 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-between max-h-screen min-h-screen">
      <div className="flex-shrink-0 w-full h-screen">
        <ImageComponent
          alt={slides[curr]?.alt}
          h={"h-screen "}
          w={"w-full"}
          src={slides[curr]?.url}
          containerClassname={"z-20"}
        />
      </div>
    </main>
  );
}
