import { VisitanteComumInterface } from '../interfaces';
declare const _default: {
    aparar: (interpretador: VisitanteComumInterface, texto: string) => Promise<string>;
    apararFim: (interpretador: VisitanteComumInterface, texto: string) => Promise<string>;
    apararInicio: (interpretador: VisitanteComumInterface, texto: string) => Promise<string>;
    concatenar: (interpretador: VisitanteComumInterface, ...texto: string[]) => Promise<string>;
    dividir: (interpretador: VisitanteComumInterface, texto: string, divisor: any, limite?: number) => Promise<string[]>;
    fatiar: (interpretador: VisitanteComumInterface, texto: string, inicio: number, fim: number) => Promise<string>;
    inclui: (interpretador: VisitanteComumInterface, texto: string, elemento: any) => Promise<boolean>;
    inverter: (interpretador: VisitanteComumInterface, texto: string) => Promise<string>;
    maiusculo: (interpretador: VisitanteComumInterface, texto: string) => Promise<string>;
    minusculo: (interpretador: VisitanteComumInterface, texto: string) => Promise<string>;
    substituir: (interpretador: VisitanteComumInterface, texto: string, elemento: string, substituto: string) => Promise<string>;
    subtexto: (interpretador: VisitanteComumInterface, texto: string, inicio: number, fim: number) => Promise<string>;
    tamanho: (interpretador: VisitanteComumInterface, texto: string) => Promise<number>;
};
export default _default;
