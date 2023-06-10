import { DateEvent } from "@prisma/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";
import { CreateDateComponent } from "./createDate";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ModalComponent } from "@/components/modal";
import { ButtonComponent } from "@/components/button";
import { formatarData } from "@/function/formatarData";
import interactionPlugin from "@fullcalendar/interaction";
import useGetDateList from "@/hook/reactQuery/date/useGetDateList";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import UseCreateDateFormHooks from "@/formHooks/createDateEventFormHooks";
import { IDataEvent } from "@/types";

export default function CalendarSectionComponent() {
  const { dateList } = useGetDateList();
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
    const [yearInicio, monthInicio, dayInicio] = item?.data?.split("-");
    const [hourInicio, minutesInicio] = item?.horarioInicio?.split(":");
    const [hourFim, minutesFim] = item?.horarioFim?.split(":");
    const dateStart = new Date(
      parseInt(yearInicio),
      parseInt(monthInicio) - 1,
      parseInt(dayInicio),
      parseInt(hourInicio),
      parseInt(minutesInicio)
    );
    const [yearFim, monthFim, dayFim] = item?.data?.split("-");
    const dateEnd = new Date(
      parseInt(yearFim),
      parseInt(monthFim) - 1,
      parseInt(dayFim),
      parseInt(hourFim),
      parseInt(minutesFim)
    );
    return {
      title: item.titulo,
      start: new Date(dateStart),
      end: new Date(dateEnd),
      extendedProps: {
        additionalInfo: {
          resourceId: item?.tipo,
          nome: item?.orcamento?.nome,
          tipoEvento: item?.tipo,
          orcamentoId: item?.orcamentoId,
        },
      },
    };
  });

  function renderEventContent(eventInfo: any) {
    const resourceId = eventInfo.event.extendedProps.additionalInfo.resourceId;

    const resource = eventInfo.view.calendar.getResourceById(resourceId);

    return (
      <div
        className={`
        ${resource.extendedProps.backgroundColor}
        ${resource.extendedProps.textColor}
        flex items-start justify-start w-full px-2 py-1 rounded-md gap-x-3`}
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
        eventClick={(e) => handleOpenModal()}
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
          {
            id: "Outros",
            backgroundColor: "bg-yellow-800",
            textColor: "#ffffff",
          },
        ]}
        selectable={true}
        dateClick={(data) => {
          const calendarApi = data.view;
          const calendarEvents = calendarApi.calendar
            .getEvents()
            .map((event: any) => {
              const eventDate = event.start;

              const eventDay = eventDate.getDate();
              const eventMonth = eventDate.getMonth() + 1;
              const eventYear = eventDate.getFullYear();
              const formatDate = `${eventYear}-0${eventMonth}-0${eventDay}`;

              if (formatDate !== data.dateStr) {
                return;
              }

              const title = event.title;
              const start = event.start;
              const end = event.end;

              setFilterList((prev: any) => [{ title, start, end }, ...prev]);
            });
          setValue("data", data.dateStr.toString());
          handleOpenModal();
        }}
        height={"90vh"}
        eventContent={renderEventContent}
      />
      <ButtonComponent
        title="CRIAR DATA"
        className="absolute bottom-0 z-50 flex items-center justify-center py-4 text-white gap-x-2 brightness-50 hover:brightness-100 hover:cursor-pointer left-10 text-[20px]"
        onClick={handleCreateDateOpenModal}
      />
      {modalIsOpen && (
        <ModalComponent onClose={handleCloseModal}>
          <div
            onSubmit={handleSubmit(handleOnSubmit)}
            className="z-50 flex flex-col gap-y-3 px-5 py-10 bg-white  w-[500px] rounded-md overflow-hidden relative h-full"
          >
            <p className="font-semibold text-[20px] w-full text-center">
              AGENDA
            </p>
            <div>
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
