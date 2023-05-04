"use client";
import React from "react";
import { ImageComponent } from "./image";

export function HeaderComponent() {
  return (
    <div className="flex items-center justify-start w-full px-3 py-1 md:py-3 lg:px-14">
      <ImageComponent
        alt={"logo"}
        h={"h-[100px] md:h-[150px] "}
        w={"w-[150px] md:w-[200px]"}
        src={"/images/logo-vila-preto.png"}
        containerClassname={"z-20"}
      />
    </div>
  );
}
