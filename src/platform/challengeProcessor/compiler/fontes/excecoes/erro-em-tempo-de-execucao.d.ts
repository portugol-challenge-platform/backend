import { SimboloInterface } from '../interfaces';
export declare class ErroEmTempoDeExecucao extends Error {
    simbolo: SimboloInterface;
    mensagem: string;
    linha?: number;
    constructor(simbolo?: SimboloInterface, mensagem?: string, linha?: number);
}
