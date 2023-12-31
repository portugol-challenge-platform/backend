import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Isto implements Construto {
    linha: number;
    hashArquivo: number;
    palavraChave: any;
    constructor(hashArquivo: number, linha: number, palavraChave?: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
