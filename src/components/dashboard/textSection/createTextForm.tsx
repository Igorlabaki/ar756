import React from "react";
import { Text } from "@prisma/client";
import InputComponent from "@/components/input";
import { motion, useAnimation } from "framer-motion";
import { ButtonComponent } from "@/components/button";
import UseCreateTextFormHooks from "@/formHooks/createTextFormHooks";
import { CreateTextFormData } from "@/zod/types/createTextFormZodType";
import { WarningComponent } from "@/components/warning";

interface TextFormProps {
  text?: Text;
  mode: "CREATE" | "UPDATE";
}

export function CreateTextFormComponent({ mode, text }: TextFormProps) {
  const {
    errors,
    trigger,
    setValue,
    register,
    getValues,
    createText,
    handleSubmit,
    handleOnSubmit,
    isCreateTextLoading,
  } = UseCreateTextFormHooks(text);

  const createMode = mode.includes("CREATE");

  const controlsModal = useAnimation();

  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.3 },
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(handleOnSubmit)}
        animate={controlsModal}
        className="bg-white w-[700px]  rounded-md py-5 px-5 flex flex-col gap-y-5 relative z-30 shadow-lg mt-2"
      >
        {createText?.message && (
          <WarningComponent
            text={createText?.message}
            error
            width=" w-[700px]"
          />
        )}
        {createText?.text && (
          <WarningComponent
            text={"Texto salvo com sucesso!"}
            success
            width=" w-[700px]"
          />
        )}
        <h1 className="text-[23px] w-full m-auto text-center">
          {createMode ? "CRIAR TEXTO" : "MODIFICAR TEXTO"}
        </h1>
        <InputComponent<CreateTextFormData>
          title="Area"
          entity="area"
          register={register}
          trigger={trigger}
          value={getValues("area")}
          setValue={setValue}
          errors={!!errors.area}
          errorsMsg={errors?.area?.message}
        />
        <InputComponent<CreateTextFormData>
          title="Titulo"
          entity="titulo"
          register={register}
          trigger={trigger}
          setValue={setValue}
          errors={!!errors.titulo}
          errorsMsg={errors?.titulo?.message}
        />
        <span className="text-red-700 text-[15px] w-full">
          {errors.root && errors.root.message}
        </span>
        <div className="flex flex-col mt-3 gap-y-2">
          <label htmlFor="nome" className="font-semibold text-[15px]">
            Texto
          </label>
          <textarea
            className={`bg-gray-50 outline-none rounded-md w-full h-[200px] p-2 ${
              errors.text && "border-[1px] border-red-700"
            }`}
            {...register("text", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("text", e.target.value);
                trigger("text");
              },
            })}
          />
          <span className="text-red-700 text-[15px] w-full">
            {errors.text && errors.text.message}
          </span>
        </div>
        <ButtonComponent
          title="SALVAR"
          type="submit"
          onClick={async () => {
            const isFromValid = await trigger();
            if (!isFromValid) {
              controlsModal.start(shakeAnimation);
            }
          }}
          disabled={isCreateTextLoading}
          className={`
          ${isCreateTextLoading && "animate-pulse"}
          z-30
          w-[150px]
          h-[55px]
          text-[15px]
          tracking-[3px] text-white rounded-md bg-black
          mt-6
          transition duration-300 ease-in-out transform hover:scale-110 active:scale-90 active:transition-none active:duration-500`}
        />
      </motion.form>
    </>
  );
}
