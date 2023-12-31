import { VisitanteComumInterface, SimboloInterface, VariavelInterface } from '../interfaces';
import { Construto } from './construto';
/**
 * Este construto existe para alguns dialetos, como Potigol, onde
 * não é possível definir se um construto é constante, variável,
 * identificador de função, tipo ou classe no momento da avaliação
 * primária.
 *
 * Durante o restante da avaliação sintática, esse construto deve **obrigatoriamente**
 * resolver para `Constante`, `Variavel` ou algum construto de chamada/declaração de
 * função.
 */
export declare class ConstanteOuVariavel implements Construto {
    linha: number;
    hashArquivo: number;
    simbolo: SimboloInterface;
    constructor(hashArquivo: number, simbolo: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<VariavelInterface>;
}
