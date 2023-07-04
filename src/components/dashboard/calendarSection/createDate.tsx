import moment from "moment";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Orcamento } from "@prisma/client";
import { BsCheckLg } from "react-icons/bs";
import InputComponent from "@/components/input";
import { AiOutlineCalendar } from "react-icons/ai";
import CurrencyFormat from "react-currency-format";
import { ButtonComponent } from "@/components/button";
import { WarningComponent } from "@/components/warning";
import { timesVisitAvailabel } from "@/constants/horarioLista";
import UseFrameMmotion from "@/hook/useFrameMotion/useFramMotion";
import { SelectItemsZodComponent } from "@/components/selectItemsZod";
import { CreateDateFormData } from "@/zod/types/createDateFormZodType";
import UseCreateDateFormHooks from "@/formHooks/createDateEventFormHooks";
import { SelectBooleansItemsCompoenent } from "@/components/selectBooleansItems";
import useGetOrcamentoList from "@/hook/reactQuery/orcamento/useGetOrcamentoList";
import { SelectListItemsZod } from "@/components/selectListItemsZod";
import { V } from "@fullcalendar/resource/internal-common";

export function CreateDateComponent() {
  const { shakeAnimation } = UseFrameMmotion();
  const { orcamentoList } = useGetOrcamentoList({});
  const { motion, useAnimation } = UseFrameMmotion();
  const [filterList, setFilterList] = useState<string>("");
  const [selectedFim, setSelectedFim] = useState("");
  const [selectedInicio, setSelectedInicio] = useState("");

  const {
    watch,
    errors,
    trigger,
    setValue,
    register,
    tipoWatch,
    handleSubmit,
    createDate,
    orcamentoWatch,
    handleOnSubmit,
    horarioFimWatch,
    horarioInicioWatch,
    orcamentoCheckWatch,
    handleEndHourChange,
    handleStartHourChange,
  } = UseCreateDateFormHooks();

  const formControls = useAnimation();

  useEffect(() => {
    if (orcamentoWatch) {
      const [date, horarioInicio]: any = orcamentoWatch?.dataInicio?.split("T");
      const [, horarioFim]: any = orcamentoWatch?.dataFim?.split("T");

      setValue("data", date);
      setValue("horarioInicio", horarioInicio.slice(0, 5));
      setSelectedInicio(horarioInicio.slice(0, 5));
      setValue("horarioFim", horarioFim.slice(0, 5));
    }
  }, [orcamentoWatch]);

  return (
    <motion.form
      animate={formControls}
      onSubmit={handleSubmit(handleOnSubmit)}
      className="z-50 flex flex-col gap-y-3 px-5 py-10 bg-white  w-[800px] rounded-md overflow-hidden  h-full mt-5  "
    >
      {createDate?.message && (
        <WarningComponent text={createDate?.message} error width="w-[800px]" />
      )}
      {createDate?.dataInicio && (
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
          <div className="flex flex-col gap-y-2">
            {orcamentoCheckWatch && (
              <>
                <p className="font-semibold">Selecione um Orcamento :</p>
                <div className="flex items-center justify-start px-4 py-2 bg-gray-200 rounded-md outline-none gap-x-2">
                  <CiSearch size={20} />
                  <input
                    type="text"
                    placeholder="Procure pelo email"
                    className="w-full p-2 bg-transparent bg-gray-200 rounded-md outline-none"
                    onChange={(e) => setFilterList(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  {orcamentoList?.map((item: any) => {
                    if (
                      !item?.email
                        .toLocaleLowerCase()
                        .includes(filterList.toLocaleLowerCase()) ||
                      filterList === ""
                    ) {
                      return;
                    }

                    return (
                      <div
                        className={`flex items-center justify-center w-full px-5 py-5 bg-gray-200  rounded-md gap-x-20 text-[19px] text-gray-500  shadow-lg hover:brightness-95`}
                        key={item.id}
                      >
                        <div className="flex items-center justify-between flex-1">
                          <div className="flex flex-col gap-y-2">
                            <p>{item.email}</p>
                          </div>
                          <div className="flex flex-col gap-y-2">
                            <p>
                              {moment(item.dataInicio).format("DD/MM/YYYY")}
                            </p>
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
                  onChange={(e) => {
                    handleStartHourChange(e);
                  }}
                  className="w-full px-4 py-[23px] transition bg-white border-2 rounded-md outline-none"
                >
                  <option>
                    {horarioInicioWatch ? horarioInicioWatch : "--:--"}
                  </option>
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
                  onChange={(e) => {
                    handleEndHourChange(e);
                  }}
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
