import React from "react";
import { homeGridImages } from "../../constants/homeGridImages";
import { ImageGridType } from "@/types";
import GridItemComponent from "./gridItem";
import { orderList } from "@/function/orderGridList";

export function GridComponent() {
  return (
    <div
      className={`relative w-full grid grid-cols-14 grid-rows-8 flex-1 gap-2 pt-20`}
    >
      {orderList(homeGridImages)?.map(
        (gridItem: ImageGridType, index: number) => {
          return (
            <GridItemComponent gridItem={gridItem} index={index} key={index} />
          );
        }
      )}
    </div>
  );
}
