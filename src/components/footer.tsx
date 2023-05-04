"use client";
import React from "react";
import {
  TbBrandAirbnb,
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandWhatsapp,
} from "react-icons/tb";
import AnchorComponent from "@/components/anchor";
import { Exo, Kumbh_Sans } from "next/font/google";
import { ImageComponent } from "./image";

const exu = Exo({ subsets: ["latin"] });

export default function FooterComponent() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-32 py-10 bg-zinc-900 md:items-start md:px-10 gap-y-3">
      <div className="flex flex-col items-center justify-center w-full text-white md:flex-row md:justify-between">
        <ImageComponent
          alt={"logo-branco"}
          h={"h-[100px]"}
          w={"w-[150px]"}
          src={"/images/logo-vila-branco.png"}
          containerClassname="z-50"
        />
        <div>
          <p className="text-[#9A947F] text-[14px] font-bold">CONTACT US:</p>
        </div>
        <div className="flex gap-x-2 ">
          <AnchorComponent
            href="https://api.whatsapp.com/send/?phone=351910452428&text&type=phone_number&app_absent=0"
            icon={
              <TbBrandWhatsapp
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /* bgColor="bg-[#FF5A5F]" */
          />
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandAirbnb className="text-white cursor-pointer" size={30} />
            }
            /* bgColor="bg-[#FF5A5F]" */
          />
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandFacebook
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /*    bgColor=" bg-[#3b5998]" */
          />
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandInstagram
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /* bgColor="bg-insta-gradient" */
          />
        </div>
      </div>
    </footer>
  );
}
