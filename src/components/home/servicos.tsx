import React from "react";
import { BsSpeaker } from "react-icons/bs";
import { GiCctvCamera } from "react-icons/gi";
import { RiLightbulbLine } from "react-icons/ri";
import { IoMdMusicalNotes } from "react-icons/io";
import { CardComponent } from "@/components/card";
import { ImageComponent } from "@/components/image";
import useModalsContext from "@/hook/useContext/useModalsContext";
import { SectionComponent } from "@/components/section";
import { ItemComodidadeComponent } from "@/components/itemComodidade";
import {
  MdOutlineCleaningServices,
  MdOutlineLunchDining,
} from "react-icons/md";

export default function ServicosComponents() {
  return (
    <SectionComponent>
      <div className="absolute left-10   -mt-[85px]">
        <ImageComponent
          alt={"logo-branco"}
          h={"h-[188px]"}
          w={"w-[529px]"}
          src={"/images/LOGO-VILA-BRANCO_SOMBRA.png"}
          containerClassname="z-20"
        />
      </div>
      <ImageComponent
        alt={"piscina"}
        h={"h-[613px] "}
        w={"w-[100%]"}
        src={"/images/salao-dentro.jpeg"}
        containerClassname={"brightness-90 absolute"}
      />
      <CardComponent
        h="h-[413ox]"
        w={"w-[350]"}
        className="absolute  text-black  flex  
rounded-md shadow-lg bottom-[10.5rem]  "
      >
        <div className="flex items-center justify-end w-full space-x-3">
          <div className="border-[1px] border-black flex-1 h-0 " />
          <div className="flex items-center justify-start w-[140px] ">
            <ImageComponent
              alt={"piscina"}
              h={"h-[60px] "}
              w={"w-[100px]"}
              src={"/images/logo-vila-preto.png"}
            />
          </div>
          <h1 className="absolute w-full text-end text-2xl text-black top-[4.3rem] pr-[45px]">
            SERVICOS EXTRAS
          </h1>
        </div>
        <div className="flex justify-center mt-8 gap-x-10 ">
          <div className="flex flex-col w-full gap-y-3">
            <ItemComodidadeComponent
              title="DJ"
              icon={<IoMdMusicalNotes size={20} />}
            />
            <ItemComodidadeComponent
              title="Som"
              icon={<BsSpeaker size={20} />}
            />
            <ItemComodidadeComponent
              title="Comida"
              icon={<MdOutlineLunchDining size={20} />}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <ItemComodidadeComponent
              title="Limpeza"
              icon={<MdOutlineCleaningServices size={20} />}
            />
            <ItemComodidadeComponent
              title="Seguranca"
              icon={<GiCctvCamera size={20} />}
            />
            <ItemComodidadeComponent
              title="Iluminacao"
              icon={<RiLightbulbLine size={20} />}
            />
          </div>
        </div>
      </CardComponent>
    </SectionComponent>
  );
}
