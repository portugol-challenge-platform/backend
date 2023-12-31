import { AvaliadorSintaticoInterface, ParametroInterface, SimboloInterface } from '../interfaces';
import { Construto, FuncaoConstruto } from '../construtos';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';
import { Classe, Continua, Declaracao, Enquanto, Escolha, Escreva, Expressao, Fazer, FuncaoDeclaracao as FuncaoDeclaracao, Importar, Para, Sustar, Retorna, Se, Tente, Var, Leia, ParaCada, Falhar } from '../declaracoes';
import { RetornoAvaliadorSintatico } from '../interfaces/retornos/retorno-avaliador-sintatico';
import { RetornoLexador } from '../interfaces/retornos/retorno-lexador';
import { RetornoDeclaracao } from './retornos';
import { TiposDadosInterface } from '../interfaces/tipos-dados-interface';
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 */
export declare class AvaliadorSintatico implements AvaliadorSintaticoInterface<SimboloInterface, Declaracao> {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];
    hashArquivo: number;
    atual: number;
    blocos: number;
    performance: boolean;
    constructor(performance?: boolean);
    declaracaoDeVariavel(): Var;
    erro(simbolo: SimboloInterface, mensagemDeErro: string): ErroAvaliadorSintatico;
    consumir(tipo: string, mensagemDeErro: string): SimboloInterface;
    verificarTipoSimboloAtual(tipo: string): boolean;
    verificarTipoProximoSimbolo(tipo: string): boolean;
    verificarDefinicaoTipoAtual(): TiposDadosInterface;
    simboloAtual(): SimboloInterface;
    estaNoFinal(): boolean;
    avancarEDevolverAnterior(): SimboloInterface;
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean;
    primario(): Construto;
    finalizarChamada(entidadeChamada: Construto): Construto;
    chamar(): Construto;
    unario(): Construto;
    exponenciacao(): Construto;
    multiplicar(): Construto;
    /**
     * Se símbolo de operação é `+`, `-`, `+=` ou `-=`, monta objeto `Binario` para
     * ser avaliado pelo Interpretador.
     * @returns Um Construto, normalmente um `Binario`, ou `Unario` se houver alguma operação unária para ser avaliada.
     */
    adicaoOuSubtracao(): Construto;
    bitShift(): Construto;
    bitE(): Construto;
    bitOu(): Construto;
    comparar(): Construto;
    comparacaoIgualdade(): Construto;
    em(): Construto;
    e(): Construto;
    ou(): Construto;
    /**
     * Método que resolve atribuições.
     * @returns Um construto do tipo `Atribuir`, `Conjunto` ou `AtribuicaoPorIndice`.
     */
    atribuir(): Construto;
    expressao(): Construto;
    declaracaoEscreva(): Escreva;
    declaracaoExpressao(): Expressao;
    /**
     * Declaração para comando `leia`, para ler dados de entrada do usuário.
     * @returns Um objeto da classe `Leia`.
     */
    declaracaoLeia(): Leia;
    blocoEscopo(): Array<RetornoDeclaracao>;
    declaracaoSe(): Se;
    declaracaoEnquanto(): Enquanto;
    protected declaracaoParaCada(simboloPara: SimboloInterface): ParaCada;
    protected declaracaoParaTradicional(simboloPara: SimboloInterface): Para;
    declaracaoPara(): Para | ParaCada;
    declaracaoSustar(): Sustar;
    declaracaoContinua(): Continua;
    declaracaoRetorna(): Retorna;
    declaracaoEscolha(): Escolha;
    declaracaoFalhar(): Falhar;
    declaracaoImportar(): Importar;
    declaracaoTente(): Tente;
    declaracaoFazer(): Fazer;
    /**
     * Todas as resoluções triviais da linguagem, ou seja, todas as
     * resoluções que podem ocorrer dentro ou fora de um bloco.
     * @returns Normalmente uma `Declaracao`, mas há casos em que
     * outros objetos podem ser retornados.
     * @see resolverDeclaracaoForaDeBloco para as declarações que não podem
     * ocorrer em blocos de escopo elementares.
     */
    resolverDeclaracao(): any;
    /**
     * Caso símbolo atual seja `var`, devolve uma declaração de variável.
     * @returns Um Construto do tipo Var.
     */
    protected declaracaoDeVariaveis(): any;
    /**
     * Caso símbolo atual seja `const, constante ou fixo`, devolve uma declaração de const.
     * @returns Um Construto do tipo Const.
     */
    declaracaoDeConstantes(): any;
    funcao(tipo: string): FuncaoDeclaracao;
    logicaComumParametros(): ParametroInterface[];
    corpoDaFuncao(tipo: string): FuncaoConstruto;
    declaracaoDeClasse(): Classe;
    /**
     * Declarações fora de bloco precisam ser verificadas primeiro porque
     * não é possível declarar uma classe/função dentro de um bloco `enquanto`,
     * `fazer ... enquanto`, `para`, `escolha`, etc.
     * @returns Uma função ou classe se o símbolo atual resolver aqui.
     *          O retorno de `resolverDeclaracao()` em caso contrário.
     * @see resolverDeclaracao
     */
    resolverDeclaracaoForaDeBloco(): RetornoDeclaracao;
    /**
     * Usado quando há erros na avaliação sintática.
     * Garante que o código não entre em loop infinito.
     * @returns Sempre retorna `void`.
     */
    sincronizar(): void;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
