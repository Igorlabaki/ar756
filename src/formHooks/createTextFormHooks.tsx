import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDateFormData } from "@/zod/types/createDateFormZodType";
import { createDateFormSchema } from "@/zod/schemas/createDateFormZodSchema";
import { useCreateDate } from "@/hook/reactQuery/date/useCreateDate";
import { z } from "zod";
import { useCreateText } from "@/hook/reactQuery/text/useCreateText";
import { createTextFormSchema } from "@/zod/schemas/createTextFormZodSchema";
import { CreateTextFormData } from "@/zod/types/createTextFormZodType";
import { Text } from "@prisma/client";
import useUpdateText from "@/hook/reactQuery/text/useUpdateText";

export default function UseCreateTextFormHooks(text: Text | undefined) {
  const {
    watch,
    reset,
    trigger,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTextFormData>({
    resolver: zodResolver(createTextFormSchema),
    defaultValues: {
      area: text?.area,
      text: text?.text,
      titulo: text?.titulo,
    },
  });

  const areaWatch = watch("area");
  const textWatch = watch("text");
  const tituloWatch = watch("titulo");

  const { updateTextMutate, isUpdateTextSuccess } = useUpdateText();
  const { createTextMutate, isCreateTextLoading, createText } = useCreateText();

  function handleOnSubmit(data: CreateTextFormData) {
    if (text) {
      updateTextMutate({ data, textId: text.id });
    } else {
      createTextMutate(data);
    }
  }

  return {
    watch,
    reset,
    errors,
    trigger,
    register,
    setValue,
    setError,
    areaWatch,
    getValues,
    textWatch,
    createText,
    tituloWatch,
    handleSubmit,
    handleOnSubmit,
    isCreateTextLoading,
  };
}
