import { Construto, FuncaoConstruto } from '../construtos';
import { Classe, Continua, Declaracao, Enquanto, Escolha, Escreva, Expressao, Fazer, FuncaoDeclaracao, Importar, Leia, Para, Retorna, Se, Sustar, Tente, Var } from '../declaracoes';
import { AvaliadorSintaticoInterface, ParametroInterface, SimboloInterface } from '../interfaces';
import { RetornoAvaliadorSintatico, RetornoLexador } from '../interfaces/retornos';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';
/**
 * O Avaliador Sintático Base é uma tentativa de mapear métodos em comum
 * entre todos os outros Avaliadores Sintáticos. Depende de um dicionário
 * de tipos de símbolos comuns entre todos os dialetos.
 */
export declare abstract class AvaliadorSintaticoBase implements AvaliadorSintaticoInterface<SimboloInterface, Declaracao> {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];
    hashArquivo: number;
    atual: number;
    blocos: number;
    protected declaracaoDeVariaveis(): Var[];
    consumir(tipo: string, mensagemDeErro: string): SimboloInterface;
    erro(simbolo: SimboloInterface, mensagemDeErro: string): ErroAvaliadorSintatico;
    simboloAnterior(): SimboloInterface;
    verificarTipoSimboloAtual(tipo: string): boolean;
    verificarTipoProximoSimbolo(tipo: string): boolean;
    estaNoFinal(): boolean;
    avancarEDevolverAnterior(): SimboloInterface;
    regredirEDevolverAtual(): SimboloInterface;
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean;
    declaracaoLeia(): Leia;
    abstract primario(): Construto;
    finalizarChamada(entidadeChamada: Construto): Construto;
    abstract chamar(): Construto;
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
    /**
     * `atribuir()` deve chamar `ou()` na implementação.
     */
    abstract atribuir(): Construto;
    expressao(): Construto;
    abstract declaracaoEscreva(): Escreva;
    declaracaoExpressao(): Expressao;
    abstract blocoEscopo(): Declaracao[];
    abstract declaracaoSe(): Se;
    abstract declaracaoEnquanto(): Enquanto;
    abstract declaracaoPara(): Para;
    declaracaoSustar(): Sustar;
    declaracaoContinua(): Continua;
    declaracaoRetorna(): Retorna;
    abstract declaracaoEscolha(): Escolha;
    declaracaoImportar(): Importar;
    declaracaoTente(): Tente;
    abstract declaracaoFazer(): Fazer;
    resolverDeclaracao(): void;
    declaracaoDeVariavel(): Var;
    funcao(tipo: string): FuncaoDeclaracao;
    abstract corpoDaFuncao(tipo: string): FuncaoConstruto;
    declaracaoDeClasse(): Classe;
    protected logicaComumParametros(): ParametroInterface[];
    abstract resolverDeclaracaoForaDeBloco(): Declaracao;
    abstract analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
