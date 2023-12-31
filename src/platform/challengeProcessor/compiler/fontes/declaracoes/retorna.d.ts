import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Retorna extends Declaracao {
    simboloChave: SimboloInterface;
    valor: any;
    constructor(simboloChave: SimboloInterface, valor: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
