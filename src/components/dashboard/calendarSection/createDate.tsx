import { CiSearch } from "react-icons/ci";
import { Orcamento } from "@prisma/client";
import { BsCheckLg } from "react-icons/bs";
import { useAnimation } from "framer-motion";
import InputComponent from "@/components/input";
import { AiOutlineCalendar } from "react-icons/ai";
import CurrencyFormat from "react-currency-format";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ButtonComponent } from "@/components/button";
import { formatarData } from "@/function/formatarData";
import UseFrameMmotion from "@/hook/useFrameMotion/useFramMotion";
import { SelectItemsZodComponent } from "@/components/selectItemsZod";
import { CreateDateFormData } from "@/zod/types/createDateFormZodType";
import UseCreateDateFormHooks from "@/formHooks/createDateEventFormHooks";
import { SelectBooleansItemsCompoenent } from "@/components/selectBooleansItems";
import useGetOrcamentoList from "@/hook/reactQuery/orcamento/useGetOrcamentoList";
import { WarningComponent } from "@/components/warning";

export function CreateDateComponent() {
  const { shakeAnimation } = UseFrameMmotion();
  const { orcamentoList } = useGetOrcamentoList({});
  const { motion, useAnimation } = UseFrameMmotion();
  const [filterList, setFilterList] = useState<string>();
  const {
    watch,
    errors,
    trigger,
    setError,
    setValue,
    register,
    tipoWatch,
    handleSubmit,
    createDate,
    errorMessage,
    orcamentoWatch,
    handleOnSubmit,
    horarioFimWatch,
    isCreateDateError,
    horarioInicioWatch,
    orcamentoCheckWatch,
  } = UseCreateDateFormHooks();

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("horarioInicio", e.target.value);
    trigger("horarioInicio");

    if (tipoWatch === "Visita") {
      if (e.target.value.endsWith("30")) {
        setValue("horarioFim", `${parseInt(hour) + 1}:00`);
        trigger("horarioFim");
      } else {
        setValue("horarioFim", `${hour}:30`);
        trigger("horarioFim");
      }
    } else {
      const addHour = parseInt(hour) + 8;
      const hourToSet = addHour < 22 ? addHour : 22;
      const minutesToSet = addHour >= 22 ? "00" : minutes;
      setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
    }
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("horarioFim", e.target.value);
  };

  const formControls = useAnimation();

  const timesVisitAvailabel = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  useEffect(() => {
    if (orcamentoWatch && tipoWatch) {
      setValue("titulo", `${orcamentoWatch.nome} - ${tipoWatch}`);
      trigger("titulo");
    }
  }, [orcamentoWatch, tipoWatch, setValue]);

  useEffect(() => {
    if (tipoWatch === "Visita" && horarioInicioWatch) {
      const [hour, minutes] = horarioInicioWatch?.split(":");
      if (horarioInicioWatch.endsWith("30")) {
        setValue("horarioFim", `${parseInt(hour) + 1}:00`);
        trigger("horarioFim");
      } else {
        setValue("horarioFim", `${hour}:30`);
        trigger("horarioFim");
      }
    } else if (horarioInicioWatch) {
      const [hour, minutes] = horarioInicioWatch?.split(":");
      const addHour = parseInt(hour) + 8;
      const hourToSet = addHour < 22 ? addHour : 22;
      const minutesToSet = addHour >= 22 ? "00" : minutes;
      setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
    }
  }, [tipoWatch]);

  return (
    <motion.form
      animate={formControls}
      onSubmit={handleSubmit(handleOnSubmit)}
      className="z-50 flex flex-col gap-y-3 px-5 py-10 bg-white  w-[800px] rounded-md overflow-hidden  h-full mt-5 "
    >
      {createDate?.message && (
        <WarningComponent text={createDate?.message} error width="w-[800px]" />
      )}
      {createDate?.data && (
        <WarningComponent
          text={"Data salva com sucesso!"}
          success
          width="w-[800px]"
        />
      )}
      <div className="flex flex-col flex-1 gap-y-3">
        <p className="text-[23px] font-semibold text-center w-full">
          Criar evento
        </p>
        <div className="flex flex-col gap-y-3">
          <SelectItemsZodComponent
            title="Tipo do Evento?"
            setValue={setValue}
            field={"tipo"}
            trigger={trigger}
            watch={watch}
            listOptions={["Evento", "Visita", "Outros"]}
            errors={!!errors.tipo}
            errorsMsg={errors?.tipo?.message}
          />
          <InputComponent<CreateDateFormData>
            title="Titulo"
            entity="titulo"
            register={register}
            trigger={trigger}
            errors={!!errors.titulo}
            errorsMsg={errors?.titulo?.message}
          />
          <InputComponent<CreateDateFormData>
            title="Data do Evento"
            entity="data"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            register={register}
            trigger={trigger}
            onKeyDown={(e) => e.preventDefault()}
            errors={!!errors.data}
            errorsMsg={errors?.data?.message}
          />
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-start gap-x-3">
              <div className="w-[50%] flex flex-col gap-y-2 gap-x-3">
                <p className="font-semibold">Incio</p>
                <select
                  onChange={(e) => handleStartHourChange(e)}
                  className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none"
                >
                  <option>{"--:--"}</option>
                  {timesVisitAvailabel.map((item: string, index: number) => {
                    const [hour, minutes] = item.split(":");
                    if (parseInt(hour) < 8 || parseInt(hour) > 22) {
                      return;
                    }
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                {errors?.horarioInicio && (
                  <p className="text-red-700 text-[15px] w-full">
                    {errors?.horarioInicio?.message}
                  </p>
                )}
              </div>
              <div className="w-[50%] flex flex-col gap-y-2">
                <p className="font-semibold">Fim</p>
                <select
                  onChange={(e) => handleEndHourChange(e)}
                  disabled={
                    !tipoWatch ||
                    tipoWatch?.includes("Visita") ||
                    parseInt(horarioFimWatch) >= 22
                      ? true
                      : false
                  }
                  className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none"
                >
                  <option>{horarioFimWatch ? horarioFimWatch : "--:--"}</option>
                  {timesVisitAvailabel.map((item: string, index: number) => {
                    const [hour] = item.split(":");
                    if (parseInt(hour) < 8 || parseInt(hour) > 22) {
                      return;
                    }
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                {errors?.horarioFim && (
                  <p className="text-red-700 text-[15px] w-full">
                    {errors?.horarioFim?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <SelectBooleansItemsCompoenent
            title="Ja existe um orcamento?"
            setValue={setValue}
            field={"orcamentoCheck"}
            trigger={trigger}
            watch={watch}
            listOptions={["Sim", "Nao"]}
            errors={!!errors.orcamentoCheck}
            errorsMsg={errors?.orcamentoCheck?.message}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          {orcamentoCheckWatch && (
            <>
              <p className="font-semibold">Selecione um Orcamento :</p>
              <div className="flex items-center justify-start px-4 py-2 bg-gray-200 rounded-md outline-none gap-x-2">
                <CiSearch size={20} />
                <input
                  type="text"
                  className="p-2 bg-gray-200 rounded-md outline-none"
                  onChange={(e) => setFilterList(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                {orcamentoList?.map((item: Orcamento) => {
                  if (filterList && !item?.nome.includes(filterList)) {
                    return;
                  }
                  return (
                    <div
                      className={`flex items-center justify-center w-full px-5 py-5 bg-gray-200  rounded-md gap-x-20 text-[19px] text-gray-500  shadow-lg hover:brightness-95`}
                      key={item.id}
                    >
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex flex-col gap-y-2">
                          <p>{item.nome}</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <p>{item.dataInicio}</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <CurrencyFormat
                            value={item.total}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={"R$ "}
                          />
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-center w-5 h-5 bg-white rounded-md cursor-pointer"
                        onClick={() => {
                          if (orcamentoWatch) {
                            setValue("orcamento", undefined);
                            trigger("orcamento");
                          } else {
                            setValue("orcamento", item);
                            trigger("orcamento");
                          }
                        }}
                      >
                        {orcamentoWatch?.id === item.id && (
                          <BsCheckLg className="text-green-700" size={30} />
                        )}
                      </div>
                    </div>
                  );
                })}
                {errors?.orcamento && (
                  <p className="text-red-700 text-[15px] w-full mt-2">
                    {errors.orcamento.message}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        <ButtonComponent
          title={"AGENDAR"}
          icon={<AiOutlineCalendar size={20} />}
          type="submit"
          onClick={async () => {
            const isValid = await trigger();

            // Dispara a validação dos campos
            if (!isValid) {
              formControls.start(shakeAnimation);
            }
          }}
          className={`
    z-30
    w-[200px]
    h-[55px]
    text-[15px]
    tracking-[3px] text-white rounded-md bg-black
    mt-6
    transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
    flex justify-center items-center flex-row-reverse  gap-x-2
  `}
        />
      </div>
    </motion.form>
  );
}
