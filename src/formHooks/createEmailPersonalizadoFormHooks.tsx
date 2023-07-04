import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateDate } from "@/hook/reactQuery/date/useCreateDate";
import { useSendPersonalizadoEmail } from "@/hook/reactQuery/email/useSendPersonalizadoEmail";
import { SendEmailPersonalizadoFormData } from "@/zod/types/sendEmailPersonalizadoFormZodType";
import { sendEmailPersonalizadoFormSchema } from "@/zod/schemas/sendEmailPersonalizadoFormZodSchema";

export default function UseCreateEmailPersonalizadoFormHooks() {
  const { createDate, errorMessage } = useCreateDate();
  const { sendPersonalizadoEmailMutate } = useSendPersonalizadoEmail();

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

  async function handleOnSubmit(data: SendEmailPersonalizadoFormData) {
    sendPersonalizadoEmailMutate(data);
  }

  return {
    watch,
    reset,
    errors,
    trigger,
    register,
    setValue,
    createDate,
    errorMessage,
    handleSubmit,
    handleOnSubmit,
  };
}
