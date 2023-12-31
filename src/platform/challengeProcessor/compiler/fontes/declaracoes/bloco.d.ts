import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Bloco extends Declaracao {
    declaracoes: any[];
    constructor(hashArquivo: number, linha: number, declaracoes: any[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
