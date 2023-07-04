import { CiSearch } from "react-icons/ci";
import { Orcamento } from "@prisma/client";
import { BsCheckLg } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { ModalComponent } from "@/components/modal";
import ItemOrcamentoComponent from "./itemOrcamento";
import { ButtonComponent } from "@/components/button";
import ReservaFormComponent from "@/components/home/reservaForm";
import { ListOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";
import { useGetOrcamentoListMutation } from "@/hook/reactQuery/orcamento/useGetOrcamentoListMutation";
import Scrollbars from "react-custom-scrollbars";

export default function OrcamentoSectionComponent() {
  const [menuOption, setMenuOption] = useState<
    "EM ABERTO" | "EM ANALISE" | "CONCLUIDOS"
  >("EM ABERTO");
  const [filterList, setFilterList] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  const [lisOrcamentoParams, setLisOrcamentoParams] =
    useState<ListOrcamentoParams>({
      field: "created_at",
      orderBy: "asc",
    });

  const abertoOptions = menuOption.includes("EM ABERTO");
  const analiseOption = menuOption.includes("EM ANALISE");
  const concluidosOption = menuOption.includes("CONCLUIDOS");

  const { orcamentoListMutation, orcamentoListMutationData } =
    useGetOrcamentoListMutation();

  useEffect(() => {
    orcamentoListMutation(lisOrcamentoParams);
  }, [lisOrcamentoParams, orcamentoListMutation]);

  return (
    <div className="relative flex flex-col w-full h-full min-h-screen px-20 py-20 text-white gap-y-10">
      <div className="flex items-center justify-between w-full text-[17px]">
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            abertoOptions ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setMenuOption("EM ABERTO")}
        >
          EM ABERTO
        </p>
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            analiseOption ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setMenuOption("EM ANALISE")}
        >
          EM ANALISE
        </p>
        <p
          className={`cursor-pointer  hover:brightness-100 transition duration-300 ${
            concluidosOption ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => setMenuOption("CONCLUIDOS")}
        >
          CONCLUIDOS
        </p>
      </div>
      <div className="flex flex-col flex-1 mt-10 gap-y-5">
        <div className="flex flex-wrap gap-10 text-sm font-light ">
          <div
            className="flex items-center justify-center gap-2 text-white cursor-pointer "
            onClick={() => {
              if (lisOrcamentoParams.field === "created_at") {
                setLisOrcamentoParams({ field: "created_at" });
              } else {
                setLisOrcamentoParams({ field: "created_at" });
              }
            }}
          >
            <div
              className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
              tabIndex={0}
            >
              {lisOrcamentoParams.field === "created_at" && <BsCheckLg />}
            </div>
            <p>Data do Orcamento</p>
          </div>
          <div
            className="flex items-center justify-center gap-2 text-white cursor-pointer "
            onClick={() => {
              if (lisOrcamentoParams.field === "dataInicio") {
                setLisOrcamentoParams({ field: "created_at" });
              } else {
                setLisOrcamentoParams({ field: "dataInicio" });
              }
            }}
          >
            <div
              className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
              tabIndex={0}
            >
              {lisOrcamentoParams.field === "dataInicio" && <BsCheckLg />}
            </div>
            <p>Data do Evento</p>
          </div>
          <div
            className="flex items-center justify-center gap-2 text-white cursor-pointer "
            onClick={() => {
              if (lisOrcamentoParams.field === "total") {
                setLisOrcamentoParams({ field: "created_at" });
              } else {
                setLisOrcamentoParams({ field: "total", orderBy: "desc" });
              }
            }}
          >
            <div
              className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
              tabIndex={0}
            >
              {lisOrcamentoParams.field === "total" && <BsCheckLg />}
            </div>
            <p>Valor Total</p>
          </div>
        </div>
        <div className="flex items-center justify-start px-4 py-2 rounded-md outline-none bg-gray-ligth gap-x-2">
          <CiSearch size={20} />
          <input
            type="text"
            className="w-full p-2 bg-transparent bg-gray-200 rounded-md outline-none"
            onChange={(e) => setFilterList(e.target.value)}
          />
        </div>
        <Scrollbars
          style={{ width: "100%", height: 700, gap: 20 }}
          className="p-1"
        >
          <div className="flex flex-col flex-1overflow-hidden gap-y-4">
            {orcamentoListMutationData?.map((item: Orcamento) => {
              if (
                !item?.nome
                  .toLocaleLowerCase()
                  .includes(filterList.toLocaleLowerCase())
              ) {
                return;
              }
              if (menuOption === "EM ABERTO") {
                if (item.aprovadoCliente) {
                  return;
                }
              }
              if (menuOption === "EM ANALISE") {
                if (!item.aprovadoCliente || item.aprovadoAr756) {
                  return;
                }
              }
              if (menuOption === "CONCLUIDOS") {
                if (!item.aprovadoCliente || !item.aprovadoAr756) {
                  return;
                }
              }
              return (
                <ItemOrcamentoComponent
                  item={item}
                  key={item?.id}
                  className="transition duration-300 hover:cursor-pointer hover:brightness-125"
                />
              );
            })}
          </div>
        </Scrollbars>
      </div>
      <ButtonComponent
        title="CRIAR ORCAMENTO"
        className="absolute bottom-0 z-50 flex items-center justify-center py-4 text-white gap-x-2 brightness-50 hover:brightness-100 hover:cursor-pointer left-10 text-[17px]"
        onClick={handleOpenModal}
      />
      {modalIsOpen && (
        <ModalComponent onClose={handleCloseModal}>
          <ReservaFormComponent />
        </ModalComponent>
      )}
    </div>
  );
}
