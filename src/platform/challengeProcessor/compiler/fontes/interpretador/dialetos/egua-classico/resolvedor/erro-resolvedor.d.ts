import { SimboloInterface } from '../../../../interfaces';
export declare class ErroResolvedor extends Error {
    simbolo: SimboloInterface;
    constructor(simbolo: SimboloInterface, mensagem: string);
}
