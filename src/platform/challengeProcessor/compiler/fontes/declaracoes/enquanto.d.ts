import { Construto } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Enquanto extends Declaracao {
    condicao: Construto;
    corpo: any;
    constructor(condicao: Construto, corpo: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
