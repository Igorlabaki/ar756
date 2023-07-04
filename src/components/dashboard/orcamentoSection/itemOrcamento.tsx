import { ModalComponent } from "@/components/modal";
import { Orcamento } from "@prisma/client";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { InfoOrcamentoModalComponent } from "./infoOrcamentoModal";
import { GrFormClose } from "react-icons/gr";
import { icon } from "leaflet";
import moment from "moment";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteOrcamento } from "@/hook/reactQuery/orcamento/useOrcamentoText";

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
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
  const { deleteOrcamentoMutate } = useDeleteOrcamento();
  const [isInfoOrcamentoModal, setIsInfoOrcamentoModal] =
    useState<boolean>(false);

  function handleCloseInfoOrcamentoModal() {
    setIsInfoOrcamentoModal(false);
  }
  function handleOpenInfoOrcamentoModal() {
    setIsInfoOrcamentoModal(true);
  }

  function handleShowMenu() {
    setIsMenuShow(true);
  }
  function handleHideMenu() {
    setIsMenuShow(false);
  }

  return (
    <div
      key={item.id}
      className={`flex items-center justify-center w-full px-5 py-5 bg-[#313338] rounded-md gap-x-20 text-[19px] text-text-gray  cursor-pointer shadow-lg ${className} pr-24`}
      onMouseOver={handleShowMenu}
      onMouseOut={handleHideMenu}
    >
      <div className="flex items-center justify-between flex-1">
        <div
          className={`
      ${isMenuShow ? "flex" : "hidden"}
      absolute  items-center justify-center cursor-pointer top-6 right-4 gap-x-3 z-60`}
        >
          <AiOutlineEdit
            className="brightness-50 hover:brightness-100 "
            size={20}
            onClick={() => {}}
          />
          <FaRegTrashAlt
            className="brightness-50 hover:brightness-100 "
            size={14}
            onClick={() => {
              deleteOrcamentoMutate(item.id);
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2 ">
          <p
            className="transition duration-300 hover:underline hover:underline-offset-4"
            onClick={() => {
              handleOpenInfoOrcamentoModal();
            }}
          >
            {item.nome}
          </p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>{moment(item.dataInicio).format("DD/MM/YYYY")}</p>
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
        {isInfoOrcamentoModal && (
          <ModalComponent onClose={handleCloseInfoOrcamentoModal}>
            <InfoOrcamentoModalComponent item={item} />
          </ModalComponent>
        )}
      </div>
    </div>
  );
}
