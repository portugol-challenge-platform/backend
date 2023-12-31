import { AvaliadorSintaticoInterface, SimboloInterface } from '../../interfaces';
import { Chamada, FuncaoConstruto, Construto } from '../../construtos';
import { ErroAvaliadorSintatico } from '../erro-avaliador-sintatico';
import { Classe, Continua, Enquanto, Escolha, Escreva, Expressao, Fazer, FuncaoDeclaracao as FuncaoDeclaracao, Importar, Para, Sustar, Retorna, Se, Tente, Var, Leia, Const, Declaracao } from '../../declaracoes';
import { RetornoAvaliadorSintatico } from '../../interfaces/retornos/retorno-avaliador-sintatico';
import { RetornoLexador } from '../../interfaces/retornos/retorno-lexador';
import { RetornoDeclaracao, RetornoPrimario } from '../retornos';
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 *
 * Esta implementação tenta seguir à risca o que está atualmente em https://github.com/eguatech/egua/blob/master/src/parser.js.
 */
export declare class AvaliadorSintaticoEguaClassico implements AvaliadorSintaticoInterface<SimboloInterface, Declaracao> {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];
    hashArquivo: number;
    atual: number;
    blocos: number;
    constructor(simbolos?: SimboloInterface[]);
    declaracaoDeConstantes(): Const[];
    declaracaoDeVariaveis(): Var[];
    declaracaoLeia(): Leia;
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
    finalizarChamada(entidadeChamada: RetornoPrimario): Chamada;
    chamar(): Construto;
    unario(): Construto;
    exponenciacao(): Construto;
    multiplicar(): Construto;
    adicaoOuSubtracao: any;
    adicionar(): Construto;
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
    blocoEscopo(): RetornoDeclaracao[];
    declaracaoSe(): Se;
    declaracaoEnquanto(): Enquanto;
    declaracaoPara(): Para;
    declaracaoSustar(): Sustar;
    declaracaoContinua(): Continua;
    declaracaoRetorna(): Retorna;
    declaracaoEscolha(): Escolha;
    declaracaoImportar(): Importar;
    declaracaoTente(): Tente;
    declaracaoFazer(): Fazer;
    resolverDeclaracao(): any;
    declaracaoDeVariavel(): Var;
    funcao(kind: string): FuncaoDeclaracao;
    corpoDaFuncao(kind: string): FuncaoConstruto;
    declaracaoDeClasse(): Classe;
    resolverDeclaracaoForaDeBloco(): RetornoDeclaracao;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
