import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDateFormData } from "@/zod/types/createDateFormZodType";
import { createDateFormSchema } from "@/zod/schemas/createDateFormZodSchema";
import { useCreateDate } from "@/hook/reactQuery/date/useCreateDate";
import { z } from "zod";

export default function UseCreateDateFormHooks() {
  const {
    watch,
    reset,
    trigger,
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDateFormData>({
    resolver: zodResolver(createDateFormSchema),
  });
  const {
    createDate,
    errorMessage,
    createDateError,
    createDateMutate,
    isCreateDateError,
  } = useCreateDate();

  const tipoWatch = watch("tipo");
  const dataWatch = watch("data");
  const orcamentoWatch = watch("orcamento");
  const horarioFimWatch = watch("horarioFim");
  const horarioInicioWatch = watch("horarioInicio");
  const orcamentoCheckWatch = watch("orcamentoCheck");

  function handleOnSubmit(data: CreateDateFormData) {
    try {
      createDateFormSchema.parse(data);
      // Lógica para enviar os dados se o formulário for válido
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err: any) => {
          const { path, message } = err;
          // Defina o erro no campo correspondente do React Hook Form
          setError(path, { message });
        });
      }
    }

    createDateMutate({ orcamentoId: data.orcamento?.id || "", ...data });
  }

  return {
    watch,
    reset,
    errors,
    trigger,
    register,
    setValue,
    setError,
    tipoWatch,
    dataWatch,
    createDate,
    errorMessage,
    handleSubmit,
    handleOnSubmit,
    orcamentoWatch,
    createDateError,
    horarioFimWatch,
    isCreateDateError,
    horarioInicioWatch,
    orcamentoCheckWatch,
  };
}
