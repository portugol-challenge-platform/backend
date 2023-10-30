import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Fazer extends Declaracao {
    caminhoFazer: any;
    condicaoEnquanto: any;
    constructor(hashArquivo: number, linha: number, caminhoFazer: any, condicaoEnquanto: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
