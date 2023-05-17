import { ImageComponent } from "@/components/image";
import { fotos } from "@/constants/fotos";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { GrFormClose } from "react-icons/gr";

interface GaleriaCardProps {
  handleCloseGaleriaModa: () => void;
}

export function GaleriaCardComponent({
  handleCloseGaleriaModa,
}: GaleriaCardProps) {
  const [galeriaModalMode, setGaleriaModalMode] = useState<
    "TODAS" | "AREA EXTERNA" | "SALAO INTERNO" | "SALAO EXTERNO"
  >("TODAS");
  return (
    <div className="w-full ">
      <ImageComponent
        alt={"logo"}
        h={"h-[180px]"}
        w={"w-[250px]"}
        src={`/images/logo-vila-preto.png`}
        containerClassname={"z-20 rounded-md -ml-2  "}
      />
      <GrFormClose
        className="absolute rounded-full cursor-pointer right-2 top-2 hover:bg-gray-200"
        onClick={handleCloseGaleriaModa}
      />
      <div className="flex gap-x-5 font-semibold text-[18px] mb-5 relative">
        <p
          className={`relative cursor-pointer tracking-[0.10rem]  text-[13px]`}
          onClick={() => setGaleriaModalMode("TODAS")}
        >
          TODAS
        </p>
        <p
          className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] `}
          onClick={() => setGaleriaModalMode("AREA EXTERNA")}
        >
          AREA EXTERNA
        </p>
        <p
          className={`relative cursor-pointer tracking-[0.10rem]  text-[13px]`}
          onClick={() => setGaleriaModalMode("SALAO INTERNO")}
        >
          SALAO INTERNO
        </p>
        <p
          className={`relative cursor-pointer tracking-[0.10rem]  text-[13px]`}
          onClick={() => setGaleriaModalMode("SALAO EXTERNO")}
        >
          SALAO EXTERNO
        </p>
        <motion.hr
          className="absolute bottom-0 left-0 text-black border-2 border-black "
          initial={{
            width: "47px",
          }}
          animate={{
            width: galeriaModalMode.includes("TODAS")
              ? "47px"
              : galeriaModalMode.includes("AREA EXTERNA")
              ? "109px"
              : galeriaModalMode.includes("SALAO INTERNO") ||
                galeriaModalMode.includes("SALAO EXTERNO")
              ? "120px"
              : 0,
            x: galeriaModalMode.includes("TODAS")
              ? "0px"
              : galeriaModalMode.includes("AREA EXTERNA")
              ? "70px"
              : galeriaModalMode.includes("SALAO INTERNO")
              ? "200px"
              : galeriaModalMode.includes("SALAO EXTERNO")
              ? "342px"
              : 0,
            transition: {
              duration: 0.8,
            },
          }}
        />
      </div>
      <div className="flex flex-wrap items-start w-full gap-2 pb-10 flex-start">
        {fotos.map((item: { url: string; alt: string }) => {
          if (
            !galeriaModalMode
              .toLocaleLowerCase()
              .includes(item.alt.toLocaleLowerCase()) &&
            !galeriaModalMode.includes("TODAS")
          ) {
            return;
          }
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1 },
              }}
              key={item.url}
              className="overflow-hidden rounded-sm "
            >
              <ImageComponent
                alt={item.alt}
                h={"h-[200px]"}
                w={"w-[395px]"}
                src={`/images/${item.url}`}
                containerClassname={"z-20 rounded-md"}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
