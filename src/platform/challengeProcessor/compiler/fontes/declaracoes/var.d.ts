import { Construto } from '../construtos';
import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { TiposDadosInterface } from '../interfaces/tipos-dados-interface';
import { Declaracao } from './declaracao';
/**
 * Uma declaração de variável.
 */
export declare class Var extends Declaracao {
    simbolo: SimboloInterface;
    inicializador: Construto;
    tipo: TiposDadosInterface;
    referencia: boolean;
    constructor(simbolo: SimboloInterface, inicializador: Construto, tipo?: TiposDadosInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
