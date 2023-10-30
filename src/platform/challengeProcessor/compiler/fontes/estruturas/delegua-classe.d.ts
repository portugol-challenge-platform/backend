import { PropriedadeClasse } from '../declaracoes';
import { VisitanteComumInterface } from '../interfaces';
import { Chamavel } from './chamavel';
import { DeleguaFuncao } from './delegua-funcao';
import { ObjetoDeleguaClasse } from './objeto-delegua-classe';
/**
 * Estrutura de declaração de classe.
 */
export declare class DeleguaClasse extends Chamavel {
    nome: string;
    superClasse: DeleguaClasse;
    metodos: {
        [nome: string]: DeleguaFuncao;
    };
    propriedades: PropriedadeClasse[];
    dialetoRequerExpansaoPropriedadesEspacoVariaveis: boolean;
    constructor(nome?: string, superClasse?: any, metodos?: any, propriedades?: PropriedadeClasse[]);
    encontrarMetodo(nome: string): DeleguaFuncao;
    encontrarPropriedade(nome: string): PropriedadeClasse;
    paraTexto(): string;
    toString(): string;
    aridade(): number;
    chamar(visitante: VisitanteComumInterface, argumentos: any[]): Promise<ObjetoDeleguaClasse>;
}
