import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
/**
 * Chamada de funções, métodos, etc.
 */
export declare class Chamada implements Construto {
    id: string;
    linha: number;
    hashArquivo: number;
    entidadeChamada: Construto;
    argumentos: any[];
    parentese: any;
    constructor(hashArquivo: number, entidadeChamada: Construto, parentese: any, argumentos: any[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
