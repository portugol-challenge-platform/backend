import { VisitanteComumInterface, SimboloInterface, VariavelInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Variavel implements Construto {
    linha: number;
    hashArquivo: number;
    simbolo: SimboloInterface;
    constructor(hashArquivo: number, simbolo: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<VariavelInterface>;
}
