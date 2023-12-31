import { RetornoLexador, RetornoAvaliadorSintatico } from '../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../avaliador-sintatico-base';
import { Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Fazer, Leia, Para, Se } from '../../declaracoes';
import { Construto, FuncaoConstruto } from '../../construtos';
import { SimboloInterface } from '../../interfaces';
export declare class AvaliadorSintaticoMapler extends AvaliadorSintaticoBase {
    private criarVetorNDimensional;
    private validarDimensoesVetor;
    private logicaComumParametroMapler;
    /**
     * Validação do segmento de declaração de variáveis (opcional).
     * @returns Vetor de Construtos para inicialização de variáveis.
     */
    private validarSegmentoVariaveis;
    estaNoFinal(): boolean;
    primario(): Construto;
    comparacaoIgualdade(): Construto;
    ou(): Construto;
    /**
     * Método que resolve atribuições.
     * @returns Um construto do tipo `Atribuir`, `Conjunto` ou `AtribuicaoPorIndice`.
     */
    atribuir(): Construto;
    expressao(): Construto;
    blocoEscopo(): any[];
    chamar(): Construto;
    corpoDaFuncao(tipo: any): FuncaoConstruto;
    declaracaoEnquanto(): Enquanto;
    declaracaoEscolha(): Escolha;
    private logicaComumEscreva;
    declaracaoEscreva(): Escreva;
    declaracaoEscrevaMesmaLinha(): EscrevaMesmaLinha;
    /**
     * Criação de declaração "repita".
     * @returns Um construto do tipo Fazer
     */
    declaracaoFazer(): Fazer;
    /**
     * Criação de declaração "interrompa".
     * Em Mapler, "sustar" é chamada de "interrompa".
     * @returns Uma declaração do tipo Sustar.
     */
    private declaracaoInterrompa;
    /**
     * Análise de uma declaração `leia()`. No Mapler, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia(): Leia;
    declaracaoPara(): Para;
    /**
     * Procedimentos nada mais são do que funções que não retornam valor.
     */
    declaracaoSe(): Se;
    resolverDeclaracaoForaDeBloco(): Declaracao | Declaracao[] | Construto | Construto[] | any;
    /**
     * No Mapler, há uma determinada cadência de validação de símbolos.
     * @param retornoLexador Os símbolos entendidos pelo Lexador.
     * @param hashArquivo Obrigatório por interface mas não usado aqui.
     */
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
