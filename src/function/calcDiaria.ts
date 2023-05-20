import { limpezaValues, recepcionistaValue, segurancaValue } from "@/constants/calc";

export function calcDiaria(convidados: number,extras: boolean[] ): number {
    let valorBase = 0;
    let extrasList =  extras.filter((data) => data)

    switch (true) {
      case  convidados < 10 :
        valorBase = 1500
        return valorBase + (extrasList.length * 200);
      case convidados <  15:
        valorBase = 1750;
        return valorBase + (extrasList.length * 200);
      case convidados <  20:
        valorBase = 2000;
        return valorBase + (extrasList.length * 200);
      case convidados <  30:
        valorBase = 2500;
        return valorBase +  (extrasList.length  * 200);
      case convidados <  40:
        valorBase = 3000;
        return valorBase +  (extrasList.length  * 200);
      case convidados <  50:
        valorBase = 3500;
        return valorBase +  (extrasList.length  * 200);
      case convidados <  60:
        valorBase = 4000;
        return valorBase +  (extrasList.length  * 200);
      case convidados <  70: 
        valorBase = 4500;
        return valorBase + segurancaValue + recepcionistaValue + limpezaValues
      case convidados <  80:
        valorBase = 5000;
        return valorBase + segurancaValue + recepcionistaValue + limpezaValues
      case convidados <  90:
        valorBase = 5500;
        return valorBase + segurancaValue + recepcionistaValue + limpezaValues
      case convidados <  100:
        valorBase = 6000;
        return valorBase + segurancaValue + recepcionistaValue + limpezaValues
      default:
        // Caso o número de participantes não esteja nas condições acima
       return 0;
    }
  }