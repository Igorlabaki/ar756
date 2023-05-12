import React, { useRef } from "react";
import { BiBeer, BiDumbbell } from "react-icons/bi";
import {
  GiBarbecue,
  GiCctvCamera,
  GiDress,
  GiPartyPopper,
} from "react-icons/gi";
import "slick-carousel/slick/slick-theme.css";
import {
  MdOutlineCleaningServices,
  MdOutlineLunchDining,
  MdSoupKitchen,
} from "react-icons/md";
import {
  BsCarFrontFill,
  BsFileMusic,
  BsFlower1,
  BsSpeaker,
} from "react-icons/bs";

import { ImageComponent } from "@/components/image";
import { SectionComponent } from "@/components/section";
import { FaSwimmingPool, FaWifi } from "react-icons/fa";
import { ItemComodidadeComponent } from "../itemComodidade";
import { CardComponent } from "../card";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ComodidadeComponent() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    ["0%", "0%", "100%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);

  return (
    <SectionComponent>
      <motion.div
        className="flex flex-col w-full h-full"
        ref={targetRef}
        style={{}}
      >
        <motion.div
          style={{}}
          className="flex justify-between min-w-full min-h-screen pr-10 -top-12"
        >
          <ImageComponent
            alt={"piscina"}
            h={"h-[85%] "}
            w={"w-[70%]"}
            src={"/images/piscina-frente.jpeg"}
            containerClassname={"brightness-90   absolute -top-[3.2rem]"}
          />
        </motion.div>
        <CardComponent
          h="h-[500px]"
          w={"w-[450px]"}
          className="absolute  text-black  flex  
rounded-md shadow-lg bottom-[6.5rem] right-[18%] "
        >
          <div className="flex items-center justify-end w-full space-x-3">
            <div className="flex items-center justify-end w-[140px] ">
              <ImageComponent
                alt={"piscina"}
                h={"h-[60px] "}
                w={"w-[100px]"}
                src={"/images/logo-vila-preto.png"}
              />
            </div>
            <div className="border-[1px] border-black flex-1 h-0 " />
            <h1 className="absolute w-full text-2xl text-black top-[4.3rem] left-8">
              COMODIDADES
            </h1>
          </div>
          <div className="flex mt-8 gap-x-10">
            <div className="space-y-3">
              <ItemComodidadeComponent
                title="Wifi"
                icon={<FaWifi size={20} />}
              />
              <ItemComodidadeComponent
                title="Piscina"
                icon={<FaSwimmingPool size={20} />}
              />
              <ItemComodidadeComponent
                title="Cozinha"
                icon={<MdSoupKitchen size={20} />}
              />

              <ItemComodidadeComponent
                title="Churrasqueira"
                icon={<GiBarbecue size={20} />}
              />
              <ItemComodidadeComponent
                title="Salao de Festa"
                icon={<GiPartyPopper size={20} />}
              />
            </div>
            <div className="space-y-3">
              <ItemComodidadeComponent
                title="Bar"
                icon={<BiBeer size={20} />}
              />
              <ItemComodidadeComponent
                title="Jardim"
                icon={<BsFlower1 size={20} />}
              />
              <ItemComodidadeComponent
                title="Camarim"
                icon={<GiDress size={20} />}
              />
              <ItemComodidadeComponent
                title="Garagem"
                icon={<BsCarFrontFill size={20} />}
              />
              <ItemComodidadeComponent
                title="Academia"
                icon={<BiDumbbell size={20} />}
              />
            </div>
          </div>
        </CardComponent>
      </motion.div>
    </SectionComponent>
  );
}
