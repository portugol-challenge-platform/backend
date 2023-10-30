import { SimboloInterface } from '../interfaces';
export declare class ErroAvaliadorSintatico extends Error {
    simbolo: SimboloInterface;
    constructor(simbolo: SimboloInterface, mensagem: string);
}
