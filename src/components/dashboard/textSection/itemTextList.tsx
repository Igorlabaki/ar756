import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDeleteText } from "@/hook/reactQuery/text/useDeleteText";
import { Text } from "@prisma/client";
import useUpdateText from "@/hook/reactQuery/text/useUpdateText";
import { ModalComponent } from "@/components/modal";
import { CreateTextFormComponent } from "./createTextForm";
import DashboardCardComponent from "@/components/dashboardCard";

interface ItemTextListProps {
  item: Text;
  setFilterTextList: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function ItemTextListComponent({
  item,
  setFilterTextList,
}: ItemTextListProps) {
  const { deleteTextMutate } = useDeleteText();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);

  function handleOpenUpdateModal() {
    setIsUpdateModalOpen(true);
  }
  function handlCloseUpdateModal() {
    setIsUpdateModalOpen(false);
  }

  function handleShowMenu() {
    setIsMenuShow(true);
  }
  function handleHideMenu() {
    setIsMenuShow(false);
  }

  return (
    <div
      className="flex flex-col items-start gap-y-3 justify-center w-full px-5 py-5 bg-[#313338] gap-x-20 text-gray-400 hover:cursor-pointer hover:brightness-125 transition duration-300 rounded-md shadow-lg"
      onMouseOver={handleShowMenu}
      onMouseOut={handleHideMenu}
    >
      <div
        className={`
      ${isMenuShow ? "flex" : "hidden"}
      absolute  items-center justify-center cursor-pointer top-4 right-4 gap-x-3`}
      >
        <AiOutlineEdit
          className="brightness-50 hover:brightness-100 "
          size={20}
          onClick={() => {
            handleOpenUpdateModal();
          }}
        />
        <FaRegTrashAlt
          className="brightness-50 hover:brightness-100 "
          size={14}
          onClick={() => {
            deleteTextMutate(item?.id);
            setFilterTextList(undefined);
          }}
        />
      </div>
      <div className="flex items-center justify-start gap-x-4">
        <p className="text-[18px]">{item?.area}</p>
      </div>
      <p className="text-[16px]">{item?.titulo}</p>
      <div className="text-justify">
        <p>{item?.text}</p>
      </div>
      {isUpdateModalOpen && (
        <ModalComponent onClose={handlCloseUpdateModal}>
          <CreateTextFormComponent mode="UPDATE" text={item} />
        </ModalComponent>
      )}
    </div>
  );
}
