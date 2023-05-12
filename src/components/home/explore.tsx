import React, { useEffect, useState } from "react";
import { ImageComponent } from "../image";
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
import { ModalComponent } from "../modal";
import { fotos } from "@/constants/fotos";
import { ItemComodidadeComponent } from "../itemComodidade";
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

export function ExploreComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [directtion, setDirecttion] = useState(0);
  const [galeriaModal, setGaleriaModal] = useState(false);
  const [ar756Modal, setAr756Modal] = useState(false);
  const [comodidadesServicosModal, setComodidadesServicosModal] =
    useState(false);
  const [ar756ModalMode, setAr756ModalMode] = useState<"SOBRE" | "REGRAS">(
    "SOBRE"
  );
  const [galeriaModalMode, setGaleriaModalMode] = useState<
    "TODAS" | "AREA EXTERNA" | "SALAO INTERNO" | "SALAO EXTERNO"
  >("TODAS");
  const [comodidadesServicosModalMode, setComodidadesServicosModalMode] =
    useState<"COMODIDADES" | "SERVICOS">("COMODIDADES");

  function handleCloseGaleriaModa() {
    setGaleriaModal(false);
  }
  function handleCloseComodidadeServicoModal() {
    setComodidadesServicosModal(false);
  }

  function handleCloseAr756Modal() {
    setAr756Modal(false);
  }

  function handlePrev() {
    setDirecttion(-1);
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? comentarios.length - 1 : prevSlide - 1
    );
  }

  function handleNext() {
    setDirecttion(1);
    setCurrentSlide((prevSlide) =>
      prevSlide === comentarios.length - 1 ? 0 : prevSlide + 1
    );
  }

  const variants = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? `-100%` : `100%`,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? `100%` : `-100%`,
        opacity: 0,
        transition: { durantion: 1.5, ease: "easeInOut" },
      };
    },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentSlide === comentarios.length - 1) {
        setCurrentSlide(() => 0);
      } else {
        setCurrentSlide((curr) => (curr + 1) % comentarios.length);
      }
    }, 8000); // intervalo de 5 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (galeriaModal || ar756Modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [galeriaModal, ar756Modal]);

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
        <div
          onClick={() => setAr756Modal(true)}
          className="opacity-[1.5] relative w-[400px] h-[400px] flex justify-center items-center text-[24px]  tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden"
        >
          <ImageComponent
            alt={"foto"}
            h={"h-full "}
            w={"w-full"}
            src={"/images/exterior2.jpeg"}
            containerClassname={"z-20"}
          />
          <p className="absolute inset-0 z-40 flex items-center justify-center text-[24px] w-[80%] mx-auto text-center">
            SOBRE E REGRAS
          </p>
        </div>
        <div
          onClick={() => setComodidadesServicosModal(true)}
          className="opacity-[1.5] relativebg-ar756 w-[400px] h-[400px] flex justify-center items-center text-[24px]  tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden"
        >
          <ImageComponent
            alt={"foto"}
            h={"h-full "}
            w={"w-full"}
            src={"/images/guardasol.jpeg"}
            containerClassname={"z-20"}
          />
          <p className="absolute inset-0 z-40 flex items-center justify-center text-[24px] w-[80%] mx-auto text-center">
            COMODIDADES E SERVIÇOS
          </p>
        </div>
        <div
          onClick={() => setGaleriaModal(true)}
          className="opacity-[1.5] relative w-[400px] h-[400px] flex justify-center items-center   tracking-[0.25rem] hover:scale-105 duration-300 brightness-75 hover:brightness-110 cursor-pointer rounded-md overflow-hidden"
        >
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
      <div className="overflow-hidden w-full flex font-semibold  min-h-[100px] max-h-[100px] justify-center items-center">
        <IoIosArrowBack
          size={25}
          className="z-50 mt-5 cursor-pointer"
          onClick={() => handlePrev()}
        />
        <AnimatePresence initial={false}>
          <motion.div
            className="flex flex-col w-full gap-y-3 min-h-[100px]"
            variants={variants}
            animate="animate"
            initial="initial"
            exit={"exit"}
            key={currentSlide}
            custom={directtion}
          >
            <div className="flex flex-col items-center justify-center gap-y-3 text-[20px]">
              <p>{comentarios[currentSlide].username}</p>
              <hr className="text-[#555D2D] w-[15px] my-auto  border-[0.2px] border-[#555D2D]" />
            </div>
            <p className="italic w-[80%] text-[18px] mx-auto text-center ">
              `{comentarios[currentSlide].comentario}`
            </p>
          </motion.div>
        </AnimatePresence>
        <IoIosArrowForward
          size={25}
          className="z-50 mt-5 cursor-pointer "
          onClick={() => {
            handleNext();
          }}
        />
      </div>
      {galeriaModal && (
        <ModalComponent
          onClose={handleCloseGaleriaModa}
          styleExternal="bg-black/70 rounded-sm z-50 "
          styleInternal="rounded-md bg-white overflow-hidden relative overflow-y-scroll relative   w-[900px] flex-shrink h-[900px] z-50 px-10 "
        >
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
            <div className="flex gap-x-5 font-semibold text-[18px] mb-5 ">
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] ${
                  galeriaModalMode.includes("TODAS") &&
                  "after:border-[0.3px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[43px]"
                }`}
                onClick={() => setGaleriaModalMode("TODAS")}
              >
                TODAS
              </p>
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] ${
                  galeriaModalMode.includes("AREA EXTERNA") &&
                  "after:border-[0.3px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[97px]"
                }`}
                onClick={() => setGaleriaModalMode("AREA EXTERNA")}
              >
                AREA EXTERNA
              </p>
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] ${
                  galeriaModalMode.includes("SALAO EXTERNO") &&
                  "after:border-[0.3px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[107px]"
                }`}
                onClick={() => setGaleriaModalMode("SALAO EXTERNO")}
              >
                SALAO EXTERNO
              </p>
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] ${
                  galeriaModalMode.includes("SALAO INTERNO") &&
                  "after:border-[0.3px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[104px]"
                }`}
                onClick={() => setGaleriaModalMode("SALAO INTERNO")}
              >
                SALAO INTERNO
              </p>
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
                  <div key={item.url} className="overflow-hidden rounded-sm ">
                    <ImageComponent
                      alt={item.alt}
                      h={"h-[200px]"}
                      w={"w-[395px]"}
                      src={`/images/${item.url}`}
                      containerClassname={"z-20 rounded-md"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </ModalComponent>
      )}
      {comodidadesServicosModal && (
        <ModalComponent
          onClose={handleCloseComodidadeServicoModal}
          styleExternal="bg-black/70 rounded-sm z-50 "
          styleInternal="rounded-md bg-white overflow-hidden relative overflow-y-scroll relative   w-[900px] flex-shrink h-[900px] z-50 px-10 "
        >
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
            <div className="flex gap-x-5 font-semibold text-[18px] mb-5 ">
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] ${
                  comodidadesServicosModalMode.includes("COMODIDADES") &&
                  "after:border-[0.3px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[96px]"
                }`}
                onClick={() => setComodidadesServicosModalMode("COMODIDADES")}
              >
                COMODIDADES
              </p>
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  text-[13px] ${
                  comodidadesServicosModalMode.includes("SERVICOS") &&
                  "after:border-[0.3px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[58px]"
                }`}
                onClick={() => setComodidadesServicosModalMode("SERVICOS")}
              >
                SERVICOS
              </p>
            </div>
            {comodidadesServicosModalMode.includes("COMODIDADES") && (
              <div className="flex flex-col items-center justify-center w-full gap-x-10 ">
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  amet assumenda voluptates a, blanditiis temporibus animi
                  itaque odio error aliquid dolor architecto. Excepturi
                  blanditiis maxime earum laudantium neque nulla maiores odit
                  quos numquam magni distinctio tenetur laboriosam, quaerat cum
                  nam consequuntur facilis ratione ullam perspiciatis, iusto
                  repellendus quod quia quisquam provident? Provident neque
                  ipsum, temporibus odit nulla maxime repellat inventore quidem
                  facere beatae qui facilis quasi dolorum! Quas provident,
                  dolores, suscipit hic libero quam illum distinctio, error quo
                  sed vitae quos reprehenderit iure perferendis ratione
                  laudantium fuga qui ipsa commodi dolor vel doloremque labore
                  et dolorum. Deserunt earum ea, labore delectus vitae modi
                  necessitatibus sit ab molestiae, corrupti officia quia! Nam
                  molestias nemo optio magnam obcaecati pariatur tenetur, odio
                  omnis voluptate ducimus magni commodi repellat cum natus,
                  necessitatibus voluptatibus culpa sint minima suscipit sunt?
                  Veritatis eaque veniam consequatur labore unde, molestiae
                  quidem architecto?
                </p>
              </div>
            )}
            {comodidadesServicosModalMode.includes("SERVICOS") && (
              <div className="flex flex-col items-center justify-center w-full gap-x-10 ">
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  amet assumenda voluptates a, blanditiis temporibus animi
                  itaque odio error aliquid dolor architecto. Excepturi
                  blanditiis maxime earum laudantium neque nulla maiores odit
                  quos numquam magni distinctio tenetur laboriosam, quaerat cum
                  nam consequuntur facilis ratione ullam perspiciatis, iusto
                  repellendus quod quia quisquam provident? Provident neque
                  ipsum, temporibus odit nulla maxime repellat inventore quidem
                  facere beatae qui facilis quasi dolorum! Quas provident,
                  dolores, suscipit hic libero quam illum distinctio, error quo
                  sed vitae quos reprehenderit iure perferendis ratione
                  laudantium fuga qui ipsa commodi dolor vel doloremque labore
                  et dolorum. Deserunt earum ea, labore delectus vitae modi
                  necessitatibus sit ab molestiae, corrupti officia quia! Nam
                  molestias nemo optio magnam obcaecati pariatur tenetur, odio
                  omnis voluptate ducimus magni commodi repellat cum natus,
                  necessitatibus voluptatibus culpa sint minima suscipit sunt?
                  Veritatis eaque veniam consequatur labore unde, molestiae
                  quidem architecto?
                </p>
              </div>
            )}
          </div>
        </ModalComponent>
      )}
      {ar756Modal && (
        <ModalComponent
          onClose={handleCloseAr756Modal}
          styleExternal="bg-black/70 rounded-sm z-50 "
          styleInternal="rounded-md bg-white overflow-hidden relative overflow-y-scroll   w-[900px] flex-shrink h-[900px] z-50 px-10 "
        >
          <div className="w-full">
            <GrFormClose
              className="absolute rounded-full cursor-pointer right-2 top-2 hover:bg-gray-200"
              onClick={handleCloseAr756Modal}
            />
            <ImageComponent
              alt={"logo"}
              h={"h-[180px]"}
              w={"w-[250px]"}
              src={`/images/logo-vila-preto.png`}
              containerClassname={"z-20 rounded-md -ml-2  "}
            />
            <div className="flex gap-x-5 font-semibold text-[13px] mb-10">
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  ${
                  ar756ModalMode.includes("SOBRE") &&
                  "after:border-[1px] after:border-black after:absolute after:bottom-0 after:left-0 after:w-[39px]"
                }`}
                onClick={() => setAr756ModalMode("SOBRE")}
              >
                SOBRE
              </p>
              <p
                className={`relative cursor-pointer tracking-[0.10rem]  ${
                  ar756ModalMode.includes("REGRAS") &&
                  "after:border-[1px] after:border-black text-[13px] after:absolute after:bottom-0 after:left-0 after:w-[47px]"
                }`}
                onClick={() => setAr756ModalMode("REGRAS")}
              >
                REGRAS
              </p>
            </div>
          </div>
          {ar756ModalMode.includes("SOBRE") && (
            <div className="flex flex-col items-start justify-center gap-x-3">
              <div className="flex flex-col ">
                <p className="text-justify">
                  A AR756 possui um amplo com jardim e piscina, arquitetura
                  contemporânea, muito bem conservado. Iluminado e arejado com
                  muito espaço para tirarem fotos incríveis, gravar clipes,
                  também para realização de eventos e workshops !! No meio de um
                  jardim natural incrível, com piscina, e dois estúdios ( Galpão
                  e Salão ) sem pernoite ! Lugar incrível e cheio de estilo. O
                  valor da locação não inclui pernoite e está limitada a 8
                  pessoas no total; para eventos e produções maiores este valor
                  base é apenas referência.
                </p>
                <div className="flex flex-col mt-4 gap-y-3">
                  <p className="font-semibold text-[18px]">O ESPACO</p>
                  <div className="text-justify">
                    São dois espaços cobertos no térreo com pé direito duplo ( 5
                    e 7 metros ) com dois banheiros junto a piscina e
                    churrasqueira. Encontrará ainda na área junto à
                    churrasqueira, cozinha equipada com geladeira, fogão e
                    microondas. A área total é de cerca de 600 metros. Mais
                    informações na sessão Regras da Casa.
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-y-3">
                  <p className="font-semibold text-[18px]">
                    ACESSO DOS HOSPEDES
                  </p>
                  <div className="text-justify">
                    A parte superior só poderá ser usada para serem tiradas
                    fotos exclusivamente mediante prévia solicitação e
                    autorização. Leia as Regras da Casa antes de enviar sua
                    consulta, lá se esclarecem a maioria das dúvidas e sua
                    leitura é fundamental.
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-y-3">
                  <p className="font-semibold text-[18px]">
                    OUTRAS COISAS A TER EM CONTA
                  </p>
                  <div className="text-justify">
                    Eventos estão permitidos entretanto o valor terá de ser
                    negociado em função do tipo de evento, quantidade de
                    pessoas, horário e etc, portanto para obter uma cotação para
                    o seu evento, envie na primeira mensagem informações como
                    número total de pessoas, horário desejado e tipo de evento;
                    ( a base de cálculo para uma idéia concreta de valor é de
                    100 reais por pessoa acrescidos à tarifa padrão acima de 08
                    pessoas ) Moro na casa e estou presente no checkin e
                    checkout. Ao reservar você declara ter lido e aceito as
                    Regras da Casa!
                  </div>
                </div>
                <p className="text-lg text-[16px] font-semibold mt-10">
                  Faça Sua Reserva Hoje e Desfrute de um Espaço Incrível
                </p>
              </div>
            </div>
          )}
          {ar756ModalMode.includes("REGRAS") && (
            <div className="flex flex-col gap-y-2">
              <p className="text-justify">
                <strong>1.</strong> A diária compreende o período de 8 horas, e
                decorre em horário comercial, podendo ter início a partir das 9
                horas da manhã, devendo o encerramento ser até no máximo às 18
                horas, sempre do mesmo dia. Solicitações para outros horários
                deverão ser cotadas, sob consulta, mas nunca passamos das 22h.
              </p>
              <p className="text-justify">
                <strong>2. </strong> O seu check out não é a meia noite, esta
                informação no itinerário “antes da 00h” significa que a reserva
                encerra no mesmo dia, o horário pré acordado nas mensagens será
                o horário que terá de respeitar, portanto se a sua diária for
                combinada por exemplo das 10-18h, independente do horário que
                você chegue, as 18h a casa deverá estar liberada. Organize-se
                para encerrar com alguma antecedência e realizar o check out até
                o horário acordado.
              </p>
              <p className="text-justify">
                <strong>3. </strong> O valor base não inclui o uso da piscina e
                churrasqueira, nem autoriza festas e/ou reuniões
                confraternizações com consumo de bebidas alcóolicas, atende
                somente corporativo. Demais solicitações serão estudadas e
                orçadas caso a caso. Não inclui qualquer tipo de equipamento. (
                Luz, Som, etc ) Para eventos é necessário consultar valor,
                indicando o tipo de evento, o número de convidados, número de
                horas ( indicar hrs de início e fim ) etc;
              </p>
              <p className="text-justify">
                <strong>4.</strong> Moro na casa e estou presente no checkin e
                checkout. Como pré condição, será necessário enviar scan/photo
                da página de identificação de seu(s) passaporte(s) ou
                documento(s) de identidade até 1 dia antes da sua chegada. Ao
                finalizar sua diária, será necessário recolher todos os seus
                pertences e providenciar a limpeza e retirada de lixos.
              </p>
              <p className="text-justify">
                <strong>5.</strong> NÃO É PERMITIDO DEIXAR NENHUM OBJETO APÓS
                TER FINALIZADO A DIÁRIA. Ao finalizar o seu trabalho, todos os
                pertences devem ser recolhidos; a permanência de produtos e
                equipamentos fotográficos, roupas, fundos, e/ou quaisquer
                objetos que ficarem no espaço , será cobrada como diária, até a
                retirada dos mesmos.
              </p>
              <p className="text-justify">
                <strong>6.</strong> Caso sejam movimentados os móveis que compõe
                a decoração da propriedade; os mesmos deverão obrigatoriamente
                ser retornados exatamente aos mesmos locais em que estavam, sob
                pena de multa no valor de 250 reais caso não sejam reorganizados
                conforme estavam na sua chegada; portanto se for tirar algo do
                lugar será responsável por devolver exatamente onde estava.
              </p>
              <p className="text-justify">
                <strong>7.</strong> Não fume, coma ou beba nos sofás, também é
                desnecessário dizer que não deverá em hipótese alguma subir
                neles , sentar estando molhado, ou retirar suas almofadas e
                colocar no chão afinal eles são brancos, caso sejam sujos será
                cobrada lavagem especializada de tecidos que tem o valor de 500
                reais, e caso sejam danificados, furados, ou as manchas não
                sejam removíveis o hóspede arcará com o custo da troca do
                estofamento total o que é bastante oneroso em se tratando de
                móveis de alto padrão, portanto tenha respeito pelo patrimônio a
                si disponibilizado e cuide para que as pessoas que estão contigo
                também tenham cuidado para não causar quaisquer danos que possam
                ser a si atribuídos e portanto cobrados.
              </p>
              <p className="text-justify">
                <strong>8.</strong> É proibido entrar na piscina com óleo
                bronzeador, colocar dentro dela quaisquer móveis e beber ou
                fumar estando dentro dela, também é proibido a utilização de
                acessórios metálicos pois estes podem causar danos ao casco.
              </p>
              <p className="text-justify">
                <strong>9.</strong> A não desocupação do espaço nas condições
                estabelecidas acima, até o horário acordado durante a troca de
                mensagens na plataforma, ensejará pagamento adicional de mil
                reais por hora adicional, condição esta inegociável, portanto
                organize-se para liberar o espaço livre e desembaraçado,
                organizado e limpo até o horário firmado ou você será cobrado
                pelo período adicional sem prejuízo de demais medidas. Caso você
                se atrase para o check in não poderá compensar no check out,
                organize-se para cumprir os horários previamente negociados.
                Você que leu até aqui, obrigado, é importante pois reforça seu
                cuidado com o que cuidadosamente lhe oferecemos.
              </p>
              <p className="text-lg text-[16px] font-semibold mb-10">
                Esperamos proporcionar uma experiência incrível, aguardamos sua
                reserva!
              </p>
            </div>
          )}
        </ModalComponent>
      )}
    </div>
  );
}
