import { Construto, FuncaoConstruto } from '../../construtos';
import { Escreva, Se, Enquanto, Para, Continua, Retorna, Escolha, Importar, Tente, Fazer, Var, FuncaoDeclaracao as FuncaoDeclaracao, Classe, Declaracao, Expressao, Sustar, Leia, Const, Falhar } from '../../declaracoes';
import { AvaliadorSintaticoInterface, SimboloInterface } from '../../interfaces';
import { Pragma } from '../../lexador/dialetos/pragma';
import { RetornoLexador } from '../../interfaces/retornos/retorno-lexador';
import { ErroAvaliadorSintatico } from '../erro-avaliador-sintatico';
import { RetornoAvaliadorSintatico } from '../../interfaces/retornos/retorno-avaliador-sintatico';
import { RetornoDeclaracao, RetornoPrimario } from '../retornos';
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 *
 * A grande diferença entre este avaliador e os demais é a forma como são entendidos os blocos de escopo.
 * Este avaliador espera uma estrutura de pragmas, que explica quantos espaços há na frente de cada linha.
 */
export declare class AvaliadorSintaticoPitugues implements AvaliadorSintaticoInterface<SimboloInterface, Declaracao> {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];
    pragmas: {
        [linha: number]: Pragma;
    };
    hashArquivo: number;
    atual: number;
    blocos: number;
    escopos: number[];
    performance: boolean;
    constructor(performance?: boolean);
    declaracaoDeConstantes(): Const[];
    declaracaoDeVariavel(): Var;
    declaracaoDeVariaveis(): any;
    sincronizar(): void;
    erro(simbolo: SimboloInterface, mensagemDeErro: string): ErroAvaliadorSintatico;
    consumir(tipo: string, mensagemDeErro: string): SimboloInterface;
    verificarTipoSimboloAtual(tipo: string): boolean;
    verificarTipoProximoSimbolo(tipo: string): boolean;
    simboloAtual(): SimboloInterface;
    simboloAnterior(): SimboloInterface;
    simboloNaPosicao(posicao: number): SimboloInterface;
    estaNoFinal(): boolean;
    avancarEDevolverAnterior(): SimboloInterface;
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean;
    primario(): RetornoPrimario;
    finalizarChamada(entidadeChamada: Construto): Construto;
    chamar(): Construto | RetornoPrimario;
    unario(): Construto;
    exponenciacao(): Construto;
    multiplicar(): Construto;
    adicaoOuSubtracao(): Construto;
    bitShift(): Construto;
    bitE(): Construto;
    bitOu(): Construto;
    comparar(): Construto;
    comparacaoIgualdade(): Construto;
    em(): Construto;
    e(): Construto;
    ou(): Construto;
    atribuir(): Construto;
    expressao(): Construto;
    declaracaoEscreva(): Escreva;
    declaracaoExpressao(): Expressao;
    declaracaoLeia(): Leia;
    blocoEscopo(): any[];
    declaracaoEnquanto(): Enquanto;
    declaracaoEscolha(): Escolha;
    declaracaoPara(): Para;
    declaracaoSe(): Se;
    declaracaoSustar(): Sustar;
    declaracaoContinua(): Continua;
    declaracaoRetorna(): Retorna;
    declaracaoImportar(): Importar;
    declaracaoTente(): Tente;
    declaracaoFazer(): Fazer;
    resolverDeclaracao(): any;
    funcao(tipo: string, construtor?: boolean): FuncaoDeclaracao;
    logicaComumParametros(): Array<object>;
    corpoDaFuncao(tipo: string): FuncaoConstruto;
    declaracaoDeClasse(): Classe;
    declaracaoFalhar(): Falhar;
    /**
     * Consome o símbolo atual, verificando se é uma declaração de função, variável, classe
     * ou uma expressão.
     * @returns Objeto do tipo `Declaracao`.
     */
    resolverDeclaracaoForaDeBloco(): RetornoDeclaracao;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
