import { FuncaoConstruto } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
/**
 * Declaração `tente`.
 */
export declare class Tente extends Declaracao {
    caminhoTente: any[];
    caminhoPegue: FuncaoConstruto | Declaracao[];
    caminhoSenao: any[];
    caminhoFinalmente: any[];
    constructor(hashArquivo: number, linha: number, caminhoTente: any[], caminhoPegue: FuncaoConstruto | Declaracao[], caminhoSenao: any[], caminhoFinalmente: any[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
