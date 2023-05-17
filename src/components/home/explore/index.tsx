import React, { useEffect, useState } from "react";
import { ImageComponent } from "../../image";
import { comentarios } from "@/constants/comentarios";
import { ComentarioType } from "@/types";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdMusicalNotes,
} from "react-icons/io";
import { GrFormClose } from "react-icons/gr";
import { homeGridImages } from "@/constants/homeGridImages";
import { ModalComponent } from "../../modal";
import { fotos } from "@/constants/fotos";
import { ItemComodidadeComponent } from "../../itemComodidade";
import { FaSwimmingPool, FaWifi } from "react-icons/fa";
import {
  MdOutlineCleaningServices,
  MdOutlineLunchDining,
  MdSoupKitchen,
} from "react-icons/md";
import {
  GiBarbecue,
  GiCctvCamera,
  GiDress,
  GiPartyPopper,
} from "react-icons/gi";
import { BiBeer, BiDumbbell } from "react-icons/bi";
import { BsCarFrontFill, BsFlower1, BsSpeaker } from "react-icons/bs";
import { RiLightbulbLine } from "react-icons/ri";
import { ComodidadesCardComponent } from "./comodidadesCard";
import { RegrasCardComponent } from "./regrasCard";
import { GaleriaCardComponent } from "./galeriaCard";
import { ExploreCardComponent } from "./exploreCard";

export function ExploreComponent() {
  const [galeriaModal, setGaleriaModal] = useState(false);
  const [regrasModal, setRegrasModal] = useState(false);
  const [comodidadesServicosModal, setComodidadesServicosModal] =
    useState(false);

  function handleCloseGaleriaModa() {
    setGaleriaModal(false);
  }

  function handleOpenGaleriaModa() {
    setGaleriaModal(true);
  }

  function handleCloseComodidadeServicoModal() {
    setComodidadesServicosModal(false);
  }

  function handleOpenComodidadeServicoModal() {
    setComodidadesServicosModal(true);
  }

  function handleCloseregrasModal() {
    setRegrasModal(false);
  }

  function handleOpenregrasModal() {
    setRegrasModal(true);
  }

  useEffect(() => {
    if (galeriaModal || regrasModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [galeriaModal, regrasModal]);

  return (
    <div className=" text-[#555D2D] w-full flex flex-col mb-10  justify-start pb-5 items-start px-24 gap-y-16 -mt-16">
      <div className="flex items-center justify-center w-full gap-x-3">
        <p
          className={`text-center text-black text-3xl tracking-[0.25rem] font-semibold`}
        >
          MAIS INFORMACOES
        </p>
      </div>
      <div className="w-[80%] mx-auto flex gap-x-10 text-white justify-center items-center ">
        <ExploreCardComponent
          handleOpenModal={handleOpenregrasModal}
          alt="foto"
          containerClassname="z-20"
          src="exterior2.jpeg"
          title="SOBRE E REGRAS"
        />
        <ExploreCardComponent
          handleOpenModal={handleOpenComodidadeServicoModal}
          alt="foto"
          containerClassname="z-20"
          src="guardasol.jpeg"
          title="COMODIDADES E SERVIÇOS"
        />
        <ExploreCardComponent
          handleOpenModal={handleOpenGaleriaModa}
          alt="foto"
          containerClassname="z-20"
          src="salao-interno.jpeg"
          title="GALERIA"
        />
      </div>

      {galeriaModal && (
        <ModalComponent
          onClose={handleCloseGaleriaModa}
          styleExternal="bg-black/70 rounded-sm z-50 "
          styleInternal="rounded-md bg-white overflow-hidden relative overflow-y-scroll relative   w-[900px] flex-shrink h-[900px] z-50 px-10 "
        >
          <GaleriaCardComponent
            handleCloseGaleriaModa={handleCloseGaleriaModa}
          />
        </ModalComponent>
      )}
      {comodidadesServicosModal && (
        <ModalComponent
          onClose={handleCloseComodidadeServicoModal}
          styleExternal="bg-black/70 rounded-sm z-50 "
          styleInternal="rounded-md bg-white overflow-hidden relative overflow-y-scroll relative   w-[900px] flex-shrink h-[900px] z-50 px-10 "
        >
          <ComodidadesCardComponent
            handleCloseComodidadeServicoModal={
              handleCloseComodidadeServicoModal
            }
          />
        </ModalComponent>
      )}
      {regrasModal && (
        <ModalComponent
          onClose={handleCloseregrasModal}
          styleExternal="bg-black/70 rounded-sm z-50 "
          styleInternal="rounded-md bg-white overflow-hidden relative overflow-y-scroll   w-[900px] flex-shrink h-[900px] z-50 px-10 "
        >
          <RegrasCardComponent
            handleCloseregrasModal={handleCloseregrasModal}
          />
        </ModalComponent>
      )}
    </div>
  );
}
