import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
export declare class DefinirValor implements Construto {
    linha: number;
    hashArquivo: number;
    objeto: any;
    nome: any;
    valor: any;
    constructor(hashArquivo: number, linha: number, objeto: any, nome: any, valor: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
