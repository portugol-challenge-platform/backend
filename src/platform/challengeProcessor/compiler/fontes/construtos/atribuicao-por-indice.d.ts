import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
export declare class AtribuicaoPorIndice implements Construto {
    linha: number;
    hashArquivo: number;
    objeto: any;
    valor: any;
    indice: any;
    constructor(hashArquivo: number, linha: number, objeto: any, indice: any, valor: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
