import { Construto } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Se extends Declaracao {
    condicao: Construto;
    caminhoEntao: Declaracao;
    caminhosSeSenao?: any[] | null;
    caminhoSenao?: Declaracao | null;
    constructor(condicao: Construto, caminhoEntao: Declaracao, caminhosSeSenao?: any[] | null, caminhoSenao?: Declaracao | null);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
