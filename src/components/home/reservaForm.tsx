import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonComponent } from "../button";
import { ImageComponent } from "../image";
import axios from "axios";
import { BiMailSend, BiTrash } from "react-icons/bi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

import { motion } from "framer-motion";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import useModalsContext from "@/hook/useModalsContext";
import SelectItemsComponent from "../selectItems";
import { BsCheckLg } from "react-icons/bs";
import { convertFileToBase64 } from "@/function/covertBase64";

const createInfoFormSchema = z.object({
  horarioFim: z
    .string()
    .nonempty("Este campo é obrigatório!")
    .refine(
      (val) => {
        const horario = val.split(":");
        const hora = parseInt(horario[0]);
        return hora >= 7 && hora <= 22;
      },
      {
        message: "O fim do evento deve estar entre 7:00 e 22:00",
      }
    ),
  dataInicio: z.string().nonempty("Este campo e obrigatorio!"),
  horarioInicio: z
    .string()
    .nonempty("Este campo é obrigatório!")
    .refine(
      (val) => {
        const horario = val.split(":");
        const hora = parseInt(horario[0]);
        return hora >= 7 && hora <= 22;
      },
      {
        message: "O inicio do evento deve estar entre 7:00 e 22:00",
      }
    ),
  seguranca: z.boolean().default(false),
  limpeza: z.boolean().default(false),
  recepcionista: z.boolean().default(false),
  nome: z
    .string()
    .nonempty("Este campo e obrigatorio!")
    .min(5, "Nome deve conter pelo menos 5 caracteres."),
  email: z
    .string()
    .email("Email invalido!")
    .nonempty("Este campo e obrigatorio!"),
  texto: z
    .string()
    .nonempty("Este campo e obrigatorio!")
    .min(10, "A descricao do evento deve conter pelo menos 10 caracteres."),
  convidados: z
    .string()
    .nonempty("Este campo e obrigatorio!")
    .transform((val) => parseInt(val))
    .refine((val) => val <= 100, {
      message: "O número de convidados não pode ser maior que 100",
    })
    .refine((val) => val > 0, {
      message: "O número de convidados não pode 0",
    }),
});

type CreateInfoFormData = z.infer<typeof createInfoFormSchema>;

export default function ReservaFormComponent() {
  const [formMode, setFormMode] = useState<"INFO" | "DOCS">("INFO");
  const { handleCloseReservaModal } = useModalsContext();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    getFieldState,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateInfoFormData>({
    resolver: zodResolver(createInfoFormSchema),
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  async function handleOnSubmit({
    dataInicio,
    email,
    horarioFim,
    horarioInicio,
    limpeza,
    nome,
    convidados,
    recepcionista,
    seguranca,
    texto,
  }: CreateInfoFormData) {
    // Adicione os arquivos ao objeto FormData
    const base64Files = [];

    /*    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const base64String = await convertFileToBase64(file);
      base64Files.push({ base64String, fileName: file.name });
    }
 */
    axios
      .post("/api/sendMail", {
        dataInicio,
        email,
        horarioFim,
        horarioInicio,
        limpeza,
        nome,
        convidados,
        recepcionista,
        seguranca,
        texto,
        /* base64Files, */
      })
      .then((data: any) => {
        console.log(data);
      });
  }

  /*   function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
      const updatedFiles = Array.from(files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    }
  }

  function handleFileRemove(index: number) {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  }
  const docMode = formMode.includes("DOCS");
  const infoMode = formMode.includes("INFO"); */

  const segurancaIsTrue = watch("seguranca");
  const limpezaIsTrue = watch("limpeza");
  const recepcionistaIsTrue = watch("recepcionista");
  const convidados = watch("convidados");

  const handleCheckBoxClick = (
    name: "seguranca" | "limpeza" | "recepcionista",
    status: boolean
  ) => {
    setValue(name, !status);
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

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      encType="multipart/form-data"
      className="z-50 flex flex-col  gap-y-3 px-5 py-10 bg-white  w-[800px] min-h-[800px] rounded-md overflow-hidden relative"
    >
      <div
        className="absolute transition duration-300 rounded-full cursor-pointer top-3 right-3 hover:bg-gray-300"
        onClick={() => handleCloseReservaModal && handleCloseReservaModal()}
      >
        <GrFormClose />
      </div>
      <ImageComponent
        alt={"logo"}
        h={"h-[110px]"}
        w={"w-[195px]"}
        src={`/images/logo-vila-preto.png`}
        containerClassname={"z-20 rounded-md mx-auto "}
      />
      <div className="flex w-full ">
        <div className="min-w-full mr-20">
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="nome" className="font-semibold text-[15px]">
              Nome
            </label>
            <input
              type="text"
              placeholder="Nome"
              {...register("nome", { onChange: () => trigger("nome") })}
              className={`
            w-full
            p-5
            rounded-md
            font-light
            bg-white
            border-2
            outline-none
            transition
            placeholder:text-[12px]
            ${errors.nome && "border-[1px] border-red-700 "}`}
            />
            <span className="text-red-700 text-[15px] w-full">
              {errors.nome && errors.nome.message}
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="nome" className="font-semibold text-[15px]">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                onChange: () => trigger("email"),
              })}
              className={`
            w-full
            p-5
            rounded-md
            font-light
            bg-white
            border-2
            outline-none
            transition
            placeholder:text-[12px]
            ${errors.email && "border-[1px] border-red-700 "}`}
            />
            <span className="text-red-700 text-[15px] w-full">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-sm gap-y-3 gap-x-5">
            <div className="flex justify-between w-full">
              <div className="flex items-center justify-between w-full gap-x-4">
                <div className="flex flex-col items-start justify-center gap-x-4">
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="dataInicio"
                      className="font-semibold w-[200px] "
                    >
                      Numero de convidados:
                    </label>
                    <input
                      type="number"
                      {...register("convidados", {
                        onChange: () => trigger("convidados"),
                      })}
                      max={100}
                      min={0}
                      className={`p-2 border-2 border-gray-400 rounded-lg  ${
                        errors.convidados && "border-[1px] border-red-700 "
                      }`}
                    />
                  </div>
                  <span className="text-red-700 text-[15px] w-full">
                    {errors.convidados && errors.convidados.message}
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-x-1 ">
                    <label
                      htmlFor="dataInicio"
                      className="font-semibold w-[110px] flex justify-start"
                    >
                      Data do Evento:
                    </label>
                    <input
                      type="date"
                      {...register("dataInicio", {
                        onChange: () => trigger("dataInicio"),
                      })}
                      min={new Date().toISOString().split("T")[0]}
                      className={`p-2 border-2 border-gray-400 rounded-lg w-[200px] ${
                        errors.dataInicio && "border-[1px] border-red-700 "
                      }`}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </div>
                  <span className="text-red-700 text-[15px] w-full flex justify-end">
                    {errors.dataInicio && errors.dataInicio.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div>
                <div className="flex items-center justify-start ">
                  <label
                    htmlFor="horarioInicio"
                    className="w-[200px] font-semibold"
                  >
                    Horario de Inicio:
                  </label>
                  <input
                    type="time"
                    {...register("horarioInicio", {
                      onChange: () => trigger("horarioInicio"),
                    })}
                    className={`p-2 border-2 border-gray-400 rounded-lg  ${
                      errors.horarioInicio && "border-[1px] border-red-700 "
                    }`}
                    min="7:00"
                    max="22:00"
                  />
                </div>
                <span className="text-red-700 text-[15px] w-full ">
                  {errors.horarioInicio && errors.horarioInicio.message}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-end">
                  <label
                    htmlFor="endTime"
                    className="font-semibold w-[110px] flex justify-start"
                  >
                    Horario do Fim:
                  </label>
                  <input
                    type="time"
                    {...register("horarioFim", {
                      onChange: () => trigger("horarioFim"),
                    })}
                    className={`p-2 border-2 border-gray-400 rounded-lg w-[200px] ${
                      errors.horarioFim && "border-[1px] border-red-700 "
                    }`}
                  />
                </div>
                <span className="text-red-700 text-[15px] w-full flex justify-end">
                  {errors.horarioFim && errors.horarioFim.message}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start w-full my-5 gap-x-7">
            <div className="flex items-center justify-center gap-x-3 ">
              <div
                className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                onClick={() => {
                  if (convidados < 30) {
                    handleCheckBoxClick("recepcionista", recepcionistaIsTrue);
                  }
                }}
              >
                {recepcionistaIsTrue && <BsCheckLg />}
              </div>
              <p className="text-[15px] font-semibold">Recepcionista</p>
            </div>
            <div className="flex items-center justify-center gap-x-3 ">
              <div
                className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                onClick={() => {
                  if (convidados < 30) {
                    handleCheckBoxClick("limpeza", limpezaIsTrue);
                  }
                }}
              >
                {limpezaIsTrue && <BsCheckLg />}
              </div>
              <p className="text-[15px] font-semibold">Limpeza</p>
            </div>
            <div className="flex items-center justify-center gap-x-3 ">
              <div
                className="w-4 h-4 border-[1px] border-gray-500 cursor-pointer brightness-75 flex justify-center items-center"
                onClick={() => {
                  if (convidados < 70) {
                    handleCheckBoxClick("seguranca", segurancaIsTrue);
                  }
                }}
              >
                {segurancaIsTrue && <BsCheckLg />}
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
      </div>

      <ButtonComponent
        title="ENVIAR"
        icon={<BiMailSend size={20} />}
        type="submit"
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
    </form>
  );
}

{
  /* <motion.div
initial={{
  x: 0,
}}
animate={{
  opacity: docMode ? 1 : 0,
  transition: {
    duration: 0.5,
  },
}}
className="flex flex-col min-w-full gap-y-2"
>
<div className="flex gap-x-4">
  <label htmlFor="rgPhotos" className="font-semibold text-[15px]">
    Documentos (RG):
  </label>
</div>
<div className="flex flex-col space-y-2 overflow-y-auto max-h-[550px] relative">
  <input
    type="file"
    id="rgPhotos"
    className="absolute opacity-0 cursor-pointer top-4"
    onChange={handleFileChange}
    multiple
  />
  <div className="h-16 w-full border-gray-400 border-dotted border-spacing-3 border-[2px] flex justify-start items-center px-5 gap-x-5 cursor-pointer hover:bg-gray-100 transition duration-300">
    <MdOutlineAddPhotoAlternate className="text-gray-600" size={25} />
    <p className="text-sm font-semibold text-gray-600 ">
      ADICIONE DOCUMENTO
    </p>
  </div>
  {uploadedFiles.map((file, index) => (
    <div
      key={index}
      className="px-2 py-2 rounded-sm border-gray-400  border-[2px] flex w-full justify-between items-center"
    >
      {file.type.startsWith("image/") && ( // Verifica se o arquivo é uma imagem
        <ImageComponent
          src={URL.createObjectURL(file)}
          alt={file.name}
          h="h-10"
          w="w-10"
          containerClassname="mr-2"
        />
      )}
      <p className="tex-sm">{file.name} </p>
      <ButtonComponent
        icon={<BiTrash className="text-gray-400" />}
        type="button"
        className="flex items-center justify-center rounded-full hover:bg-gray-200 "
        onClick={() => handleFileRemove(index)}
      />
    </div>
  ))}
</div>
</motion.div> */
}

/* 
{infoMode ? (
  <div className="flex items-end justify-end w-full">
    <ButtonComponent
      title="DOCUMENTOS"
      icon={<HiArrowRight />}
      type="button"
      onClick={async () => {
        const isValid = await trigger(); // Dispara a validação dos campos
        if (isValid) {
          setFormMode("DOCS"); // Define o modo como "DOCS"
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
          flex justify-center items-center flex-row-reverse gap-x-2
        `}
    />
  </div>
) : (
  <div className="flex items-end justify-between flex-1 w-full">
    <ButtonComponent
      title="INFORMACOES"
      icon={<HiArrowLeft />}
      type="button"
      onClick={() => setFormMode("INFO")}
      className={`
          z-30
          w-[200px]
          h-[55px]
          text-[15px]
          tracking-[3px] text-white rounded-md bg-black
          mt-6
          transition duration-300 ease-in-out transform  active:scale-90 active:transition-none active:duration-500
          flex justify-center items-center  gap-x-2
        `}
    />
    <ButtonComponent
      title="ENVIAR"
      icon={<BiMailSend size={20} />}
      type="submit"
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
)} */
