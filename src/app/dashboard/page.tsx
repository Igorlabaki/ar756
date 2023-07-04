"use client";

import { BiText } from "react-icons/bi";
import React, { ReactNode, useState } from "react";
import { ImageComponent } from "@/components/image";
import TextDashboardComponent from "@/components/dashboard/textSection";
import NavigationItemComponent from "@/components/dashboard/navigationItem";
import CalendarSectionComponent from "@/components/dashboard/calendarSection";
import OrcamentoSectionComponent from "@/components/dashboard/orcamentoSection";
import ImagesDashboardComponent from "@/components/dashboard/imagesSection/imagesDashboard";
import {
  AiFillCamera,
  AiFillHome,
  AiOutlineCalendar,
  AiOutlineFileText,
} from "react-icons/ai";

export default function DashBoardPage() {
  const [menuOption, setMenuOption] = useState<
    "HOME" | "IMAGES" | "TEXTS" | "VALUES"
  >("HOME");

  const homeOption = menuOption.includes("HOME");
  const textsOptions = menuOption.includes("TEXTOS");
  const imagesOptions = menuOption.includes("IMAGES");
  const bugdetOption = menuOption.includes("ORCAMENTOS");
  const calendarOption = menuOption.includes("CALENDARIO");

  const navigationItems = [
    { title: "HOME", icon: <AiFillHome size={30} />, isOpen: homeOption },
    {
      title: "IMAGES",
      icon: <AiFillCamera size={30} />,
      isOpen: imagesOptions,
    },
    { title: "TEXTOS", icon: <BiText size={30} />, isOpen: textsOptions },
    {
      title: "ORCAMENTOS",
      icon: <AiOutlineFileText size={30} />,
      isOpen: bugdetOption,
    },
    {
      title: "CALENDARIO",
      icon: <AiOutlineCalendar size={30} />,
      isOpen: calendarOption,
    },
  ];

  return (
    <div className="flex w-full h-screen ">
      <div className=" w-[20%] flex flex-col justify-start items-center h-full gap-y-10 pl-10 bg-gray-dark">
        <ImageComponent
          alt={"logo"}
          h={"h-[200px] "}
          w={"w-[200px]"}
          src={"/images/logo-vila-branco.png"}
        />
        {navigationItems.map(
          (
            item: { title: any; icon: ReactNode; isOpen: boolean },
            index: number
          ) => {
            return (
              <NavigationItemComponent
                title={item.title}
                key={index}
                isOpen={item.isOpen}
                setMenuOption={setMenuOption}
                icon={item.icon}
              />
            );
          }
        )}
      </div>
      <div className="flex-1 bg-gray-reg">
        {textsOptions && <TextDashboardComponent />}
        {bugdetOption && <OrcamentoSectionComponent />}
        {imagesOptions && <ImagesDashboardComponent />}
        {calendarOption && <CalendarSectionComponent />}
      </div>
    </div>
  );
}
