import { Construto } from '../construtos';
import { SimboloInterface, VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
/**
 * Declaração que pede a leitura de uma informação pela entrada
 * configurada no início da aplicação (por exemplo, o console).
 */
export declare class Leia extends Declaracao {
    simbolo: SimboloInterface;
    id: string;
    argumentos: Construto[];
    tipo?: string;
    numeroArgumentosEsperados?: number;
    constructor(simbolo: SimboloInterface, argumentos: Construto[]);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
