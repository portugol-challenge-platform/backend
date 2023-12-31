import { AcessoMetodo, Construto, FimPara, FormatacaoEscrita, Super, TipoDe, Variavel } from '../../../../construtos';
import { Bloco, Const, ConstMultiplo, Declaracao, EscrevaMesmaLinha, Expressao, Leia, LeiaMultiplo, ParaCada, Se, Var, VarMultiplo } from '../../../../declaracoes';
import { EspacoVariaveis } from '../../../../espaco-variaveis';
import { InterpretadorInterface, SimboloInterface } from '../../../../interfaces';
import { PilhaEscoposExecucaoInterface } from '../../../../interfaces/pilha-escopos-execucao-interface';
import { ResolvedorInterface } from '../../../../interfaces/resolvedor-interface';
import { RetornoInterpretador } from '../../../../interfaces/retornos';
import { ErroResolvedor } from './erro-resolvedor';
import { PilhaEscopos } from './pilha-escopos';
import { RetornoResolvedor } from './retorno-resolvedor';
/**
 * O Resolvedor (Resolver) é responsável por catalogar todos os identificadores complexos, como por exemplo: funções, classes, variáveis,
 * e delimitar os escopos onde esses identificadores existem.
 *
 * Exemplo: uma classe A declara dois métodos chamados M e N. Todas as variáveis declaradas dentro de M não podem ser vistas por N, e vice-versa.
 * No entanto, todas as variáveis declaradas dentro da classe A podem ser vistas tanto por M quanto por N.
 *
 * Não faz sentido ser implementado nos outros interpretadores pelos outros optarem por uma pilha de execução que
 * espera importar qualquer coisa a qualquer momento.
 */
export declare class ResolvedorEguaClassico implements ResolvedorInterface, InterpretadorInterface {
    erros: ErroResolvedor[];
    escopos: PilhaEscopos;
    locais: Map<Construto, number>;
    funcaoAtual: any;
    classeAtual: any;
    cicloAtual: any;
    interfaceEntradaSaida: any;
    diretorioBase: any;
    funcaoDeRetorno: Function;
    pilhaEscoposExecucao: PilhaEscoposExecucaoInterface;
    constructor();
    visitarExpressaoTipoDe(expressao: TipoDe): Promise<any>;
    visitarExpressaoFalhar(expressao: any): Promise<any>;
    visitarDeclaracaoParaCada(declaracao: ParaCada): Promise<any>;
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    visitarDeclaracaoConstMultiplo(declaracao: ConstMultiplo): Promise<any>;
    visitarExpressaoFimPara(declaracao: FimPara): void;
    visitarExpressaoFormatacaoEscrita(declaracao: FormatacaoEscrita): void;
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): void;
    avaliar(expressao: any): void;
    eVerdadeiro(objeto: any): boolean;
    verificarOperandoNumero(operador: SimboloInterface, operando: any): void;
    eIgual(esquerda: any, direita: any): boolean;
    verificarOperandosNumeros(operador: SimboloInterface, direita: any, esquerda: any): void;
    procurarVariavel(nome: SimboloInterface, expressao: any): void;
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    visitarExpressaoLeiaMultiplo(expressao: LeiaMultiplo): Promise<any>;
    executarBloco(declaracoes: Declaracao[], ambiente?: EspacoVariaveis): Promise<any>;
    paraTexto(objeto: any): void;
    executar(declaracao: Declaracao, mostrarResultado: boolean): void;
    interpretar(declaracoes: Declaracao[], manterAmbiente?: boolean): Promise<RetornoInterpretador>;
    finalizacao(): void;
    definir(simbolo: SimboloInterface): void;
    declarar(simbolo: SimboloInterface): void;
    inicioDoEscopo(): void;
    finalDoEscopo(): void;
    resolverLocal(expressao: Construto, simbolo: SimboloInterface): void;
    visitarExpressaoBloco(declaracao: Bloco): any;
    visitarExpressaoDeVariavel(expressao: Variavel): any;
    visitarDeclaracaoVar(declaracao: Var): any;
    visitarDeclaracaoVarMultiplo(declaracao: VarMultiplo): any;
    visitarDeclaracaoDeAtribuicao(expressao: any): any;
    resolverFuncao(funcao: any, funcType: any): void;
    visitarDeclaracaoDefinicaoFuncao(declaracao: any): any;
    visitarExpressaoDeleguaFuncao(declaracao: any): any;
    visitarDeclaracaoTente(declaracao: any): any;
    visitarDeclaracaoClasse(declaracao: any): any;
    visitarExpressaoSuper(expressao: Super): any;
    visitarExpressaoAcessoMetodo(expressao: AcessoMetodo): any;
    visitarDeclaracaoDeExpressao(declaracao: Expressao): any;
    visitarDeclaracaoSe(declaracao: Se): any;
    visitarDeclaracaoImportar(declaracao: any): void;
    visitarDeclaracaoEscreva(declaracao: any): void;
    visitarExpressaoRetornar(declaracao: any): any;
    visitarDeclaracaoEscolha(declaracao: any): void;
    visitarDeclaracaoEnquanto(declaracao: any): any;
    visitarDeclaracaoPara(declaracao: any): any;
    visitarDeclaracaoFazer(declaracao: any): any;
    visitarExpressaoBinaria(expressao: any): any;
    visitarExpressaoDeChamada(expressao: any): any;
    visitarExpressaoAgrupamento(expressao: any): any;
    visitarExpressaoDicionario(expressao: any): any;
    visitarExpressaoVetor(expressao: any): any;
    visitarExpressaoAcessoIndiceVariavel(expressao: any): any;
    visitarExpressaoContinua(declaracao?: any): any;
    visitarExpressaoSustar(declaracao?: any): any;
    visitarExpressaoAtribuicaoPorIndice(expressao?: any): any;
    visitarExpressaoLiteral(expressao?: any): any;
    visitarExpressaoLogica(expressao?: any): any;
    visitarExpressaoUnaria(expressao?: any): any;
    visitarExpressaoDefinirValor(expressao?: any): any;
    visitarExpressaoIsto(expressao?: any): any;
    resolver(declaracoes: Construto | Declaracao | Declaracao[]): RetornoResolvedor;
}
