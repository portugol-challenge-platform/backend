import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Vetor implements Construto {
    linha: number;
    hashArquivo: number;
    valores: any[];
    constructor(hashArquivo: number, linha: number, valores: any[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
