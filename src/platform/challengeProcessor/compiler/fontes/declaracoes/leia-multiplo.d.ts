import { Construto } from '../construtos';
import { SimboloInterface, VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
/**
 * Declaração que pede a leitura de várias informações pela entrada
 * configurada no início da aplicação (por exemplo, o console).
 */
export declare class LeiaMultiplo extends Declaracao {
    simbolo: SimboloInterface;
    id: string;
    argumentos: Construto[];
    tipo?: string;
    numeroArgumentosEsperados?: number;
    constructor(simbolo: SimboloInterface, argumentos: Construto[], numeroArgumentosEsperados?: number);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
