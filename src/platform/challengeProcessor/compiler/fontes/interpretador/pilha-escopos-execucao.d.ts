import { DeleguaFuncao } from '../estruturas';
import { SimboloInterface, VariavelInterface } from '../interfaces';
import { EscopoExecucao } from '../interfaces/escopo-execucao';
import { PilhaEscoposExecucaoInterface } from '../interfaces/pilha-escopos-execucao-interface';
export declare class PilhaEscoposExecucao implements PilhaEscoposExecucaoInterface {
    pilha: EscopoExecucao[];
    constructor();
    empilhar(item: EscopoExecucao): void;
    eVazio(): boolean;
    elementos(): number;
    naPosicao(posicao: number): EscopoExecucao;
    topoDaPilha(): EscopoExecucao;
    removerUltimo(): EscopoExecucao;
    private converterValor;
    definirConstante(nomeConstante: string, valor: any, subtipo?: string): void;
    definirVariavel(nomeVariavel: string, valor: any, subtipo?: string): void;
    atribuirVariavelEm(distancia: number, simbolo: any, valor: any): void;
    atribuirVariavel(simbolo: SimboloInterface, valor: any): void;
    obterEscopoPorTipo(tipo: string): EscopoExecucao | undefined;
    obterVariavelEm(distancia: number, nome: string): VariavelInterface;
    obterValorVariavel(simbolo: SimboloInterface): VariavelInterface;
    obterVariavelPorNome(nome: string): VariavelInterface;
    /**
     * Método usado pelo depurador para obter todas as variáveis definidas.
     */
    obterTodasVariaveis(todasVariaveis?: VariavelInterface[]): any[];
    /**
     * Obtém todas as funções declaradas ou por código-fonte, ou pelo desenvolvedor
     * em console, do último escopo.
     */
    obterTodasDeleguaFuncao(): {
        [nome: string]: DeleguaFuncao;
    };
    /**
     * Obtém todas as declarações de classe do último escopo.
     * @returns
     */
    obterTodasDeclaracaoClasse(): any;
}
