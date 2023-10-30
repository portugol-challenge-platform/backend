import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Declaracao } from './declaracao';
import { FuncaoConstruto } from '../construtos';
export declare class FuncaoDeclaracao extends Declaracao {
    simbolo: SimboloInterface;
    funcao: FuncaoConstruto;
    tipoRetorno?: SimboloInterface;
    constructor(simbolo: SimboloInterface, funcao: FuncaoConstruto, tipoRetorno?: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
