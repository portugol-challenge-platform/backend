import { Construto } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Expressao extends Declaracao {
    expressao: Construto;
    constructor(expressao: Construto);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
