import { GridPositionToClasses, ImageGridType } from "@/types";

export const homeGridImages = [
    { position: 1,url: "/images/piscina-fundo.jpeg",sm:true, alt: "Piscina", gridPosition: "col-start-1 col-end-5 row-start-1 row-end-6" },
    { position: 2,url: "/images/salao-exterior-sofas.jpeg",sm:false ,alt: "Salao exterior",gridPosition: "col-start-5 col-end-7 row-start-1 row-end-3" },
    { position: 3,url: "/images/salao-exterior-geral.jpeg",sm:false ,alt: "Salao exterior", gridPosition: "col-start-5 col-end-7 row-start-3 row-end-6" },
    { position: 4,url: "/images/piscina-cima.jpeg", alt: "Piscina", gridPosition: "col-start-7 col-end-10 row-start-1 row-end-4" },
    { position: 5,url: "/images/varanda.jpeg", alt: "Varanda", gridPosition: "col-start-7 col-end-10 row-start-4 row-end-6" },
    { position: 6,url: "/images/sinuca.jpeg", alt: "Sinuca", gridPosition: "col-start-10 col-end-12 row-start-1 row-end-6" },
];

export const gridPositionToClasses: GridPositionToClasses = {
    "col-start-1 col-end-5 row-start-1 row-end-6":
    "col-start-1 col-end-5 row-start-1 row-end-6",
    "col-start-5 col-end-7 row-start-1 row-end-3":
    "col-start-5 col-end-7 row-start-1 row-end-3",
    "col-start-5 col-end-7 row-start-3 row-end-6":
    "col-start-5 col-end-7 row-start-3 row-end-6",
    "col-start-7 col-end-10 row-start-1 row-end-4":
    "col-start-7 col-end-10 row-start-1 row-end-4",
    "col-start-7 col-end-10 row-start-4 row-end-6":
    "col-start-7 col-end-10 row-start-4 row-end-6",
    "col-start-10 col-end-12 row-start-1 row-end-6":
    "col-start-10 col-end-12 row-start-1 row-end-6",
};