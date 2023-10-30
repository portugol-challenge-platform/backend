import { Construto } from '../construtos';
import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { TiposDadosInterface } from '../interfaces/tipos-dados-interface';
import { Declaracao } from './declaracao';
/**
 * Uma declaração de múltiplas constantes.
 */
export declare class ConstMultiplo extends Declaracao {
    simbolos: SimboloInterface[];
    inicializador: Construto;
    tipo: TiposDadosInterface;
    constructor(simbolos: SimboloInterface[], inicializador: Construto, tipo?: TiposDadosInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
