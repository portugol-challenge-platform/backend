import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Dicionario implements Construto {
    linha: number;
    hashArquivo: number;
    chaves: any;
    valores: any;
    constructor(hashArquivo: number, linha: number, chaves: any, valores: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
