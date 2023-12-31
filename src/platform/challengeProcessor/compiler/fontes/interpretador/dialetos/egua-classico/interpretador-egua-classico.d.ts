import { EspacoVariaveis } from '../../../espaco-variaveis';
import { DeleguaFuncao } from '../../../estruturas/delegua-funcao';
import { AcessoIndiceVariavel, Atribuir, Construto, FimPara, FormatacaoEscrita, Literal, Super, TipoDe, Variavel } from '../../../construtos';
import { Classe, Const, ConstMultiplo, Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Expressao, Fazer, FuncaoDeclaracao, Importar, Leia, LeiaMultiplo, Para, ParaCada, Se, Tente, Var, VarMultiplo } from '../../../declaracoes';
import { InterpretadorInterface, ResolvedorInterface, SimboloInterface, VariavelInterface } from '../../../interfaces';
import { ErroInterpretador } from '../../../interfaces/erros/erro-interpretador';
import { RetornoInterpretador } from '../../../interfaces/retornos/retorno-interpretador';
import { ContinuarQuebra, RetornoQuebra, SustarQuebra } from '../../../quebras';
import { PilhaEscoposExecucao } from '../../pilha-escopos-execucao';
/**
 * O Interpretador visita todos os elementos complexos gerados pelo analisador sintático (Parser)
 * e de fato executa a lógica de programação descrita no código.
 */
export declare class InterpretadorEguaClassico implements InterpretadorInterface {
    resolvedor: ResolvedorInterface;
    diretorioBase: any;
    funcaoDeRetorno: Function;
    locais: Map<Construto, number>;
    erros: ErroInterpretador[];
    pilhaEscoposExecucao: PilhaEscoposExecucao;
    interfaceEntradaSaida: any;
    constructor(diretorioBase: string);
    visitarExpressaoTipoDe(expressao: TipoDe): Promise<any>;
    visitarExpressaoFalhar(expressao: any): Promise<any>;
    visitarDeclaracaoParaCada(declaracao: ParaCada): Promise<any>;
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    visitarDeclaracaoConstMultiplo(declaracao: ConstMultiplo): Promise<any>;
    visitarExpressaoFimPara(declaracao: FimPara): void;
    visitarExpressaoFormatacaoEscrita(declaracao: FormatacaoEscrita): void;
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): void;
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    visitarExpressaoLeiaMultiplo(expressao: LeiaMultiplo): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): any;
    avaliar(expressao: Construto): VariavelInterface | any;
    visitarExpressaoAgrupamento(expressao: any): any;
    eVerdadeiro(objeto: any): boolean;
    verificarOperandoNumero(operador: SimboloInterface, operando: any): void;
    visitarExpressaoUnaria(expr: any): Promise<number | boolean>;
    eIgual(esquerda: VariavelInterface | any, direita: VariavelInterface | any): boolean;
    verificarOperandosNumeros(operador: SimboloInterface, direita: VariavelInterface | any, esquerda: VariavelInterface | any): void;
    visitarExpressaoBinaria(expressao: any): Promise<any>;
    visitarExpressaoDeChamada(expressao: any): Promise<any>;
    visitarDeclaracaoDeAtribuicao(expressao: Atribuir): Promise<any>;
    procurarVariavel(simbolo: SimboloInterface, expressao: any): VariavelInterface;
    visitarExpressaoDeVariavel(expressao: Variavel): VariavelInterface;
    visitarDeclaracaoDeExpressao(declaracao: Expressao): Promise<any>;
    visitarExpressaoLogica(expressao: any): Promise<any>;
    visitarDeclaracaoSe(declaracao: Se): Promise<any>;
    visitarDeclaracaoPara(declaracao: Para): Promise<any>;
    visitarDeclaracaoFazer(declaracao: Fazer): Promise<any>;
    visitarDeclaracaoEscolha(declaracao: Escolha): Promise<void>;
    visitarDeclaracaoTente(declaracao: Tente): Promise<any>;
    visitarDeclaracaoEnquanto(declaracao: Enquanto): Promise<any>;
    visitarDeclaracaoImportar(declaracao: Importar): Promise<void>;
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    /**
     * Empilha declarações na pilha de escopos de execução, cria um novo ambiente e
     * executa as declarações empilhadas.
     *
     * Se o retorno do último bloco foi uma exceção (normalmente um erro em tempo de execução),
     * atira a exceção daqui.
     * Isso é usado, por exemplo, em blocos `tente ... pegue ... finalmente`.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    executarBloco(declaracoes: Declaracao[], ambiente?: EspacoVariaveis): Promise<any>;
    visitarExpressaoBloco(declaracao: any): Promise<any>;
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoVar(declaracao: Var): Promise<any>;
    visitarDeclaracaoVarMultiplo(declaracao: VarMultiplo): Promise<void>;
    visitarExpressaoContinua(declaracao?: any): ContinuarQuebra;
    visitarExpressaoSustar(declaracao?: any): SustarQuebra;
    visitarExpressaoRetornar(declaracao: any): Promise<RetornoQuebra>;
    visitarExpressaoDeleguaFuncao(expressao: any): DeleguaFuncao;
    visitarExpressaoAtribuicaoPorIndice(expressao: any): Promise<void>;
    visitarExpressaoAcessoIndiceVariavel(expressao: AcessoIndiceVariavel | any): Promise<any>;
    visitarExpressaoDefinirValor(expressao: any): Promise<any>;
    visitarDeclaracaoDefinicaoFuncao(declaracao: FuncaoDeclaracao): void;
    visitarDeclaracaoClasse(declaracao: Classe): Promise<any>;
    visitarExpressaoAcessoMetodo(expressao: any): Promise<any>;
    visitarExpressaoIsto(expressao: any): VariavelInterface;
    visitarExpressaoDicionario(expressao: any): Promise<{}>;
    visitarExpressaoVetor(expressao: any): Promise<any[]>;
    visitarExpressaoSuper(expressao: Super): any;
    paraTexto(objeto: any): any;
    executar(declaracao: Declaracao, mostrarResultado?: boolean): Promise<any>;
    /**
     * Executa o último escopo empilhado no topo na pilha de escopos do Interpretador.
     * Originalmente, Égua não trabalha com uma pilha de escopos.
     *
     * O tratamento das exceções é feito de acordo com o bloco chamador.
     * Por exemplo, em `tente ... pegue ... finalmente`, a exceção é capturada e tratada.
     * Em outros blocos, pode ser desejável ter o erro em tela.
     *
     * Essa implementação é derivada do Interpretador de Delégua, mas simulando todos os
     * comportamos do interpretador Égua original.
     * Interpretador Égua: https://github.com/eguatech/egua/blob/master/src/interpreter.js
     * @returns O resultado da execução do escopo, se houver.
     */
    executarUltimoEscopo(): Promise<any>;
    interpretar(declaracoes: Declaracao[]): Promise<RetornoInterpretador>;
    finalizacao(): void;
}
