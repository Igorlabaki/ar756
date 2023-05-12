import React, { useEffect, useRef } from "react";
import { SectionComponent } from "../section";
import { GridComponent } from "./grid";
import { ImageComponent } from "../image";
import { motion, useScroll, useTransform } from "framer-motion";

export function WelcomeComponent() {
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
  const translate = useTransform(scrollYProgress, [0, 1], ["100px", "0"]);

  return (
    <SectionComponent>
      <div className="flex flex-col w-full h-full" ref={targetRef}>
        <div className="flex flex-col w-full">
          <motion.div
            className={`flex items-center justify-center gap-x-3`}
            style={{ opacity }}
          >
            <div className="border-[1px] border-black flex-1" />
            <p
              style={{}}
              className={`text-start text-[25px] tracking-[0.25rem]  w-[50%] `}
            >
              BEM-VINDO A
            </p>
          </motion.div>
          <div className="flex">
            <div className="w-[46.0%] block" />
            <motion.div
              style={{ opacity }}
              className="flex items-center justify-start flex-1"
            >
              <ImageComponent
                alt={"logo AR756"}
                h={"h-[100px] "}
                w={"w-[320px]"}
                src={"/images/logo-vila-preto.png"}
                containerClassname={""}
              />
            </motion.div>
          </div>
        </div>
        <motion.p
          className={` w-[60%] mx-auto text-center mt-8`}
          style={{ opacity, translate }}
        >
          Este espaço amplo e bem conservado apresenta uma arquitetura
          contemporânea deslumbrante, perfeita para tirar fotos incríveis e
          gravar clipes. Com muita luz natural e uma sensação arejada, este
          espaço é ideal para a realização de eventos e workshops. Situado em um
          jardim natural deslumbrante, você encontrará uma piscina relaxante
          para se refrescar nos dias quentes. Além disso, dois estúdios
          separados sem pernoite estão disponíveis para uso adicional. Este
          lugar é verdadeiramente único e cheio de estilo, criando uma atmosfera
          inesquecível para qualquer evento ou sessão de fotos.
        </motion.p>
        <GridComponent />
      </div>
    </SectionComponent>
  );
}
