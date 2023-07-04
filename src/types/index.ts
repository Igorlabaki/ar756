import { DateEvent, Orcamento } from "@prisma/client";

export interface ImageGridType{
    url:string;
    alt:string;
    gridPosition:string;
    position:number
}

export interface GridPositionToClasses  {
    [key: string]: string;
}

export interface ComentarioType{
    username: string,
    createdAt: string,
    comentario: string,
    avatar: string
}
export interface DataEventExtendOrcamento extends DateEvent{
    orcamento:{
        id:string
        trafegoCanal: string;
        conheceEspaco: boolean;
        dataFim: Date;
        dataInicio: Date;
        seguranca: boolean;
        limpeza: boolean;
        recepcionista: boolean;
        nome: string;
        email: string;
        telefone: string;
        texto: string;
        convidados: number;
        valorBase:      number
        qtdHorasExtras: number
        valorHoraExtra: number
        total:          number
        aprovado: boolean; 
    }
}


export interface EventInfo{
    end: string,
    title: string,
    start: string,
    extendedProps: {
        additionalInfo: {
            nome: string,
            dataId: string,
            resourceId: string,
            tipoEvento: string,
            orcamentoId: string,
        },
    },
}

export interface CreateOrcamentoReqBody{
    trafegoCanal: string;
    conheceEspaco: boolean;
    dataFim: Date;
    dataInicio: Date;
    seguranca: boolean;
    limpeza: boolean;
    recepcionista: boolean;
    nome: string;
    email: string;
    telefone: string;
    texto: string;
    convidados: number;
    valorBase:      number
    qtdHorasExtras: number
    valorHoraExtra: number
    total:          number
    aprovado: boolean;
}
export interface CreateOrcAprovadoClienteReqBody{
    documentos?: { fileName: string; base64String?: unknown; }[] | undefined
    feedback?: string | undefined
    aprovadoCliente: boolean
    orcamentoId: string
}
export interface SendFeddbackEmailReqBody{
    feedback?: string | undefined
    aprovadoCliente: boolean
    orcamentoId: string
}
export interface AddNewImageReqBody{
    area: string
    legenda: string
    imageUrl: string 
}
export interface CreateTextReqBody{
    area: string
    text: string 
    titulo: string
}
export interface GetOrcamentoByIdReqBody{
    id:string,  
}

export interface IBase64Files {
    fileName: string;
    base64String: unknown;
}
export interface ErrorMessage {
    errorMessage: string;
}

export interface IDataEvent extends DateEvent {
    orcamento: Orcamento
}