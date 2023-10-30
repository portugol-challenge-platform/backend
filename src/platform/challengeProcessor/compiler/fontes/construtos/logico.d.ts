import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Logico implements Construto {
    linha: number;
    hashArquivo: number;
    esquerda: any;
    operador: SimboloInterface;
    direita: any;
    constructor(hashArquivo: number, esquerda: any, operador: SimboloInterface, direita: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
