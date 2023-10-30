import { Construto } from '../construtos';
import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { TiposDadosInterface } from '../interfaces/tipos-dados-interface';
import { Declaracao } from './declaracao';
/**
 * Uma declaração de constante.
 */
export declare class Const extends Declaracao {
    simbolo: SimboloInterface;
    inicializador: Construto;
    tipo: TiposDadosInterface;
    constructor(simbolo: SimboloInterface, inicializador: Construto, tipo?: TiposDadosInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
