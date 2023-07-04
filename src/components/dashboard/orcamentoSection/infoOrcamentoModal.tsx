import { SlPeople } from "react-icons/sl";
import { Orcamento } from "@prisma/client";
import { BiMailSend } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import InputComponent from "@/components/input";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { motion, useAnimation } from "framer-motion";
import { ButtonComponent } from "@/components/button";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import useUpdateOrcamento from "@/hook/reactQuery/orcamento/useUpdateOrcamento";
import useSendAgendarVisitaEmail from "@/hook/reactQuery/email/useSendAgendarVisitaEmail";
import { useSendPersonalizadoEmail } from "@/hook/reactQuery/email/useSendPersonalizadoEmail";
import { SendEmailPersonalizadoFormData } from "@/zod/types/sendEmailPersonalizadoFormZodType";
import UseCreateEmailPersonalizadoFormHooks from "@/formHooks/createEmailPersonalizadoFormHooks";
import {
  limpezaValues,
  recepcionistaValue,
  segurancaValue,
} from "@/constants/calc";
import {
  opacityHidde,
  opacityShow,
  shakeAnimation,
} from "@/constants/animations";
import { useGetOrcamentoById } from "@/hook/reactQuery/orcamento/useGetOrcamentoById";
import useGetDateList from "@/hook/reactQuery/date/useGetDateList";
import { useCheckDateAvailability } from "@/hook/reactQuery/date/checkDateAvailability";
import moment from "moment";
import { useCreateDate } from "@/hook/reactQuery/date/useCreateDate";
import { WarningComponent } from "@/components/warning";

interface InfoOrcamentoModalProsp {
  item: Orcamento;
}

export function InfoOrcamentoModalComponent({ item }: InfoOrcamentoModalProsp) {
  const [duracaoFesta, setduracaoFesta] = useState<number>(0);
  const { orcamentoByidMutate, orcamentoByid } = useGetOrcamentoById();
  const { updateOrcamentoMutate } = useUpdateOrcamento();
  const [formMode, setformMode] = useState<"Pessoais" | "Evento" | "Email">(
    "Evento"
  );

  const eventoForm = formMode.includes("Evento");
  const pessoaisForm = formMode.includes("Pessoais");

  const controlsEmail = useAnimation();
  const controlsEventos = useAnimation();
  const controlsPessoais = useAnimation();

  const { checkDateAvailability, checkDateAvailabilityMutate } =
    useCheckDateAvailability();

  const { sendMailMutate, IsSendAgendarVisitaMailLoading } =
    useSendAgendarVisitaEmail();

  const { isSendPersonalizadoEmailSuccess, IsSendPersonalizadoEmailLoading } =
    useSendPersonalizadoEmail();

  const { errors, trigger, register, setValue, handleSubmit, handleOnSubmit } =
    UseCreateEmailPersonalizadoFormHooks();

  const { createDateMutate, createDate } = useCreateDate();

  useEffect(() => {
    orcamentoByidMutate(item?.id);
    setValue("email", item.email);
    setValue("nome", item.nome);
  }, [setValue, item]);

  useEffect(() => {
    if (isSendPersonalizadoEmailSuccess) {
      setformMode("Pessoais");
      controlsEmail.start(opacityHidde);
      controlsPessoais.start(opacityShow);
      setValue("texto", "");
      setValue("assunto", "");
    }
  }, [isSendPersonalizadoEmailSuccess]);

  useEffect(() => {
    if (orcamentoByid?.dataFim && orcamentoByid?.dataInicio) {
      checkDateAvailabilityMutate({
        dataFim: orcamentoByid?.dataFim,
        dataInicio: orcamentoByid?.dataInicio,
      });
    }
  }, [orcamentoByid]);

  useEffect(() => {
    if (orcamentoByid) {
      const date1 = moment(orcamentoByid?.dataInicio);
      const date2 = moment(orcamentoByid.dataFim);
      setduracaoFesta(() => date2.diff(date1, "hours"));
    }
  }, [orcamentoByid]);

  return (
    <>
      <div className="bg-white w-[600px]  rounded-md py-5 px-5 flex flex-col gap-y-5 relative  overflow-hidden">
        <div className="absolute transition duration-300 rounded-full cursor-pointer top-3 right-3 hover:bg-gray-300">
          <GrFormClose />
        </div>
        {createDate?.message && (
          <WarningComponent
            text={createDate?.message}
            error
            width="w-[800px]"
          />
        )}
        {createDate?.dataInicio && (
          <WarningComponent
            text={"Data salva com sucesso!"}
            success
            width="w-[800px]"
          />
        )}
        <h1 className="text-[23px] w-full m-auto text-center">
          {eventoForm
            ? " Informacoes do Evento"
            : pessoaisForm
            ? " Informacoes Pessoais"
            : "Enviar Email"}
        </h1>
        <motion.div
          initial={{
            x: 0,
          }}
          animate={{
            x: eventoForm ? 0 : pessoaisForm ? "-100%" : "-200%",
            transition: {
              duration: 0.5,
            },
          }}
          className="flex flex-1"
        >
          <motion.div
            initial={{
              x: 0,
            }}
            animate={controlsEventos}
            className="flex flex-col w-full min-w-full overflow-hidden"
          >
            <div className="flex flex-col flex-1 gap-y-4 text-[18px]">
              <div className="flex items-center justify-center w-full mt-10 gap-x-5">
                <div className="flex items-center justify-center gap-x-2">
                  <SlPeople size={20} />
                  <p className="text-sm">({orcamentoByid?.convidados})</p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineClockCircle size={20} />
                  <p className="text-sm">
                    {`${moment(orcamentoByid?.dataInicio)
                      .utcOffset(0)
                      .format("HH:mm")} - ${moment(orcamentoByid?.dataFim)
                      .utcOffset(0)
                      .format("HH:mm")}  (${duracaoFesta}hrs)`}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineCalendar size={20} />
                  <p className="text-sm">
                    ({moment(orcamentoByid?.dataInicio).format("DD/MM/YYYY")})
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-1 mt-10 gap-y-2">
                <div className="flex items-center justify-between w-full gap-x-3 ">
                  <p>Valor base:</p>
                  <CurrencyFormat
                    value={orcamentoByid?.valorBase}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"R$ "}
                  />
                </div>
                {orcamentoByid?.qtdHorasExtras ? (
                  <div className="flex items-center justify-between w-full gap-x-3 ">
                    <p>Horas extras ({orcamentoByid?.qtdHorasExtras}hrs):</p>
                    <CurrencyFormat
                      value={
                        orcamentoByid?.valorHoraExtra *
                        orcamentoByid?.qtdHorasExtras
                      }
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$ "}
                    />
                  </div>
                ) : null}
                {orcamentoByid?.seguranca && (
                  <div className="flex items-center justify-between w-full gap-x-3 ">
                    <p>Seguranca:</p>
                    <CurrencyFormat
                      value={segurancaValue}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$ "}
                    />
                  </div>
                )}
                {orcamentoByid?.recepcionista && (
                  <div className="flex items-center justify-between w-full gap-x-3 ">
                    <p>Recepcionista:</p>
                    <CurrencyFormat
                      value={recepcionistaValue}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$ "}
                    />
                  </div>
                )}
                {orcamentoByid?.limpeza && (
                  <div className="flex items-center justify-between w-full gap-x-3 ">
                    <p>Limpeza:</p>
                    <CurrencyFormat
                      value={limpezaValues}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$ "}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between w-full gap-x-3 ">
                <p>Total:</p>
                <div className="flex space-x-1">
                  <CurrencyFormat
                    value={orcamentoByid?.total}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"R$ "}
                    className="font-semibold text-[25px]"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center gap-x-1 text-[13px] font-light">
                <p>**O valor da hora extra e de </p>
                <CurrencyFormat
                  value={orcamentoByid?.valorHoraExtra}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"R$ "}
                />
              </div>
              <div className="flex items-center justify-start gap-x-2">
                <p className="font-semibold text-[15px]">Descricao:</p>
                <p className="text-sm">{orcamentoByid?.texto}</p>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className={`flex justify-start items-center ${
                    checkDateAvailability?.message.includes("nao")
                      ? "text-red-800"
                      : "text-green-800"
                  }  gap-x-1 text-[13px]  font-semibold`}
                >
                  <p>{checkDateAvailability?.message}</p>
                </div>
                <div
                  className={`
                  ${item?.aprovadoCliente ? "text-green-800" : "text-red-800"}
                  flex justify-start items-center gap-x-1 text-[13px]  font-semibold`}
                >
                  <p>
                    Orcamento{" "}
                    {item?.aprovadoCliente ? "aprovado" : "ainda nao aprovado"}{" "}
                    pelo cliente
                  </p>
                </div>
              </div>
            </div>
            <motion.div className="flex flex-row-reverse items-center justify-between w-full mt-5">
              <ButtonComponent
                icon={<HiArrowRight size={20} />}
                onClick={async () => {
                  controlsEventos.start(opacityHidde);
                  controlsPessoais.start(opacityShow);
                  setformMode("Pessoais");
                }}
                type="button"
                className={`
                  z-30
                  text-[15px]
                  tracking-[3px] text-black
                  transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                  flex justify-center items-center flex-row-reverse  gap-x-2
                  `}
              />
              {!checkDateAvailability?.message.includes("nao") &&
                item?.aprovadoCliente && (
                  <ButtonComponent
                    title="Aprovar"
                    onClick={() => {
                      updateOrcamentoMutate({
                        orcamentoId: item.id,
                        data: {
                          aprovadoAr756: true,
                        },
                      });
                      if (orcamentoByid) {
                        createDateMutate({
                          dataFim: orcamentoByid?.dataFim,
                          dataInicio: orcamentoByid?.dataInicio,
                          orcamentoId: orcamentoByid?.id,
                          tipo: "Evento",
                          titulo: `${orcamentoByid?.nome} - Evento`,
                        });
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
                )}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{
              x: 0,
              opacity: eventoForm ? 0 : 1,
            }}
            animate={controlsPessoais}
            className="relative flex flex-col w-full min-w-full overflow-hidden"
          >
            <div className="flex flex-col items-start justify-start flex-1 w-full gap-y-3">
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Nome:</p>
                <p>{orcamentoByid?.nome}</p>
              </div>
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Canal:</p>
                <p>{orcamentoByid?.trafegoCanal}</p>
              </div>
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Whatsapp:</p>
                <p>{orcamentoByid?.telefone}</p>
              </div>
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Email:</p>
                <p>{orcamentoByid?.email}</p>
              </div>
              <div className="flex flex-col flex-1 w-full space-y-3">
                <p>FeedBack:</p>
                <div className="flex-1 w-full px-2 py-2 bg-gray-100 rounded-sm">
                  <p>{orcamentoByid?.feedback}</p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p>Ja contactou o cliente?</p>
                  <ButtonComponent
                    title={orcamentoByid?.contato ? "Sim" : "Nao"}
                    onClick={() => {
                      updateOrcamentoMutate({
                        orcamentoId: orcamentoByid?.id,
                        data: { contato: !orcamentoByid?.contato },
                      });
                      orcamentoByidMutate(item?.id);
                    }}
                    className={`
									${IsSendAgendarVisitaMailLoading && "animate-pulse"}
								z-30
								text-[15px]
								tracking-[3px] text-black
								transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
								flex justify-center items-center flex-row-reverse  gap-x-2 hover:scale-105
								`}
                  />
                </div>
                <div className="flex items-center justify-between w-full my-4 gap-x-3">
                  <div className="flex justify-start items-centr gap-x-2">
                    <p>
                      {orcamentoByid?.conheceEspaco
                        ? "Este cliente  conece o espaco"
                        : "Este cliente nao conhece o espaco"}
                    </p>
                  </div>
                  {!orcamentoByid?.conheceEspaco && (
                    <ButtonComponent
                      title="Agendar Visita"
                      onClick={() => {
                        sendMailMutate({
                          email: orcamentoByid?.email,
                          nome: orcamentoByid?.nome,
                          orcamentoId: orcamentoByid?.id,
                        });
                      }}
                      className={`
									${IsSendAgendarVisitaMailLoading && "animate-pulse"}
								z-30
								text-[15px]
								tracking-[3px] text-black
								transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
								flex justify-center items-center flex-row-reverse  gap-x-2 hover:scale-105
								`}
                    />
                  )}
                </div>
              </div>
            </div>
            <motion.div className="flex items-center justify-between">
              <ButtonComponent
                icon={<HiArrowLeft size={20} />}
                onClick={async () => {
                  setformMode("Evento");
                  controlsPessoais.start(opacityHidde);
                  controlsEventos.start(opacityShow);
                }}
                type="button"
                className={`
                  z-30
                  text-[15px]
                  tracking-[3px] text-black
                  transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                  flex justify-center items-center flex-row-reverse  gap-x-2 
                  `}
              />
              <ButtonComponent
                title="Enviar Email"
                icon={<BiMailSend size={20} />}
                onClick={() => {
                  setformMode("Email");
                  controlsPessoais.start(opacityHidde);
                  controlsEmail.start(opacityShow);
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
            </motion.div>
          </motion.div>
          <motion.div
            initial={{
              x: 0,
              opacity: 0,
            }}
            animate={controlsEmail}
            className="flex flex-col w-full min-w-full overflow-hidden"
          >
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <InputComponent<SendEmailPersonalizadoFormData>
                title="assunto"
                entity="assunto"
                register={register}
                trigger={trigger}
                errors={!!errors.assunto}
                errorsMsg={errors?.assunto?.message}
              />
              <div className="flex flex-col mt-3 gap-y-2">
                <label htmlFor="nome" className="font-semibold text-[15px]">
                  Texto
                </label>
                <textarea
                  className={`bg-gray-50 outline-none rounded-md w-full h-[200px] p-2 ${
                    errors.texto && "border-[1px] border-red-700"
                  }`}
                  {...register("texto", { onChange: () => trigger("texto") })}
                ></textarea>
                <span className="text-red-700 text-[15px] w-full">
                  {errors.texto && errors.texto.message}
                </span>
              </div>
              <motion.div className="flex items-center justify-between">
                <ButtonComponent
                  icon={<HiArrowLeft size={20} />}
                  onClick={async () => {
                    setformMode("Pessoais");
                    controlsEmail.start(opacityHidde);
                    controlsPessoais.start(opacityShow);
                  }}
                  type="button"
                  className={`
                  z-30
                  text-[15px]
                  tracking-[3px] text-black
                  transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
                  flex justify-center items-center flex-row-reverse  gap-x-2 
                  `}
                />
                <ButtonComponent
                  title="Enviar"
                  icon={<BiMailSend size={20} />}
                  type="submit"
                  onClick={async () => {
                    const isValid = await trigger();
                    // Dispara a validação dos campos
                    if (!isValid) {
                      controlsEmail.start(shakeAnimation);
                    }
                  }}
                  className={`
                ${IsSendPersonalizadoEmailLoading && "animate-pulse"}
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
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
