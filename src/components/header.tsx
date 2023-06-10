"use client";
import React from "react";
import { ImageComponent } from "./image";
import { usePathname } from "next/navigation";

export function HeaderComponent() {
  const path = usePathname();
  return (
    <div className="flex items-center justify-start w-full px-3 py-1 md:py-3 lg:px-14">
      {!path.includes("dashboard") && (
        <ImageComponent
          alt={"logo"}
          h={"h-[100px] md:h-[250px] "}
          w={"w-[150px] md:w-[300px]"}
          src={"/images/logo-vila-preto.png"}
          containerClassname={"z-20"}
        />
      )}
    </div>
  );
}
