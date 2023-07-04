import { z } from "zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateDate } from "@/hook/reactQuery/date/useCreateDate";
import { CreateDateFormData } from "@/zod/types/createDateFormZodType";
import { createDateFormSchema } from "@/zod/schemas/createDateFormZodSchema";
import { transformDate } from "@/function/transformData";

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

    const { dataFim, dataInicial } = transformDate({
      dataInicio: data.data,
      horarioFim: data.horarioFim,
      horarioInicio: data.horarioInicio,
    });

    createDateMutate({
      dataFim: dataFim,
      tipo: data.tipo,
      titulo: data.titulo,
      dataInicio: dataInicial,
      orcamentoId: data.orcamento?.id || "",
    });
  }

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("horarioInicio", e.target.value);
    trigger("horarioInicio");

    if (tipoWatch === "Visita") {
      if (e.target.value.endsWith("30")) {
        setValue("horarioFim", `${parseInt(hour) + 1}:00`);
        trigger("horarioFim");
      } else {
        setValue("horarioFim", `${hour}:30`);
        trigger("horarioFim");
      }
    } else {
      const addHour = parseInt(hour) + 8;
      const hourToSet = addHour < 22 ? addHour : 22;
      const minutesToSet = addHour >= 22 ? "00" : minutes;
      setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
    }
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("horarioFim", e.target.value);
  };

  useEffect(() => {
    if (tipoWatch === "Visita" && horarioInicioWatch) {
      const [hour, minutes] = horarioInicioWatch?.split(":");
      if (horarioInicioWatch.endsWith("30")) {
        setValue("horarioFim", `${parseInt(hour) + 1}:00`);
        trigger("horarioFim");
      } else {
        setValue("horarioFim", `${hour}:30`);
        trigger("horarioFim");
      }
    } else if (tipoWatch === "Evento" && horarioInicioWatch) {
      const [hour, minutes] = horarioInicioWatch?.split(":");
      const addHour = parseInt(hour) + 8;
      const hourToSet = addHour < 22 ? addHour : 22;
      const minutesToSet = addHour >= 22 ? "00" : minutes;
      setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
    } else if (tipoWatch === "Outros" && horarioInicioWatch) {
      const [hour, minutes] = horarioInicioWatch?.split(":");
      const addHour = parseInt(hour) + 1;
      const hourToSet = addHour < 22 ? addHour : 22;
      const minutesToSet = addHour >= 22 ? "00" : minutes;
      setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
    }
  }, [tipoWatch]);

  useEffect(() => {
    if (orcamentoWatch && tipoWatch) {
      setValue("titulo", `${orcamentoWatch.nome} - ${tipoWatch}`);
      trigger("titulo");
    }
  }, [orcamentoWatch, tipoWatch, setValue]);

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
    handleEndHourChange,
    handleStartHourChange,
  };
}
