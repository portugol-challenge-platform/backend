import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Sustar extends Declaracao {
    constructor(simbolo: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
