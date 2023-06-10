import { Image } from "@prisma/client";
import React, { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { ImageComponent } from "@/components/image";
import { ModalComponent } from "@/components/modal";
import useAddNewImage from "@/hook/reactQuery/image/useCreateImage";
import useGetimagesList from "@/hook/reactQuery/image/useGetImagesList";
import { CreateImageFormComponent } from "./createImageForm";

export default function ImageSectionComponent() {
  const { imageList } = useGetimagesList();

  const [isAddImageModalOpen, setIsAddImageModalOpen] =
    useState<boolean>(false);

  function handleCloseAddImageModal() {
    setIsAddImageModalOpen(false);
  }
  function handleOpenAddImageModal() {
    setIsAddImageModalOpen(true);
  }

  return (
    <div className="flex flex-wrap items-start justify-start gap-3 px-20 py-10">
      <div
        className="w-[373px] h-[200px] bg-[#313338] rounded-md 
      flex justify-center items-center cursor-pointer hover:brightness-125 
      transition-all duration-300"
        onClick={handleOpenAddImageModal}
      >
        <TbPhotoPlus size={50} className="text-[#1E1F22]" />
      </div>
      {imageList?.map((image: Image) => {
        return (
          <div key={image.id} className="overflow-hidden rounded-md">
            <ImageComponent
              alt={image.legenda}
              h={"h-[200px]"}
              w={"w-[373px]"}
              src={`data:image/jpeg;base64, ${image.imageUrl}`}
              containerClassname={"z-20"}
            />
          </div>
        );
      })}
      {isAddImageModalOpen && (
        <ModalComponent onClose={handleCloseAddImageModal}>
          <CreateImageFormComponent />
        </ModalComponent>
      )}
    </div>
  );
}
