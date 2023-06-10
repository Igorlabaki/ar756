import { motion } from "framer-motion";
import React, { useState } from "react";
import AllImagesComponent from ".";

export default function ImagesDashboardComponent() {
  const [galeriaModalMode, setGaleriaModalMode] = useState<
    "TODAS" | "CARROUCELPRINCIPAL" | "CARROUCELMODAL" | "GRID"
  >("TODAS");

  const allOption = galeriaModalMode.includes("TODAS");
  const gridOption = galeriaModalMode.includes("GRID");
  const modalCarroucelOption = galeriaModalMode.includes("CARROUCELMODAL");
  const mainCarroucelOption = galeriaModalMode.includes("CARROUCELPRINCIPAL");

  return (
    <div className="flex flex-col w-full h-full py-20">
      <div className="relative flex justify-between w-full px-20 text-white text-[17px]">
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            allOption ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setGaleriaModalMode("TODAS")}
        >
          TODAS
        </p>
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            mainCarroucelOption ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setGaleriaModalMode("CARROUCELPRINCIPAL")}
        >
          CARROUCEL PRINCIPAL
        </p>
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            modalCarroucelOption ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setGaleriaModalMode("CARROUCELMODAL")}
        >
          CARROUCEL MODAL
        </p>
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            gridOption ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setGaleriaModalMode("GRID")}
        >
          GRID
        </p>
        {/*  <motion.hr
          className="absolute text-white bg-white border-2 border-white left-[78px] top-8"
          initial={{
            width: "100px",
            height: "3px",
            color: "white",
          }}
          animate={{
            width: allOption
              ? "60px"
              : mainCarroucelOption
              ? "209px"
              : modalCarroucelOption
              ? "180px"
              : gridOption
              ? "55px"
              : 0,
            x: allOption
              ? "0px"
              : mainCarroucelOption
              ? "360px"
              : modalCarroucelOption
              ? "860px"
              : gridOption
              ? "1335px"
              : 0,
            transition: {
              duration: 0.8,
            },
          }}
        /> */}
      </div>
      <div className="flex-1">{allOption && <AllImagesComponent />}</div>
    </div>
  );
}
