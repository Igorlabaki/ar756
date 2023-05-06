"use client";
import { ImageComponent } from "@/components/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { ButtonComponent } from "@/components/button";
import { Kumbh_Sans } from "next/font/google";
import {
  Merriweather,
  Lora,
  Playfair_Display,
  Raleway,
} from "next/font/google";
import GridComponent from "@/components/home/grid";
import { slides } from "@/constants/slides";
import { comentarios } from "@/constants/comentarios";
import { ComentarioType } from "@/types";
import MapComponent from "@/components/map";

const lora = Lora({
  subsets: ["latin"],
  weight: "400",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [mode, setMode] = useState<"Map" | "Avaliacoes">("Avaliacoes");
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
    <main className={`relative flex flex-col items-center justify-center`}>
      <div className="relative flex-shrink-0 w-full h-screen">
        <ImageComponent
          alt={slides[curr]?.alt}
          h={"h-screen "}
          w={"w-full"}
          src={slides[curr]?.url}
          containerClassname={"z-20"}
        />
        <ButtonComponent
          title="RESERVAR"
          className={`
          ${lora.className}
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
          transition duration-500 tracking-[0.30rem] text-white rounded-md bg-black/50`}
        />
      </div>

      <div className="bg-[#EEEEEE] w-full h-screen flex flex-col justify-start pt-20 pb-5 items-center">
        <div className="flex flex-col divide-y-4 divide-slate-300">
          <p
            className={`${raleway.className} text-center text-3xl tracking-[0.25rem] font-semibold `}
          >
            WELCOME
          </p>
          <p
            className={`${raleway.className} text-center text-3xl tracking-[0.25rem] font-semibold `}
          >
            OASIS URBANO
          </p>
        </div>
        <p className={` w-[50%] text-justify mt-8`}>
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
        <GridComponent />
      </div>
      <div className="bg-[#EEEEEE] w-full flex flex-col justify-center  items-center mt-10">
        {mode.includes("Avaliacoes") && (
          <div className="flex flex-col w-[80%] mx-auto gap-y-8 gap-x-10 ">
            <p
              className={`${raleway.className} text-center text-3xl tracking-[0.25rem] font-semibold  w-[80%] mr- mx-auto`}
            >
              AVALIAÇÕES
            </p>
            {comentarios?.map((item: ComentarioType, index: number) => {
              return (
                <div
                  key={index}
                  className="flex px-5 py-5 rounded-lg shadow-lg gap-x-5"
                >
                  <ImageComponent
                    src={item?.avatar}
                    alt="profile foto"
                    h="h-[90px]"
                    w="w-[90px]"
                    containerClassname="rounded-full overflow-hidden "
                  />
                  <div className="">
                    <p>{item?.username}</p>
                    <p className="text-[11px] ">{item?.createdAt}</p>
                    <p className="w-[90%]">{item?.comentario}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {mode.includes("Map") && (
          <div className="flex flex-col items-start w-[80%] mx-auto gap-y-8 gap-x-10 ">
            <p
              className={`${raleway.className} text-center text-3xl tracking-[0.25rem] font-semibold  w-[80%] mr- mx-auto`}
            >
              LOCALIZACAO
            </p>
            <MapComponent />
          </div>
        )}
        <div className="flex items-center justify-center w-full py-10 mt-4 mb-1 space-x-3 ">
          <div
            className={`h-2 w-2  ${
              mode.includes("Avaliacoes") ? "bg-blue-400 " : "bg-gray-300 "
            }  rounded-full cursor-pointer`}
            onClick={() => setMode("Avaliacoes")}
          />
          <div
            className={`h-2 w-2 ${
              mode.includes("Map") ? "bg-blue-400 " : "bg-gray-300 "
            } rounded-full cursor-pointer`}
            onClick={() => setMode("Map")}
          />
        </div>
      </div>
      <div className="bg-[#EEEEEE] w-full flex flex-col  justify-start pb-5 items-start px-24 gap-y-16">
        <p
          className={`${raleway.className} text-center text-3xl tracking-[0.25rem] font-semibold  w-[80%] mr- mx-auto`}
        >
          EXPLORE AR756
        </p>
        <div className="w-[50%] mx-auto flex gap-x-10 text-white justify-center items-center ">
          <div className="opacity-[1.5] relative w-[200px] h-[200px] flex justify-center items-center text-[24px]  tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden">
            <ImageComponent
              alt={"foto"}
              h={"h-full "}
              w={"w-full"}
              src={"/images/exterior2.jpeg"}
              containerClassname={"z-20"}
            />
            <p className="absolute inset-0 z-40 flex items-center justify-center text-[24px] w-[80%] mx-auto text-center">
              AR756
            </p>
          </div>
          <div className="opacity-[1.5] relativebg-ar756 w-[200px] h-[200px] flex justify-center items-center text-[24px]  tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden">
            <ImageComponent
              alt={"foto"}
              h={"h-full "}
              w={"w-full"}
              src={"/images/guardasol.jpeg"}
              containerClassname={"z-20"}
            />
            <p className="absolute inset-0 z-40 flex items-center justify-center text-[20px] w-[80%] mx-auto text-center">
              COMODIDADES E SERVIÇOS
            </p>
          </div>
          <div className="opacity-[1.5] relative w-[200px] h-[200px] flex justify-center items-center   tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden">
            <ImageComponent
              alt={"foto"}
              h={"h-full "}
              w={"w-full"}
              src={"/images/salao-interno.jpeg"}
              containerClassname={"z-20"}
            />
            <p className="absolute inset-0 z-40 flex items-center justify-center text-[24px] w-[80%] mx-auto text-center">
              GALERIA
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <div className="w-[50%] flex flex-col gap-y-10">
<h1
  className={`${lora.className} text-center text-3xl tracking-[0.25rem] font-semibold `}
>
  OQUE O ESSPAÇO OFERECE
</h1>
<ul className="flex flex-col gap-y-5">
  <li className="flex items-center justify-start gap-x-10">
    <FaWifi size={25} />
    <p className="text-md">Wifi</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <BiSpeaker size={25} />
    <p className="text-md">Som</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <BiShower size={25} />
    <p className="text-md">Ducha</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <FaSwimmingPool size={25} />
    <p className="text-md">Piscina</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <MdOutlineSoupKitchen size={25} />
    <p className="text-md">Cozinha</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <BsCarFront size={25} />
    <p className="text-md">Garagem</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <CgGym size={25} />
    <p className="text-md">Academia</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <GiFireBowl size={25} />
    <p className="text-md">Fogareiro</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <BsBalloon size={25} />
    <p className="text-md">Salao de festa</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <GiBarbecue size={25} />
    <p className="text-md">Churrasqueira</p>
  </li>
  <li className="flex items-center justify-start gap-x-10">
    <TbPaw size={25} />
    <p className="text-md">Permitido Animais</p>
  </li>
</ul>
</div>
<div className="w-[50%] h-[700px] bg-red-900 rounded-lg orverflow-hidden shadow-lg">
<ImageComponent
  alt={"Piscina"}
  h={"h-full "}
  w={"w-full"}
  src={"/images/piscina-fundo.jpeg"}
  containerClassname={"rounded-lg orverflow-hidden"}
  imageClassname="rounded-lg"
/>
</div> */
}
