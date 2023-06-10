import { SlPeople } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { Orcamento } from "@prisma/client";
import { BiMailSend } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import InputComponent from "@/components/input";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { motion, useAnimation } from "framer-motion";
import { ButtonComponent } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { calcDuracaoFesta } from "@/function/calcDuracaoFesta";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import useSendAgendarVisitaEmail from "@/hook/reactQuery/email/useSendAgendarVisitaEmail";
import { useSendPersonalizadoEmail } from "@/hook/reactQuery/email/useSendPersonalizadoEmail";
import { SendEmailPersonalizadoFormData } from "@/zod/types/sendEmailPersonalizadoFormZodType";
import { sendEmailPersonalizadoFormSchema } from "@/zod/schemas/sendEmailPersonalizadoFormZodSchema";
import {
  limpezaValues,
  recepcionistaValue,
  segurancaValue,
} from "@/constants/calc";
import SelectItemsComponent from "@/components/selectItems";
import { SelectBooleansItemsCompoenent } from "@/components/selectBooleansItems";
import useUpdateOrcamento from "@/hook/reactQuery/orcamento/useUpdateOrcamento";
import { useGetOrcamentoById } from "@/hook/reactQuery/orcamento/useGetOrcamentoById";

interface InfoOrcamentoModalProsp {
  item: Orcamento;
}

export function InfoOrcamentoModalComponent({ item }: InfoOrcamentoModalProsp) {
  const { updateOrcamentoMutate } = useUpdateOrcamento();
  const { orcamentoByidMutate } = useGetOrcamentoById();
  const [formMode, setformMode] = useState<"Pessoais" | "Evento" | "Email">(
    "Evento"
  );

  const emailForm = formMode.includes("Email");
  const eventoForm = formMode.includes("Evento");
  const pessoaisForm = formMode.includes("Pessoais");

  const controlsEmail = useAnimation();
  const controlsEventos = useAnimation();
  const controlsPessoais = useAnimation();

  const opacityHidde = {
    opacity: [1, 0],
  };

  const opacityShow = {
    opacity: [0, 1],
  };

  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.3 },
  };

  const data1 = new Date(`${item?.dataInicio}T${item?.horarioInicio}`);

  const data2 = new Date(`${item?.dataInicio}T${item?.horarioFim}`);

  const duracaoFesta = calcDuracaoFesta(data1, data2);

  const {
    sendMailMutate,
    erroSendAgendarVisitaMail,
    isSendAgendarVisitaMailSuccess,
    IsSendAgendarVisitaMailLoading,
  } = useSendAgendarVisitaEmail();

  const {
    watch,
    reset,
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailPersonalizadoFormData>({
    resolver: zodResolver(sendEmailPersonalizadoFormSchema),
  });

  const {
    sendPersonalizadoEmailMutate,
    IsSendPersonalizadoEmailLoading,
    isSendPersonalizadoEmailSuccess,
    erroSendPersonalizadoEmail,
  } = useSendPersonalizadoEmail();

  async function handleOnSubmit(data: SendEmailPersonalizadoFormData) {
    sendPersonalizadoEmailMutate(data);
  }

  useEffect(() => {
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

  return (
    <>
      <div className="bg-white w-[600px]  rounded-md py-5 px-5 flex flex-col gap-y-5 relative  overflow-hidden">
        <div className="absolute transition duration-300 rounded-full cursor-pointer top-3 right-3 hover:bg-gray-300">
          <GrFormClose />
        </div>
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
                  <p className="text-sm">({item?.convidados})</p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineClockCircle size={20} />
                  <p className="text-sm">({duracaoFesta}hrs)</p>
                </div>
                <div className="flex items-center justify-center gap-x-2">
                  <AiOutlineCalendar size={20} />
                  <p className="text-sm">({item?.dataInicio})</p>
                </div>
              </div>
              <div className="flex flex-col flex-1 mt-10 gap-y-2">
                <div className="flex items-center justify-between w-full gap-x-3 ">
                  <p>Valor base:</p>
                  <CurrencyFormat
                    value={item?.valorBase}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"R$ "}
                  />
                </div>
                {item?.qtdHorasExtras ? (
                  <div className="flex items-center justify-between w-full gap-x-3 ">
                    <p>Horas extras ({item?.qtdHorasExtras}hrs):</p>
                    <CurrencyFormat
                      value={item?.valorHoraExtra * item?.qtdHorasExtras}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"R$ "}
                    />
                  </div>
                ) : null}
                {item?.seguranca && (
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
                {item?.recepcionista && (
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
                {item?.limpeza && (
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
              <div className="flex items-center justify-start gap-x-2">
                <p>Descricao:</p>
                <p className="text-sm">{item?.texto}</p>
              </div>
              <div className="flex items-center justify-between w-full mt-10 gap-x-3 ">
                <p>Total:</p>
                <div className="flex space-x-1">
                  <CurrencyFormat
                    value={item?.total}
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
                  value={item.valorHoraExtra}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"R$ "}
                />
              </div>
            </div>
            <motion.div className="flex items-center justify-end mt-5">
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
                <p>{item.nome}</p>
              </div>
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Canal:</p>
                <p>{item.trafegoCanal}</p>
              </div>
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Whatsapp:</p>
                <p>{item.telefone}</p>
              </div>
              <div className="flex items-center justify-start w-full gap-x-3">
                <p className="w-[100px]">Email:</p>
                <p>{item.email}</p>
              </div>
              <div className="flex flex-col flex-1 w-full space-y-3">
                <p>FeedBack:</p>
                <div className="flex-1 w-full px-2 py-2 bg-gray-100 rounded-sm">
                  <p>{item.feedback}</p>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p>Ja contactou o cliente?</p>
                  <ButtonComponent
                    title={item.contato ? "Sim" : "Nao"}
                    onClick={() => {
                      updateOrcamentoMutate({
                        orcamentoId: item?.id,
                        data: { contato: !item?.contato },
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
                </div>
                <div className="flex items-center justify-between w-full my-4 gap-x-3">
                  <div className="flex justify-start items-centr gap-x-2">
                    <p>
                      {item.conheceEspaco
                        ? "Este cliente  conece o espaco"
                        : "Este cliente nao conhece o espaco"}
                    </p>
                  </div>
                  {!item.conheceEspaco && (
                    <ButtonComponent
                      title="Agendar Visita"
                      onClick={() => {
                        sendMailMutate({
                          email: item.email,
                          nome: item.nome,
                          orcamentoId: item?.id,
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
