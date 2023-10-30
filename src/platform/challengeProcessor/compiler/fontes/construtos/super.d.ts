import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Construto } from './construto';
export declare class Super implements Construto {
    linha: number;
    hashArquivo: number;
    simboloChave: SimboloInterface;
    metodo: SimboloInterface;
    constructor(hashArquivo: number, simboloChave: SimboloInterface, metodo: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
