import { Chamavel } from './chamavel';
/**
 * Uma `FuncaoPadrao` normalmente é uma função em JavaScript.
 */
export declare class FuncaoPadrao extends Chamavel {
    valorAridade: number;
    funcao: Function;
    simbolo: any;
    constructor(valorAridade: number, funcao: Function);
    chamar(argumentos: any[], simbolo: any): Promise<any>;
    paraTexto(): string;
}
