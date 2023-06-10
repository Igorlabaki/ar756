import { Orcamento } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ItemOrcamentoComponent from "./itemOrcamento";
import { BsCheckLg, BsFillInfoCircleFill } from "react-icons/bs";
import { ListOrcamentoParams } from "@/backend/repository/IOrcamentoRepository";
import { useGetOrcamentoListMutation } from "@/hook/reactQuery/orcamento/useGetOrcamentoListMutation";

export default function OrcamentoSectionComponent() {
  const [menuOption, setMenuOption] = useState<
    "EM ABERTO" | "EM ANALISE" | "CONCLUIDOS"
  >("EM ABERTO");

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
    <div className="flex flex-col w-full h-full min-h-screen px-20 py-20 text-white gap-y-10">
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
        {orcamentoListMutationData?.map((item: Orcamento) => {
          if (menuOption === "EM ABERTO") {
            if (item.aprovado) {
              return;
            }
          }
          if (menuOption === "EM ANALISE") {
            if (!item.aprovado) {
              return;
            }
          }
          return (
            <ItemOrcamentoComponent
              item={item}
              key={item?.id}
              className="hover:cursor-pointer hover:scale-[1.01] hover:brightness-125 transition duration-300"
            />
          );
        })}
      </div>
    </div>
  );
}
