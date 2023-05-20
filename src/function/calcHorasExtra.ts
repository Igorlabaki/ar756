export function calcHorasExtras(duracaoFesta: number, diaria: number){
    if(diaria){
        const valorHoraExtra =  diaria / duracaoFesta
        return valorHoraExtra
    }
    return 0
} 