import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Atribuir implements Construto {
    linha: number;
    hashArquivo: number;
    simbolo: SimboloInterface;
    valor: any;
    constructor(hashArquivo: number, simbolo: SimboloInterface, valor: any);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
