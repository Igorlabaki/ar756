import React from "react";
import {
  TbBrandAirbnb,
  TbBrandFacebook,
  TbBrandInstagram,
} from "react-icons/tb";
import AnchorComponent from "@/components/anchor";
import { Exo } from "next/font/google";

const exu = Exo({ subsets: ["latin"] });

export default function FooterComponent() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-32 py-10 bg-black md:items-start md:px-10 gap-y-3">
      <p
        className={`
       ${exu.className}
       text-white
       font-semibold
       text-2xl
    `}
      >
        AR756_
      </p>
      <div className="flex flex-col items-center justify-center w-full text-white md:flex-row md:justify-between">
        <div>
          <p className="text-[#9A947F] text-[14px] font-bold">CONTACT US:</p>
        </div>
        <div className="flex gap-x-2 ">
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandAirbnb className="text-white cursor-pointer" size={30} />
            }
            bgColor="bg-[#FF5A5F]"
          />
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandFacebook
                className="text-white cursor-pointer"
                size={30}
              />
            }
            bgColor=" bg-[#3b5998]"
          />
          <AnchorComponent
            href="https://www.instagram.com/ar756_/"
            icon={
              <TbBrandInstagram
                className="text-white cursor-pointer"
                size={30}
              />
            }
            bgColor="bg-insta-gradient"
          />
        </div>
      </div>
    </footer>
  );
}
