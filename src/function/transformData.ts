
interface TransformDateParams{
    separador?:string,
    horarioFim:string,
    dataInicio: string,
    horarioInicio: string
}

export function transformDate({
    dataInicio,
    horarioFim,
    horarioInicio,
    separador
  }: TransformDateParams) {
    const [yearInicio, monthInicio, dayInicio] = dataInicio.split(separador ? "/" : "-")
    const [hourInicio, minutesInicio] = horarioInicio.split(":");
    const [hourFim, setHourFim] = horarioFim.split(":");
  
    const timezoneOffset = new Date().getTimezoneOffset();
  
    const dataInicial = new Date(
      parseInt(yearInicio),
      parseInt(monthInicio) - 1,
      parseInt(dayInicio),
      parseInt(hourInicio),
      parseInt(minutesInicio)
    );
  
    const dataFim = new Date(
      parseInt(yearInicio),
      parseInt(monthInicio) - 1,
      parseInt(dayInicio),
      parseInt(hourFim),
      parseInt(setHourFim)
    );
  
    return {
      dataInicial,
      dataFim
    };
  }