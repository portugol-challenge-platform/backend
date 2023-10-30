import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Construto } from './construto';
/**
 * Definido como `Subscript` em Égua Clássico, esse construto serve para acessar índices de
 * vetores e dicionários.
 */
export declare class AcessoIndiceVariavel implements Construto {
    linha: number;
    hashArquivo: number;
    entidadeChamada: Construto;
    simboloFechamento: SimboloInterface;
    indice: any;
    constructor(hashArquivo: number, entidadeChamada: Construto, indice: any, simboloFechamento: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
