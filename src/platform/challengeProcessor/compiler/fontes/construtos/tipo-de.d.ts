import { VisitanteComumInterface, SimboloInterface, VariavelInterface } from '../interfaces';
import { Construto } from './construto';
export declare class TipoDe implements Construto {
    linha: number;
    hashArquivo: number;
    valor: any;
    simbolo: SimboloInterface;
    constructor(hashArquivo: number, simbolo: SimboloInterface, valor: any);
    aceitar(visitante: VisitanteComumInterface): Promise<VariavelInterface>;
}
