import moment from "moment";
import { SlPeople } from "react-icons/sl";
import FullCalendar from "@fullcalendar/react";
import { EventInfo, IDataEvent } from "@/types";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";
import { CreateDateComponent } from "./createDate";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalComponent } from "@/components/modal";
import { ButtonComponent } from "@/components/button";
import interactionPlugin from "@fullcalendar/interaction";
import useGetDateList from "@/hook/reactQuery/date/useGetDateList";
import { useDeleteData } from "@/hook/reactQuery/date/useDeleteDate";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useGetDataById } from "@/hook/reactQuery/date/useGetDataById";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import UseCreateDateFormHooks from "@/formHooks/createDateEventFormHooks";
import { useGetOrcamentoById } from "@/hook/reactQuery/orcamento/useGetOrcamentoById";

export default function CalendarSectionComponent() {
  const { dateList } = useGetDateList();
  const { deleteDataMutate } = useDeleteData();
  const { orcamentoByidMutate, orcamentoByid } = useGetOrcamentoById();
  const { dataByidMutate, dataByid } = useGetDataById();
  const [eventInfo, setEventInfo] = useState<EventInfo>();
  const [filterList, setFilterList] = useState<any[]>([]);

  const { reset, setValue, dataWatch, handleSubmit, handleOnSubmit } =
    UseCreateDateFormHooks();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [createDataModalIsOpen, setCreateDataModalIsOpen] =
    useState<boolean>(false);

  function handleCloseModal() {
    setFilterList([]);
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCreateDateCloseModal() {
    setCreateDataModalIsOpen(false);
    reset();
  }

  function handleCreateDateOpenModal() {
    setCreateDataModalIsOpen(true);
  }

  const events = dateList?.map((item: IDataEvent) => {
    return {
      end: item.dataFim,
      title: item.titulo,
      start: item.dataInicio,
      extendedProps: {
        additionalInfo: {
          dataId: item?.id,
          resourceId: item?.tipo,
          tipoEvento: item?.tipo,
          nome: item?.orcamento?.nome,
          orcamentoId: item?.orcamentoId,
        },
      },
    };
  });

  useEffect(() => {
    if (eventInfo) {
      dataByidMutate(eventInfo?.extendedProps?.additionalInfo?.dataId);
      /*       orcamentoByidMutate(
        eventInfo?.extendedProps?.additionalInfo?.orcamentoId
      ); */
    }
  }, [eventInfo]);

  function renderEventContent(eventInfo: any) {
    const resourceId = eventInfo.event.extendedProps.additionalInfo.resourceId;

    const resource = eventInfo.view.calendar.getResourceById(resourceId);

    return (
      <div
        className={`
        ${resource?.extendedProps.backgroundColor}
        ${resource?.extendedProps.textColor}
        flex flex-col items-start justify-start w-full h-full px-2 py-1 rounded-md gap-x-3`}
      >
        <b className="text-white">{eventInfo.timeText}</b>
        <i className="text-white">{eventInfo.event.title}</i>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen px-10 py-10 mb-10 text-white ">
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        headerToolbar={{
          left: "prev, next, today",
          center: "title",
          right: "dayGridMonth, timeGridWeek",
        }}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          resourceTimelinePlugin,
        ]}
        initialView="dayGridMonth"
        eventClick={(eventInfo: any) => {
          handleOpenModal();
          setEventInfo(eventInfo.event);
        }}
        weekends={true}
        events={events}
        resources={[
          {
            id: "Visita",
            backgroundColor: "bg-green-600",
            textColor: "#ffffff",
          },
          {
            id: "Evento",
            backgroundColor: "bg-blue-600",
            textColor: "#ffffff",
          },
          /*           {
            id: "Recorrent",
            backgroundColor: "bg-purple-800",
            textColor: "#ffffff",
          }, */
          {
            id: "Outros",
            backgroundColor: "bg-yellow-800",
            textColor: "#ffffff",
          },
        ]}
        selectable={true}
        dateClick={(data) => {}}
        height={"90vh"}
        eventContent={renderEventContent}
      />
      <ButtonComponent
        title="CRIAR DATA"
        className="absolute bottom-0 z-50 flex items-center justify-center py-4 text-white gap-x-2 brightness-50 hover:brightness-100 hover:cursor-pointer left-10 text-[17px]"
        onClick={handleCreateDateOpenModal}
      />
      {modalIsOpen && (
        <ModalComponent onClose={handleCloseModal}>
          <div className="z-50 flex flex-col gap-y-3 px-5 py-10 bg-white  w-[500px] rounded-md overflow-hidden relative h-full">
            <p className="font-semibold text-[20px] w-full text-center">
              {dataByid?.titulo}
            </p>
            {dataByid?.orcamento ? (
              <div className="flex items-center justify-center w-full gap-x-5">
                <div className="flex items-center justify-center gap-x-2">
                  <SlPeople size={20} />
                  <p className="text-sm">({dataByid?.orcamento?.convidados})</p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineClockCircle size={20} />
                  <p className="text-sm">
                    {`${moment(dataByid?.orcamento?.dataInicio)
                      .utcOffset(0)
                      .format("HH:mm")} - ${moment(dataByid?.orcamento?.dataFim)
                      .utcOffset(0)
                      .format("HH:mm")}  `}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineCalendar size={20} />
                  <p className="text-sm">
                    (
                    {moment(dataByid?.orcamento?.dataInicio).format(
                      "DD/MM/YYYY"
                    )}
                    )
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full gap-x-5">
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineClockCircle size={20} />
                  <p className="text-sm">
                    {`${moment(dataByid?.dataInicio)
                      .utcOffset(0)
                      .format("HH:mm")} - ${moment(dataByid?.dataFim)
                      .utcOffset(0)
                      .format("HH:mm")}  `}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineCalendar size={20} />
                  <p className="text-sm">
                    ({moment(dataByid?.dataInicio).format("DD/MM/YYYY")})
                  </p>
                </div>
              </div>
            )}
            {dataByid && (
              <div className="text-[18px] w-full flex justify-center items-center mt-10 gap-x-4">
                <p>Whatsapp:</p>
                <p>{dataByid?.orcamento?.telefone}</p>
              </div>
            )}
            <div className="flex items-center justify-center w-full mt-10 gap-x-4">
              <ButtonComponent
                title="DELETAR"
                className=" z-50 flex items-center justify-center py-4 text-black gap-x-2  hover:bg-gray-100 hover:scale-105  duration-300 rounded-md hover:cursor-pointer text-[17px] w-[200px]"
                onClick={() => {
                  deleteDataMutate(dataByid?.id);
                  handleCloseModal();
                }}
              />{" "}
              <ButtonComponent
                title="EDITAR"
                className=" z-50 flex items-center justify-center py-4 text-black gap-x-2  hover:bg-gray-100 hover:scale-105  duration-300 rounded-md hover:cursor-pointer text-[17px] w-[200px]"
                onClick={handleCreateDateOpenModal}
              />
            </div>
          </div>
        </ModalComponent>
      )}
      {createDataModalIsOpen && (
        <ModalComponent
          onClose={handleCreateDateCloseModal}
          styleInternal="relative"
        >
          <CreateDateComponent />
        </ModalComponent>
      )}
    </div>
  );
}

{
  /* <div>
<div className="flex items-center justify-start w-full mb-5 gap-x-3">
  <p className="font-semibold">Data:</p>
  <p>{dataWatch && formatarData(dataWatch)}</p>
</div>
{filterList.length === 0 ? (
  <div className="flex items-center justify-center w-full py-5">
    <p>Nao ha nenhum evento para hoje!</p>
  </div>
) : (
  filterList.map((item: any) => {
    const eventStartHour = item.start.getHours();
    const eventStartMinutes = item.start.getMinutes();

    const formatStartDate = `${eventStartHour}:${
      eventStartMinutes === 30
        ? eventStartMinutes
        : `${eventStartMinutes}0`
    }`;

    const eventEndHour = item.end.getHours();
    const eventEndMinutes = item.end.getMinutes();
    const formatEndDate = `${eventEndHour}:${
      eventEndMinutes === 30
        ? eventEndMinutes
        : `${eventEndMinutes}0`
    }`;

    return (
      <div
        key={item?.title}
        className="flex flex-col items-start justify-start w-full gap-x-3"
      >
        <p className="font-semibold">{item?.title}</p>
        <div className="flex items-center justify-start gap-x-2">
          <p>Comeca as</p>
          <p>{formatStartDate}</p>
          <p>/</p>
          <p>Termina as</p>
          <p>{formatEndDate}</p>
        </div>
      </div>
    );
  })
)}
</div> */
}
