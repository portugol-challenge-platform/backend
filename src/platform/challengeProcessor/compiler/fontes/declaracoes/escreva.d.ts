import { Construto } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Escreva extends Declaracao {
    argumentos: Construto[];
    constructor(linha: number, hashArquivo: number, argumentos: Construto[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
