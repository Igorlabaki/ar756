import React, { useState, useEffect } from "react";
import { ImageGridType } from "@/types";
import { ModalComponent } from "../modal";
import { ImageComponent } from "../image";
import { gridPositionToClasses } from "@/constants/homeGridImages";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CarouselComponent from "../carroucel";

interface GridItemPorps {
  gridItem: ImageGridType;
  index: number;
}

export default function GridItemComponent({ gridItem, index }: GridItemPorps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div
        className={`overflow-hidden rounded-md hover:scale-[1.02] cursor-pointer hover:z-30 duration-300 ${
          gridPositionToClasses[gridItem.gridPosition]
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        <ImageComponent
          alt={gridItem?.alt}
          h={"h-full "}
          w={"w-full"}
          src={gridItem?.url}
          containerClassname={"z-20"}
        />
      </div>
      {isModalOpen && (
        <ModalComponent onClose={handleCloseModal}>
          <CarouselComponent index={gridItem?.position} />
        </ModalComponent>
      )}
    </>
  );
}
