import { SimboloInterface } from '../interfaces';
export declare class Simbolo implements SimboloInterface {
    lexema: string;
    tipo: string;
    literal: any;
    linha: number;
    hashArquivo: number;
    constructor(tipo: string, lexema: string, literal: any, linha: number, hashArquivo: number);
    paraTexto(): string;
}
