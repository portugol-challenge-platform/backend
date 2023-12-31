import { Construto, FuncaoConstruto } from '../../construtos';
import { Escreva, Declaracao, Se, Enquanto, Para, Escolha, Fazer, FuncaoDeclaracao, Expressao, Leia, Var } from '../../declaracoes';
import { RetornoLexador, RetornoAvaliadorSintatico } from '../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../avaliador-sintatico-base';
import { ParametroInterface, SimboloInterface } from '../../interfaces';
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 */
export declare class AvaliadorSintaticoPortugolStudio extends AvaliadorSintaticoBase {
    private validarEscopoPrograma;
    comparacaoIgualdade(): Construto;
    primario(): Construto;
    chamar(): Construto;
    atribuir(): Construto;
    declaracaoEscreva(): Escreva;
    blocoEscopo(): Declaracao[];
    declaracaoSe(): Se;
    declaracaoEnquanto(): Enquanto;
    declaracaoEscolha(): Escolha;
    /**
     * No Portugol Studio, a palavra reservada é `faca`, sem acento.
     */
    declaracaoFazer(): Fazer;
    protected logicaComumParametros(): ParametroInterface[];
    corpoDaFuncao(tipo: string): FuncaoConstruto;
    /**
     * Declaração de apenas uma variável.
     * Neste caso, o símbolo que determina o tipo da variável já foi consumido,
     * e o retorno conta com apenas uma variável retornada.
     */
    declaracaoDeVariavel(): Var;
    declaracaoCadeiasCaracteres(): Var[];
    declaracaoCaracteres(): Var[];
    declaracaoExpressao(): Expressao;
    protected declaracaoVetorInteiros(simboloInteiro: SimboloInterface, identificador: SimboloInterface, posicoes: number): Var;
    protected declaracaoTrivialInteiro(simboloInteiro: SimboloInterface, identificador: SimboloInterface): Var;
    declaracaoInteiros(): Var[];
    /**
     * Análise de uma declaração `leia()`. No VisuAlg, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia(): Leia;
    declaracaoLogicos(): Var[];
    declaracaoPara(): Para;
    declaracaoReais(): Var[];
    expressao(): Construto;
    funcao(tipo: string): FuncaoDeclaracao;
    resolverDeclaracaoForaDeBloco(): Declaracao | Declaracao[] | Construto | Construto[] | any;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
