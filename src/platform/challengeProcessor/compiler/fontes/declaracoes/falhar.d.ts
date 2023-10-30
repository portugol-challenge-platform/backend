import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Falhar extends Declaracao {
    simbolo: SimboloInterface;
    explicacao: string;
    constructor(simbolo: SimboloInterface, explicacao: string);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
