"use client";
import "slick-carousel/slick/slick.css";
import { WelcomeComponent } from "@/components/home/welcome";

import { ExploreComponent } from "../components/home/explore";
import { MainCarroucel } from "@/components/home/mainCarroucel";

import ComodidadeComponent from "@/components/home/comodidades";
import ServicosComponents from "@/components/home/servicos";

export default function Home() {
  return (
    <main
      className={`relative flex flex-col items-center  justify-center gap-y-5 `}
    >
      <MainCarroucel />
      <WelcomeComponent />
      <ComodidadeComponent />
      <ServicosComponents />
      <ExploreComponent />
    </main>
  );
}

{
  /* <SectionComponent>
<div className="flex items-start justify-center w-full h-full">
  <div className="w-[767px] relative h-full flex justify-end items-end">
    <p className=" w-[500px] absolute top-0 right-0">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      tenetur quos consequuntur voluptate quaerat magnam accusantium
      cumque, quo sequi. Exercitationem, quod! Amet eligendi error hic
      ut officia praesentium similique eveniet laboriosam sapiente!
    </p>
  </div>
  <DayAndNightPhotos />
</div>
</SectionComponent> */
}
