import { VisitanteComumInterface, ParametroInterface } from '../interfaces';
import { Construto } from './construto';
export declare class FuncaoConstruto implements Construto {
    linha: number;
    hashArquivo: number;
    parametros: ParametroInterface[];
    tipoRetorno?: string;
    corpo: any[];
    constructor(hashArquivo: number, linha: number, parametros: ParametroInterface[], corpo: any[], tipoRetorno?: string);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
