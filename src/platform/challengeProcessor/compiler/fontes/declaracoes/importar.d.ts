import { Literal } from '../construtos';
import { VisitanteComumInterface } from '../interfaces';
import { Declaracao } from './declaracao';
export declare class Importar extends Declaracao {
    caminho: Literal;
    simboloFechamento: any;
    constructor(caminho: Literal, simboloFechamento: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
