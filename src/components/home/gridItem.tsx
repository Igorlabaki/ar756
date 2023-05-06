import React, { useState, useEffect } from "react";
import { GridPositionToClasses, ImageGridType } from "@/types";
import { ModalComponent } from "../modal";
import { ImageComponent } from "../image";
import { gridPositionToClasses } from "@/constants/homeGridImages";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CarouselComponent from "../carroucel";
import useModalsContext from "@/hook/useModalsContext";

interface GridItemPorps {
  gridItem: ImageGridType;
  index: number;
}

export default function GridItemComponent({ gridItem, index }: GridItemPorps) {
  const [carroucelModalIsOpen, setCarroucelModalIsOpen] =
    useState<boolean>(false);

  function handleOpenCarroucelModal() {
    setCarroucelModalIsOpen(() => true);
  }
  function handleCloseCarroucelModal() {
    setCarroucelModalIsOpen(() => false);
  }

  const gridPositionToClasses: GridPositionToClasses = {
    "col-start-1 col-end-5 row-start-1 row-end-6":
      "col-start-1 col-end-5 row-start-1 row-end-6",
    "col-start-5 col-end-7 row-start-1 row-end-3":
      "col-start-5 col-end-7 row-start-1 row-end-3",
    "col-start-5 col-end-7 row-start-3 row-end-6":
      "col-start-5 col-end-7 row-start-3 row-end-6",
    "col-start-7 col-end-10 row-start-1 row-end-4":
      "col-start-7 col-end-10 row-start-1 row-end-4",
    "col-start-7 col-end-10 row-start-4 row-end-6":
      "col-start-7 col-end-10 row-start-4 row-end-6",
    "col-start-10 col-end-12 row-start-1 row-end-6":
      "col-start-10 col-end-12 row-start-1 row-end-6",
  };

  useEffect(() => {
    if (carroucelModalIsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [carroucelModalIsOpen]);

  return (
    <>
      <div
        className={`overflow-hidden rounded-md  hover:scale-[1.02] cursor-pointer hover:z-30 duration-300 ${
          gridPositionToClasses[gridItem.gridPosition]
        }`}
        onClick={() => handleOpenCarroucelModal && handleOpenCarroucelModal()}
      >
        <ImageComponent
          alt={gridItem?.alt}
          h={"h-full "}
          w={"w-full"}
          src={gridItem?.url}
          containerClassname={" "}
        />
      </div>
      {carroucelModalIsOpen && (
        <ModalComponent
          onClose={handleCloseCarroucelModal}
          styleExternal="bg-black/70 overflow-hidden rounded-md"
          styleInternal="rounded-md"
        >
          <CarouselComponent index={gridItem?.position} />
        </ModalComponent>
      )}
    </>
  );
}
