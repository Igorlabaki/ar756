import { ModalComponent } from "@/components/modal";
import { Orcamento } from "@prisma/client";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { InfoOrcamentoModalComponent } from "./infoOrcamentoModal";
import { GrFormClose } from "react-icons/gr";
import { icon } from "leaflet";

interface ItemOrcamentoProps {
  item: Orcamento;
  className?: string;
  icon?: React.ReactNode;
}

export default function ItemOrcamentoComponent({
  item,
  icon,
  className,
}: ItemOrcamentoProps) {
  const [isInfoOrcamentoModal, setIsInfoOrcamentoModal] =
    useState<boolean>(false);

  function handleCloseInfoOrcamentoModal() {
    setIsInfoOrcamentoModal(!isInfoOrcamentoModal);
  }
  function handleOpenInfoOrcamentoModal() {
    setIsInfoOrcamentoModal(true);
  }

  return (
    <div
      key={item.id}
      className={`flex items-center justify-center w-full px-5 py-5 bg-[#313338] rounded-md gap-x-20 text-[19px] text-text-gray  cursor-pointer shadow-lg ${className}`}
      onClick={handleOpenInfoOrcamentoModal}
    >
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col gap-y-2">
          <p>{item.nome}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>{item.dataInicio}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <CurrencyFormat
            value={item.total}
            displayType={"text"}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"R$ "}
          />
        </div>
      </div>
      {icon ? icon : <BsFillInfoCircleFill />}
      {isInfoOrcamentoModal && (
        <ModalComponent
          onClose={handleCloseInfoOrcamentoModal}
          styleInternal="z-50"
        >
          <InfoOrcamentoModalComponent item={item} />
        </ModalComponent>
      )}
    </div>
  );
}
