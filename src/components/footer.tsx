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
import MapComponent from "./map";
import { FaTiktok } from "react-icons/fa";

const exu = Exo({ subsets: ["latin"] });

export default function FooterComponent() {
  return (
    <footer className="flex flex-col items-center justify-center w-full bg-zinc-900 md:items-start">
      <MapComponent />
      <div className="flex flex-col items-center justify-center w-full h-[138px]  text-white  md:flex-row md:justify-between overflow-hidden ">
        <div className="relative">
          <ImageComponent
            alt={"logo-branco"}
            h={"h-[100px]"}
            w={"w-[300px]"}
            src={"/images/LOGO-VILA-BRANCO_SOMBRA.png"}
            containerClassname="z-50 ml-5"
          />
          <div className="absolute -mt-[120px]">
            <ImageComponent
              alt={"logo-branco"}
              h={"h-[138px]"}
              w={"w-[499px]"}
              src={"/images/tijolinho-footer.png"}
              containerClassname="z-20"
            />
          </div>
        </div>
        <div className="flex mr-5 gap-x-2 ">
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
            href="https://www.facebook.com/profile.php?id=100085832906065"
            icon={
              <TbBrandFacebook
                className="text-white cursor-pointer"
                size={30}
              />
            }
            /*    bgColor=" bg-[#3b5998]" */
          />
          <AnchorComponent
            href="https://www.tiktok.com/@ar756_"
            icon={<FaTiktok className="text-white cursor-pointer" size={30} />}
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
