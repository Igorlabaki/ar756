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

