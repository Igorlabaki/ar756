import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { ImageComponent } from "../image";
import { BsCheckLg } from "react-icons/bs";
import { ButtonComponent } from "../button";
import { BiMailSend } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { SelectItemsZodComponent } from "../selectItemsZod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendEmail from "@/hook/reactQuery/email/useSendEmailOrcamento";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import useModalsContext from "@/hook/useContext/useModalsContext";
import { CreateInfoFormData } from "@/zod/types/reservaFormZodType";
import { SelectBooleansItemsCompoenent } from "../selectBooleansItems";
import { createInfoFormSchema } from "@/zod/schemas/reservaFormZodSchema";

export default function ReservaFormComponent() {
  const { isSendMailSuccess, sendMailMutate, IsSendMailLoading } =
    useSendEmail();
  const { handleCloseReservaModal } = useModalsContext();

  const [formMode, setformMode] = useState<"Pessoais" | "Evento" | "Success">(
    "Pessoais"
  );

  const pessoaisForm = formMode.includes("Pessoais");
  const eventoForm = formMode.includes("Evento");

  const {
    watch,
    reset,
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInfoFormData>({
    resolver: zodResolver(createInfoFormSchema),
  });

  async function handleOnSubmit(data: CreateInfoFormData) {
    sendMailMutate(data);
  }

  const nome = watch("nome");
  const email = watch("email");
  const limpeza = watch("limpeza");
  const seguranca = watch("seguranca");
  const convidados = watch("convidados");
  const recepcionista = watch("recepcionista");

  const handleCheckBoxClick = (
    name: "seguranca" | "limpeza" | "recepcionista",
    status: boolean
  ) => {
    setValue(name, !status);
  };

  const handlePhone = (event: any) => {
    let input = event.target;
    if (input) {
      input.value = phoneMask(input.value);
    }
  };

  const phoneMask = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  useEffect(() => {
    if (convidados >= 30) {
      setValue("limpeza", true);
      setValue("recepcionista", true);
    }
    if (convidados >= 70) {
      setValue("limpeza", true);
      setValue("seguranca", true);
      setValue("recepcionista", true);
    }

    return () => {
      if (convidados > 30) {
        setValue("limpeza", true);
        setValue("recepcionista", true);
      }
      if (convidados > 70) {
        setValue("limpeza", true);
        setValue("seguranca", true);
        setValue("recepcionista", true);
      }
    };
  }, [convidados, setValue]);

  const controlsPessoais = useAnimation();
  const controlsEventos = useAnimation();
  const controlsSuccess = useAnimation();

  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.3 },
  };

  const opacityHidde = {
    opacity: [1, 0],
  };

  const opacityShow = {
    opacity: [0, 1],
  };

  useEffect(() => {
    if (isSendMailSuccess) {
      controlsEventos.start(opacityHidde);
      controlsSuccess.start(opacityShow);
      setformMode("Success");
    }
  }, [isSendMailSuccess, controlsSuccess]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        encType="multipart/form-data"
        className="z-50 flex flex-col gap-y-3 px-5 py-10 bg-white  w-[800px] min-h-[800px] rounded-md overflow-hidden relative"
      >
        <div
          className="absolute transition duration-300 rounded-full cursor-pointer top-3 right-3 hover:bg-gray-300"
          onClick={() => handleCloseReservaModal && handleCloseReservaModal()}
        >
          <GrFormClose />
        </div>
        {!isSendMailSuccess && (
          <ImageComponent
            alt={"logo"}
            h={"h-[110px]"}
            w={"w-[195px]"}
            src={`/images/logo-vila-preto.png`}
            containerClassname={"z-20 rounded-md mx-auto "}
          />
        )}
        <motion.div
          initial={{
            x: 0,
          }}
          animate={{
            x: pessoaisForm ? 0 : eventoForm ? "-100%" : "-200%",
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
            animate={controlsPessoais}
            className="flex flex-col w-full min-w-full "
          >
            <div className="flex flex-col flex-1 gap-y-6 ">
              <InputComponent<CreateInfoFormData>
                title="nome"
                entity="nome"
                register={register}
                trigger={trigger}
                errors={!!errors.nome}
                errorsMsg={errors?.nome?.message}
              />
              <InputComponent<CreateInfoFormData>
                title="email"
                entity="email"
                register={register}
                trigger={trigger}
                errors={!!errors.email}
                errorsMsg={errors?.email?.message}
              />
              <InputComponent<CreateInfoFormData>
                title="telefone"
                entity="telefone"
                type="tel"
                register={register}
                trigger={trigger}
                maxLength={15}
                onKeyUp={() => handlePhone(event)}
                errors={!!errors.telefone}
                errorsMsg={errors?.telefone?.message}
              />
              <SelectBooleansItemsCompoenent
                title="Ja conhece o espaco?"
                setValue={setValue}
                field={"conheceEspaco"}
                trigger={trigger}
                watch={watch}
                listOptions={["Sim", "Nao"]}
                errors={!!errors.conheceEspaco}
                errorsMsg={errors?.conheceEspaco?.message}
              />
              <SelectItemsZodComponent
                title="Onde nos achou?"
                setValue={setValue}
                field={"trafegoCanal"}
                trigger={trigger}
                watch={watch}
                listOptions={[
                  "Facebook",
                  "TiTok",
                  "Instagram",
                  "Google",
                  "Amigos",
                  "Outros",
                ]}
                errors={!!errors.trafegoCanal}
                errorsMsg={errors?.trafegoCanal?.message}
              />
            </div>
            <motion.div className="flex items-center justify-end">
              <ButtonComponent
                icon={<HiArrowRight size={20} />}
                onClick={async () => {
                  const isEmailValid = await trigger("email");
                  const isNameValid = await trigger("nome");
                  const isTelefoneValid = await trigger("telefone");
                  const isTrafegoValid = await trigger("trafegoCanal");
                  const isConheceEspacoValid = await trigger("conheceEspaco");
                  // Dispara a validação dos campos
                  if (
                    isEmailValid &&
                    isNameValid &&
                    isTelefoneValid &&
                    isTrafegoValid &&
                    isConheceEspacoValid
                  ) {
                    setformMode("Evento");
                    controlsPessoais.start(opacityHidde);
                    controlsEventos.start(opacityShow);
                    // Define o modo como "DOCS"
                  } else {
                    controlsPessoais.start(shakeAnimation);
                  }
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
              opacity: 0,
            }}
            animate={controlsEventos}
            className="flex flex-col min-w-full gap-y-5"
          >
            <div className="flex-1 w-full">
              <InputComponent<CreateInfoFormData>
                title="Data do Evento"
                entity="dataInicio"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                register={register}
                trigger={trigger}
                onKeyDown={(e) => e.preventDefault()}
                errors={!!errors.dataInicio}
                errorsMsg={errors?.dataInicio?.message}
              />
              <div className="flex items-center justify-center gap-x-5">
                <InputComponent<CreateInfoFormData>
                  entity="horarioInicio"
                  title="Horario do Inicio"
                  type="time"
                  min="7:00"
                  max="22:00"
                  register={register}
                  trigger={trigger}
                  errors={!!errors.horarioInicio}
                  errorsMsg={errors?.horarioInicio?.message}
                />
                <InputComponent<CreateInfoFormData>
                  entity="horarioFim"
                  title="Horario do Fim"
                  type="time"
                  min="7:00"
                  max="22:00"
                  register={register}
                  trigger={trigger}
                  errors={!!errors.horarioFim}
                  errorsMsg={errors?.horarioFim?.message}
                />
              </div>
              <InputComponent<CreateInfoFormData>
                title="Convidados"
                entity="convidados"
                type="number"
                max={100}
                min={0}
                register={register}
                trigger={trigger}
                errors={!!errors.convidados}
                errorsMsg={errors?.convidados?.message}
              />
              <div className="flex items-center justify-start w-full my-5 gap-x-7">
                <div className="flex items-center justify-center gap-x-3 ">
                  <div
                    className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                    onClick={() => {
                      if (convidados < 30) {
                        handleCheckBoxClick("recepcionista", recepcionista);
                      }
                    }}
                  >
                    {recepcionista && <BsCheckLg />}
                  </div>
                  <p className="text-[15px] font-semibold">Recepcionista</p>
                </div>
                <div className="flex items-center justify-center gap-x-3 ">
                  <div
                    className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                    onClick={() => {
                      if (convidados < 30) {
                        handleCheckBoxClick("limpeza", limpeza);
                      }
                    }}
                  >
                    {limpeza && <BsCheckLg />}
                  </div>
                  <p className="text-[15px] font-semibold">Limpeza</p>
                </div>
                <div className="flex items-center justify-center gap-x-3 ">
                  <div
                    className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                    onClick={() => {
                      if (convidados < 70) {
                        handleCheckBoxClick("seguranca", seguranca);
                      }
                    }}
                  >
                    {seguranca && <BsCheckLg />}
                  </div>
                  <p className="text-[15px] font-semibold">Seguranca</p>
                </div>
              </div>
              <div className="flex flex-col mt-3 gap-y-2">
                <label htmlFor="nome" className="font-semibold text-[15px]">
                  Discorra sobre o evento
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
            </div>
            <div className="flex items-end justify-between">
              <ButtonComponent
                icon={<HiArrowLeft size={20} />}
                onClick={() => {
                  setformMode("Pessoais");
                  controlsEventos.start(opacityHidde);
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
                title={IsSendMailLoading ? "ENVIANDO" : "ENVIAR"}
                icon={<BiMailSend size={20} />}
                type="submit"
                onClick={async () => {
                  const isValid = await trigger();

                  // Dispara a validação dos campos
                  if (!isValid) {
                    controlsEventos.start(shakeAnimation);
                  }
                }}
                className={`
                  ${IsSendMailLoading && "animate-pulse"}
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
          </motion.div>
          <motion.div
            initial={{
              x: 0,
              opacity: 0,
            }}
            animate={controlsSuccess}
            className="flex flex-col items-center justify-center min-w-full gap-y-2"
          >
            <ImageComponent
              alt={"logo"}
              h={"h-[100px] md:h-[300px] "}
              w={"w-[150px] md:w-[400px]"}
              src={"/images/logo-vila-preto.png"}
              containerClassname={"z-20"}
            />
            <p className="text-[20px] font-semibold text-center w-[430px] ">
              Obrigado {nome} !
            </p>
            <p className="text-[16px] font-semibold text-center w-[430px]">
              Encaminhamos para seu email {email} uma simulacao do orcamento do
              seu evento.
            </p>
          </motion.div>
        </motion.div>
      </form>
    </>
  );
}
