import { ImageComponent } from "@/components/image";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { motion } from "framer-motion";
import { ItemComodidadeComponent } from "@/components/itemComodidade";
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
import { BsCarFrontFill, BsFlower1, BsSpeaker } from "react-icons/bs";
import { BiBeer, BiDumbbell } from "react-icons/bi";
import { IoMdMusicalNotes } from "react-icons/io";
import { RiLightbulbLine } from "react-icons/ri";

interface ComodidadesCardProps {
  handleCloseComodidadeServicoModal: () => void;
}

export function ComodidadesCardComponent({
  handleCloseComodidadeServicoModal,
}: ComodidadesCardProps) {
  const [comodidadesServicosModalMode, setComodidadesServicosModalMode] =
    useState<"COMODIDADES" | "SERVICOS">("COMODIDADES");

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
        onClick={handleCloseComodidadeServicoModal}
      />
      <div className="flex gap-x-5 font-semibold text-[18px] mb-5 relative">
        <p
          className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] 
        `}
          onClick={() => setComodidadesServicosModalMode("COMODIDADES")}
        >
          COMODIDADES
        </p>
        <p
          className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] `}
          onClick={() => setComodidadesServicosModalMode("SERVICOS")}
        >
          SERVICOS
        </p>
        <motion.hr
          className="absolute bottom-0 left-0 text-black border-2 border-black "
          initial={{
            width: "110px",
          }}
          animate={{
            width: comodidadesServicosModalMode.includes("SERVICOS")
              ? "70px"
              : "110px",
            x: comodidadesServicosModalMode.includes("SERVICOS")
              ? "130px"
              : "0",
            transition: {
              duration: 0.5,
            },
          }}
        />
      </div>
      {comodidadesServicosModalMode.includes("COMODIDADES") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: comodidadesServicosModalMode.includes("COMODIDADES")
              ? 1
              : 0,
            transition: { duration: 0.5 },
          }}
          className="flex flex-col items-center justify-center w-full gap-x-10"
        >
          <div className="flex mt-10 mb-8 gap-x-10">
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
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas amet
            assumenda voluptates a, blanditiis temporibus animi itaque odio
            error aliquid dolor architecto. Excepturi blanditiis maxime earum
            laudantium neque nulla maiores odit quos numquam magni distinctio
            tenetur laboriosam, quaerat cum nam consequuntur facilis ratione
            ullam perspiciatis, iusto repellendus quod quia quisquam provident?
            Provident neque ipsum, temporibus odit nulla maxime repellat
            inventore quidem facere beatae qui facilis quasi dolorum! Quas
            provident, dolores, suscipit hic libero quam illum distinctio, error
            quo sed vitae quos reprehenderit iure perferendis ratione laudantium
            fuga qui ipsa commodi dolor vel doloremque labore et dolorum.
            Deserunt earum ea, labore delectus vitae modi necessitatibus sit ab
            molestiae, corrupti officia quia! Nam molestias nemo optio magnam
            obcaecati pariatur tenetur, odio omnis voluptate ducimus magni
            commodi repellat cum natus, necessitatibus voluptatibus culpa sint
            minima suscipit sunt? Veritatis eaque veniam consequatur labore
            unde, molestiae quidem architecto?
          </p>
        </motion.div>
      )}
      {comodidadesServicosModalMode.includes("SERVICOS") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: comodidadesServicosModalMode.includes("SERVICOS") ? 1 : 0,
            transition: { duration: 0.5 },
          }}
          className="flex flex-col items-center justify-center w-full gap-x-10 "
        >
          <div className="flex mt-10 mb-8 gap-x-10">
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
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas amet
            assumenda voluptates a, blanditiis temporibus animi itaque odio
            error aliquid dolor architecto. Excepturi blanditiis maxime earum
            laudantium neque nulla maiores odit quos numquam magni distinctio
            tenetur laboriosam, quaerat cum nam consequuntur facilis ratione
            ullam perspiciatis, iusto repellendus quod quia quisquam provident?
            Provident neque ipsum, temporibus odit nulla maxime repellat
            inventore quidem facere beatae qui facilis quasi dolorum! Quas
            provident, dolores, suscipit hic libero quam illum distinctio, error
            quo sed vitae quos reprehenderit iure perferendis ratione laudantium
            fuga qui ipsa commodi dolor vel doloremque labore et dolorum.
            Deserunt earum ea, labore delectus vitae modi necessitatibus sit ab
            molestiae, corrupti officia quia! Nam molestias nemo optio magnam
            obcaecati pariatur tenetur, odio omnis voluptate ducimus magni
            commodi repellat cum natus, necessitatibus voluptatibus culpa sint
            minima suscipit sunt? Veritatis eaque veniam consequatur labore
            unde, molestiae quidem architecto?
          </p>
        </motion.div>
      )}
    </div>
  );
}
