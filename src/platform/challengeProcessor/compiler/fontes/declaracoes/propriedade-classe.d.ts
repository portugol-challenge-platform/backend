import { SimboloInterface, VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class PropriedadeClasse extends Declaracao {
    nome: SimboloInterface;
    tipo?: string;
    constructor(nome: SimboloInterface, tipo?: string);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
