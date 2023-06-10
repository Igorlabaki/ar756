import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "@/components/input";
import { ImageComponent } from "@/components/image";
import { motion, useAnimation } from "framer-motion";
import { ButtonComponent } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { convertFileToBase64 } from "@/function/covertBase64";
import useAddNewImage from "@/hook/reactQuery/image/useCreateImage";
import { SelectItemsZodComponent } from "@/components/selectItemsZod";
import { CreateImageFormData } from "@/zod/types/createImageFormZodType";
import { createImageFormSchema } from "@/zod/schemas/createImageFormZodSchema";
import useCreateImage from "@/hook/reactQuery/image/useCreateImage";
import { WarningComponent } from "@/components/warning";

export function CreateImageFormComponent() {
  const { IsCreateImageLoading, createImageMutate, isCreateImageSuccess } =
    useCreateImage();
  const {
    watch,
    reset,
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateImageFormData>({
    resolver: zodResolver(createImageFormSchema),
  });

  const imageUrl = watch("imageUrl");

  const [urlImage, setUrlImage] = useState<string>();

  const modalControls = useAnimation();

  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.3 },
  };

  function handleOnSubmit(data: any) {
    createImageMutate(data);
    reset();
  }

  async function handleFile(files: any) {
    if (files[0]) {
      const convertFileInBase64 = await convertFileToBase64(files[0]);
      setValue("imageUrl", convertFileInBase64);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(handleOnSubmit)}
      animate={modalControls}
      className="bg-white w-[700px] rounded-md py-5 px-5 flex flex-col items-end gap-y-5 relative"
    >
      <h1 className="text-[23px] w-full m-auto text-center">ADICIONAR FOTOS</h1>
      <div className="relative h-[400px] w-full flex flex-col gap-y-2">
        <input
          type="file"
          id="rgPhotos"
          className="absolute w-full opacity-0 cursor-pointer top-4"
          onChange={(e) => handleFile(e.target.files)}
        />
        <div className="h-16 w-full border-gray-400 border-dotted border-spacing-3 border-[2px] flex justify-start items-center px-5 gap-x-5 cursor-pointer hover:bg-gray-100 transition duration-300">
          <MdOutlineAddPhotoAlternate className="text-gray-600" size={25} />
          <p className="text-sm font-semibold text-gray-600 ">
            ADICIONE IMAGEM
          </p>
        </div>
        {imageUrl ? (
          <ImageComponent
            alt={"logo"}
            h={"h-full "}
            w={"w-full"}
            src={`data:image/jpeg;base64, ${imageUrl}`}
            containerClassname={"z-20"}
          />
        ) : (
          <div className="flex items-center justify-center flex-1 bg-gray-200">
            <MdOutlineAddPhotoAlternate className="text-gray-600" size={35} />
          </div>
        )}
        <span className="text-red-700 text-[15px] w-full">
          {errors.imageUrl && errors.imageUrl.message}
        </span>
      </div>
      <div className="flex-1 w-full">
        <InputComponent<CreateImageFormData>
          title="Legenda"
          entity="legenda"
          type="text"
          register={register}
          trigger={trigger}
          errors={!!errors.legenda}
          errorsMsg={errors?.legenda?.message}
        />
        <SelectItemsZodComponent
          title="Qual area da casa?"
          setValue={setValue}
          field={"area"}
          trigger={trigger}
          watch={watch}
          listOptions={[
            "Area Externa",
            "Salao Externo",
            "Salao Interno",
            "Casa",
          ]}
          errors={!!errors.area}
          errorsMsg={errors?.area?.message}
        />
      </div>
      <ButtonComponent
        title="SALVAR"
        type="submit"
        onClick={async () => {
          const isFromValid = await trigger();
          if (!isFromValid) {
            modalControls.start(shakeAnimation);
          }
        }}
        disabled={IsCreateImageLoading}
        className={`
      ${IsCreateImageLoading && "animate-pulse"}
      z-30
      w-[150px]
      h-[55px]
      text-[15px]
      tracking-[3px] text-white rounded-md bg-black
      mt-6
      transition duration-300 ease-in-out transform hover:scale-110 active:scale-90 active:transition-none active:duration-500`}
      />
    </motion.form>
  );
}
