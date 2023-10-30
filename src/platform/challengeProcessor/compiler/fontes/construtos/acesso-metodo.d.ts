import { VisitanteComumInterface, SimboloInterface } from '../interfaces';
import { Construto } from './construto';
/**
 * Chamado de `Get` em Égua Clássico, é o construto de acesso a métodos ou membros de
 * classe.
 */
export declare class AcessoMetodo implements Construto {
    linha: number;
    hashArquivo: number;
    objeto: Construto;
    simbolo: SimboloInterface;
    constructor(hashArquivo: number, objeto: Construto, simbolo: SimboloInterface);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
