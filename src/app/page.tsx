"use client";
import "slick-carousel/slick/slick.css";
import { ModalComponent } from "@/components/modal";
import useModalsContext from "@/hook/useModalsContext";
import ServicosComponents from "@/components/home/servicos";
import { WelcomeComponent } from "@/components/home/welcome";
import { ExploreComponent } from "../components/home/explore";
import { MainCarroucel } from "@/components/home/mainCarroucel";
import ComodidadeComponent from "@/components/home/comodidades";
import ReservaFormComponent from "@/components/home/reservaForm";

export default function Home() {
  const { reservaModalIsOpen, handleCloseReservaModal } = useModalsContext();
  return (
    <main
      className={`relative flex flex-col items-center  justify-center gap-y-5 `}
    >
      <MainCarroucel />
      <WelcomeComponent />
      <ComodidadeComponent />
      <ServicosComponents />
      <ExploreComponent />
      {reservaModalIsOpen && (
        <ModalComponent onClose={handleCloseReservaModal}>
          <ReservaFormComponent />
        </ModalComponent>
      )}
    </main>
  );
}
