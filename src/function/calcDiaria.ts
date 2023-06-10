export function calcDiaria(convidados: number,extras: boolean[] ): {valorBase:number, total: number} {
    let valorBase = 0;
    let total = 0;
    let extrasList =  extras.filter((data) => data)

    switch (true) {
      case  convidados < 10 :
        valorBase = 1500
        total = valorBase + (extrasList.length * 200);
        return {valorBase, total}
      case convidados <  15:
        valorBase = 1750;
         total = valorBase + (extrasList.length * 200);
      case convidados <  20:
        valorBase = 2000;
        total = valorBase + (extrasList.length * 200);
        return {valorBase, total}
      case convidados <  30:
        valorBase = 2500;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total}
      case convidados <  40:
        valorBase = 3000;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total}
      case convidados <  50:
        valorBase = 3500;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total}
      case convidados <  60:
        valorBase = 4000;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total};
      case convidados <  70: 
        valorBase = 4500;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total}
      case convidados <  80:
        valorBase = 5000;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total}
      case convidados <  90:
        valorBase = 5500;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total}
      case convidados <=  100:
        valorBase = 6000;
        total = valorBase +  (extrasList.length  * 200);
        return {valorBase, total} 
      default:
        // Caso o número de participantes não esteja nas condições acima
      return {valorBase: 0, total: 0};
    }
  }