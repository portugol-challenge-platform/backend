import { RetornoLexador, RetornoAvaliadorSintatico } from '../../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../../avaliador-sintatico-base';
import { Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Fazer, FuncaoDeclaracao, Leia, Para, Retorna, Se } from '../../../declaracoes';
import { Construto, FuncaoConstruto } from '../../../construtos';
import { ParametroInterface, SimboloInterface } from '../../../interfaces';
export declare class AvaliadorSintaticoVisuAlg extends AvaliadorSintaticoBase {
    blocoPrincipalIniciado: boolean;
    dicionarioTiposPrimitivos: {
        caracter: string;
        caractere: string;
        inteiro: string;
        logico: string;
        real: string;
    };
    constructor();
    private validarSegmentoAlgoritmo;
    private criarVetorNDimensional;
    private validarDimensoesVetor;
    private logicaComumParametroVisuAlg;
    /**
     * Validação do segmento de declaração de variáveis (opcional).
     * @returns Vetor de Construtos para inicialização de variáveis.
     */
    private validarSegmentoVar;
    private validarSegmentoInicio;
    estaNoFinal(): boolean;
    metodoBibliotecaGlobal(): Construto;
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
    private logicaCasosEscolha;
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
     * Em VisuAlg, "sustar" é chamada de "interrompa".
     * @returns Uma declaração do tipo Sustar.
     */
    private declaracaoInterrompa;
    /**
     * Análise de uma declaração `leia()`. No VisuAlg, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia(): Leia;
    declaracaoPara(): Para;
    logicaComumParametros(): ParametroInterface[];
    /**
     * Procedimentos nada mais são do que funções que não retornam valor.
     */
    declaracaoProcedimento(): FuncaoDeclaracao;
    declaracaoRetorna(): Retorna;
    declaracaoSe(): Se;
    resolverDeclaracaoForaDeBloco(): Declaracao | Declaracao[] | Construto | Construto[] | any;
    /**
     * No VisuAlg, há uma determinada cadência de validação de símbolos.
     * - O primeiro símbolo é `algoritmo`, seguido por um identificador e
     * uma quebra de linha.
     * - Os próximos símbolo pode `var`, que pode ser seguido por uma série de
     * declarações de variáveis e finalizado por uma quebra de linha,
     * ou ainda `funcao` ou `procedimento`, seguidos dos devidos símbolos que definem
     * os blocos.
     * - O penúltimo símbolo é `inicio`, seguido por uma quebra de linha.
     * Pode haver ou não declarações dentro do bloco.
     * - O último símbolo deve ser `fimalgoritmo`, que também é usado para
     * definir quando não existem mais construtos a serem adicionados.
     * @param retornoLexador Os símbolos entendidos pelo Lexador.
     * @param hashArquivo Obrigatório por interface mas não usado aqui.
     */
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
