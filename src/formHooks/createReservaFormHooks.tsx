import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect } from "react";
import { calcDiaria } from "@/function/calcDiaria";
import { zodResolver } from "@hookform/resolvers/zod";
import { transformDate } from "@/function/transformData";
import { calcHorasExtras } from "@/function/calcHorasExtra";
import { calcQtdHoraExtra } from "@/function/calcQtdHoraExtra";
import { calcDuracaoFesta } from "@/function/calcDuracaoFesta";
import { CreateInfoFormData } from "@/zod/types/reservaFormZodType";
import useSendEmail from "@/hook/reactQuery/email/useSendEmailOrcamento";
import { createInfoFormSchema } from "@/zod/schemas/reservaFormZodSchema";

export default function UseCreateReservaFormHooks() {
  const { sendMailMutate, IsSendMailLoading, isSendMailSuccess, sendMail } =
    useSendEmail();

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

  const nomeWatch = watch("nome");
  const emailWatch = watch("email");
  const limpezaWatch = watch("limpeza");
  const telefoneWatch = watch("telefone");
  const segurancaWatch = watch("seguranca");
  const convidadosWatch = watch("convidados");
  const horarioFimWatch = watch("horarioFim");
  const horarioInicioWatch = watch("horarioInicio");
  const recepcionistaWatch = watch("recepcionista");

  async function handleOnSubmit({
    nome,
    email,
    texto,
    limpeza,
    telefone,
    seguranca,
    convidados,
    dataInicio,
    horarioFim,
    trafegoCanal,
    horarioInicio,
    recepcionista,
    conheceEspaco,
  }: CreateInfoFormData) {
    const { dataFim, dataInicial } = transformDate({
      dataInicio: dataInicio,
      horarioFim: horarioFim,
      horarioInicio: horarioInicio,
    });

    const duracaoFesta = calcDuracaoFesta(dataInicial, dataFim);

    const diaria = calcDiaria(convidados, [limpeza, seguranca, recepcionista]);

    const qtdHorasExtras = calcQtdHoraExtra(diaria.total, duracaoFesta);
    const valorHoraExtra = calcHorasExtras(diaria.total);
    const total = diaria.total + valorHoraExtra * qtdHorasExtras;

    sendMailMutate({
      nome,
      texto,
      email,
      total,
      dataFim,
      limpeza,
      telefone,
      seguranca,
      convidados,
      trafegoCanal,
      recepcionista,
      conheceEspaco,
      qtdHorasExtras,
      valorHoraExtra,
      valorBase: diaria.total,
      dataInicio: dataInicial,
    });
  }

  const handleStartHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [hour, minutes] = e.target.value.split(":");

    setValue("horarioInicio", e.target.value);
    trigger("horarioInicio");

    const addHour = parseInt(hour) + 8;
    const hourToSet = addHour < 22 ? addHour : 22;
    const minutesToSet = addHour >= 22 ? "00" : minutes;
    setValue("horarioFim", `${hourToSet}:${minutesToSet}`);
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue("horarioFim", e.target.value);
  };

  useEffect(() => {
    if (convidadosWatch >= 30) {
      setValue("limpeza", true);
      setValue("recepcionista", true);
    }
    if (convidadosWatch >= 70) {
      setValue("limpeza", true);
      setValue("seguranca", true);
      setValue("recepcionista", true);
    }

    return () => {
      if (convidadosWatch > 30) {
        setValue("limpeza", true);
        setValue("recepcionista", true);
      }
      if (convidadosWatch > 70) {
        setValue("limpeza", true);
        setValue("seguranca", true);
        setValue("recepcionista", true);
      }
    };
  }, [convidadosWatch, setValue]);

  return {
    watch,
    reset,
    errors,
    trigger,
    setValue,
    sendMail,
    register,
    nomeWatch,
    emailWatch,
    limpezaWatch,
    handleSubmit,
    telefoneWatch,
    handleOnSubmit,
    segurancaWatch,
    convidadosWatch,
    horarioFimWatch,
    IsSendMailLoading,
    isSendMailSuccess,
    horarioInicioWatch,
    recepcionistaWatch,
    handleEndHourChange,
    handleStartHourChange,
  };
}
