import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonComponent } from "../button";
import { ImageComponent } from "../image";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
import { headers } from "next/dist/client/components/headers";

const createInfoFormSchema = z.object({
  horarioFim: z.string().nonempty("Este campo e obrigatorio!"),
  dataInicio: z.string().nonempty("Este campo e obrigatorio!"),
  horarioInicio: z.string().nonempty("Este campo e obrigatorio!"),
  nome: z.string().nonempty("Este campo e obrigatorio!"),
  email: z
    .string()
    .email("Email invalido!")
    .nonempty("Este campo e obrigatorio!"),
  texto: z.string().nonempty("Este campo e obrigatorio!"),
  participantes: z.string().nonempty("Este campo e obrigatorio!"),
});

type CreateInfoFormData = z.infer<typeof createInfoFormSchema>;

export default function ReservaFormComponent() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateInfoFormData>({
    resolver: zodResolver(createInfoFormSchema),
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  function handleOnSubmit({
    dataInicio,
    email,
    horarioFim,
    horarioInicio,
    nome,
    participantes,
    texto,
  }: CreateInfoFormData) {
    console.log(uploadedFiles);
    axios
      .post("/api/sendMail", {
        dataInicio,
        email,
        horarioFim,
        horarioInicio,
        nome,
        participantes,
        texto,
        uploadedFiles,
      }) // Remove the unnecessary object wrapping
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      encType="multipart/form-data"
      className="z-50 flex flex-col  gap-y-3 px-5 py-10 bg-white  w-[800px] max-h-[900px] rounded-md overflow-hidden"
    >
      <ImageComponent
        alt={"logo"}
        h={"h-[110px]"}
        w={"w-[195px]"}
        src={`/images/logo-vila-preto.png`}
        containerClassname={"z-20 rounded-md mx-auto "}
      />
      <div className="flex flex-col gap-y-2">
        <label htmlFor="nome" className="font-semibold">
          Nome
        </label>
        <input
          type="text"
          placeholder="Nome"
          {...register("nome")}
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
        <span className="text-red-700 text-[13px] w-full">
          {errors.nome && errors.nome.message}
        </span>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="nome" className="font-semibold">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
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
        <span className="text-red-700 text-[13px] w-full">
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className="flex flex-col items-start justify-start text-sm gap-y-3 gap-x-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center justify-between w-full gap-x-4">
            <div className="flex flex-col items-start justify-center gap-x-4">
              <div className="flex items-center justify-center gap-x-5">
                <label htmlFor="dataInicio" className="font-semibold">
                  Numero de participantes:
                </label>
                <input
                  type="number"
                  {...register("participantes")}
                  className={`p-2 border-2 border-gray-400 rounded-lg  ${
                    errors.participantes && "border-[1px] border-red-700 "
                  }`}
                />
              </div>
              <span className="text-red-700 text-[13px] w-full">
                {errors.participantes && errors.participantes.message}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-x-5">
                <label htmlFor="dataInicio" className="font-semibold">
                  Data do Evento:
                </label>
                <input
                  type="date"
                  {...register("dataInicio")}
                  className={`p-2 border-2 border-gray-400 rounded-lg  ${
                    errors.dataInicio && "border-[1px] border-red-700 "
                  }`}
                />
              </div>
              <span className="text-red-700 text-[13px] w-full flex justify-end">
                {errors.dataInicio && errors.dataInicio.message}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full ">
          <div>
            <div className="flex items-center justify-center gap-x-2">
              <label htmlFor="horarioInicio" className="font-semibold">
                Horario de Inicio:
              </label>
              <input
                type="time"
                {...register("horarioInicio")}
                className={`p-2 border-2 border-gray-400 rounded-lg  ${
                  errors.horarioInicio && "border-[1px] border-red-700 "
                }`}
              />
            </div>
            <span className="text-red-700 text-[13px] w-full ">
              {errors.horarioInicio && errors.horarioInicio.message}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-x-2">
              <label htmlFor="endTime" className="font-semibold">
                Horario do Fim:
              </label>
              <input
                type="time"
                {...register("horarioFim")}
                className={`p-2 border-2 border-gray-400 rounded-lg  ${
                  errors.horarioFim && "border-[1px] border-red-700 "
                }`}
              />
            </div>
            <span className="text-red-700 text-[13px] w-full flex justify-end">
              {errors.horarioFim && errors.horarioFim.message}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="nome" className="font-semibold">
          Discorra sobre o evento
        </label>
        <textarea
          className={`bg-gray-50 outline-none rounded-md w-full h-[200px] p-2 ${
            errors.texto && "border-[1px] border-red-700"
          }`}
          {...register("texto")}
        ></textarea>
        <span className="text-red-700 text-[13px] w-full">
          {errors.texto && errors.texto.message}
        </span>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-4">
          <label htmlFor="rgPhotos" className="font-semibold">
            Documentos (RG):
          </label>
          <input
            type="file"
            id="rgPhotos"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div className="flex flex-col space-y-2 overflow-y-scroll max-h-[200px]">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="px-2 py-2 rounded-sm border-black border-[2px] flex w-full justify-between items-center"
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
                icon={<BiTrash className="text-rose-600" />}
                type="button"
                onClick={() => handleFileRemove(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <ButtonComponent
        type="submit"
        title="RESERVAR"
        className={`
      z-30
      w-[150px]
      h-[55px]
      text-[15px]
      tracking-[3px] text-white rounded-md bg-black
      mt-6
      transition duration-300 ease-in-out transform hover:scale-110 active:scale-90 active:transition-none active:duration-500
    `}
      />
    </form>
  );
}
