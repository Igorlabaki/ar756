"use client";
import { ImageComponent } from "@/components/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Kumbh_Sans } from "next/font/google";
import { Signika } from "next/font/google";

const signika = Signika({ subsets: ["latin"], weight: "500" });

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"], weight: "400" });

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
    <main className="relative flex flex-col items-center justify-center">
      <div className="flex-shrink-0 w-full h-screen relative">
        <ImageComponent
          alt={slides[curr]?.alt}
          h={"h-screen "}
          w={"w-full"}
          src={slides[curr]?.url}
          containerClassname={"z-20"}
        />
        <ButtonComponent
          title="RESERVAR"
          className="z-40 absolute px-10 left-[45%] top-[50%] py-4 text-[20px] hover:bg-black transition duration-500 tracking-[0.30rem] text-white rounded-md bg-black/50"
        />
      </div>

      <div className="bg-[#EBEBEB] w-full h-screen flex flex-col justify-start pt-20 pb-5 items-center">
        <p
          className={`${kumbh_sans} text-center text-3xl tracking-[0.25rem] font-semibold `}
        >
          OASIS URBANO
        </p>
        <p className={`${signika} w-[50%] text-justify mt-8`}>
          Este espaço amplo e bem conservado apresenta uma arquitetura
          contemporânea deslumbrante, perfeita para tirar fotos incríveis e
          gravar clipes. Com muita luz natural e uma sensação arejada, este
          espaço é ideal para a realização de eventos e workshops. Situado em um
          jardim natural deslumbrante, você encontrará uma piscina relaxante
          para se refrescar nos dias quentes. Além disso, dois estúdios
          separados sem pernoite estão disponíveis para uso adicional. Este
          lugar é verdadeiramente único e cheio de estilo, criando uma atmosfera
          inesquecível para qualquer evento ou sessão de fotos.
        </p>
        <div className="relative w-full grid grid-cols-14 grid-rows-8 flex-1 gap-1 pt-20">
          <div className="col-start-1 col-end-5 row-start-1 row-end-6  overflow-hidden rounded-md">
            <ImageComponent
              alt={slides[0]?.alt}
              h={"h-full "}
              w={"w-full"}
              src={"/images/piscina-frente.jpeg"}
              containerClassname={"z-20"}
            />
          </div>
          <div className="col-start-5 col-end-7 row-start-1 row-end-3  overflow-hidden rounded-md">
            <ImageComponent
              alt={slides[1]?.alt}
              h={"h-full "}
              w={"w-full"}
              src={"/images/salao-sofas.jpeg"}
              containerClassname={"z-20"}
            />
          </div>
          <div className="col-start-5 col-end-7 row-start-3 row-end-6  overflow-hidden rounded-md">
            <ImageComponent
              alt={slides[2]?.alt}
              h={"h-full "}
              w={"w-full"}
              src={"/images/salao-interno2.jpeg"}
              containerClassname={"z-20"}
            />
          </div>
          <div className="col-start-7 col-end-10 row-start-1 row-end-4  overflow-hidden rounded-md">
            <ImageComponent
              alt={slides[3]?.alt}
              h={"h-full "}
              w={"w-full"}
              src={"/images/piscina-cima.jpeg"}
              containerClassname={"z-20"}
            />
          </div>
          <div className="col-start-7 col-end-10 row-start-4 row-end-6  overflow-hidden rounded-md">
            <ImageComponent
              alt={slides[4]?.alt}
              h={"h-full "}
              w={"w-full"}
              src={"/images/varanda.jpeg"}
              containerClassname={"z-20"}
            />
          </div>
          <div className="col-start-10 col-end-12 row-start-1 row-end-6  overflow-hidden rounded-md">
            <ImageComponent
              alt={slides[4]?.alt}
              h={"h-full "}
              w={"w-full"}
              src={slides[4]?.url}
              containerClassname={"z-20"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
