import { Atribuir, Construto, FimPara, FormatacaoEscrita, Literal, Super, TipoDe, Variavel } from '../../../construtos';
import { Bloco, Classe, Const, ConstMultiplo, Continua, Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Expressao, Fazer, FuncaoDeclaracao, Importar, Leia, LeiaMultiplo, Para, ParaCada, Retorna, Se, Sustar, Tente, Var, VarMultiplo } from '../../../declaracoes';
import { EspacoVariaveis } from '../../../espaco-variaveis';
import { InterpretadorInterface, SimboloInterface, VariavelInterface } from '../../../interfaces';
import { ErroInterpretador } from '../../../interfaces/erros/erro-interpretador';
import { PilhaEscoposExecucaoInterface } from '../../../interfaces/pilha-escopos-execucao-interface';
import { RetornoInterpretador } from '../../../interfaces/retornos';
import { ContinuarQuebra, RetornoQuebra, SustarQuebra } from '../../../quebras';
export declare class InterpretadorPortugolIpt implements InterpretadorInterface {
    diretorioBase: any;
    funcaoDeRetorno: Function;
    funcaoDeRetornoMesmaLinha: Function;
    pilhaEscoposExecucao: PilhaEscoposExecucaoInterface;
    interfaceEntradaSaida: any;
    declaracoes: Declaracao[];
    erros: ErroInterpretador[];
    resultadoInterpretador: Array<string>;
    constructor(diretorioBase: string, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    visitarExpressaoTipoDe(expressao: TipoDe): Promise<any>;
    visitarExpressaoFalhar(expressao: any): Promise<any>;
    visitarDeclaracaoParaCada(declaracao: ParaCada): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
    avaliar(expressao: Construto | Declaracao): Promise<any>;
    visitarExpressaoAgrupamento(expressao: any): Promise<any>;
    visitarExpressaoUnaria(expressao: any): void;
    /**
     * Verifica se operandos são números, que podem ser tanto variáveis puras do JavaScript
     * (neste caso, `number`), ou podem ser variáveis de Delégua com inferência (`VariavelInterface`).
     * @param operador O símbolo do operador.
     * @param direita O operando direito.
     * @param esquerda O operando esquerdo.
     * @returns Se ambos os operandos são números ou não.
     */
    protected verificarOperandosNumeros(operador: SimboloInterface, direita: VariavelInterface | any, esquerda: VariavelInterface | any): void;
    protected eIgual(esquerda: VariavelInterface | any, direita: VariavelInterface | any): boolean;
    visitarExpressaoBinaria(expressao: any): Promise<any>;
    visitarExpressaoDeChamada(expressao: any): void;
    visitarDeclaracaoDeAtribuicao(expressao: Atribuir): void;
    protected procurarVariavel(simbolo: SimboloInterface): any;
    visitarExpressaoDeVariavel(expressao: Variavel): any;
    visitarDeclaracaoDeExpressao(declaracao: Expressao): void;
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    visitarExpressaoLeiaMultiplo(expressao: LeiaMultiplo): Promise<any>;
    visitarExpressaoLogica(expressao: any): void;
    eVerdadeiro(objeto: any): boolean;
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    visitarDeclaracaoSe(declaracao: Se): Promise<any>;
    visitarDeclaracaoPara(declaracao: Para): Promise<never>;
    visitarExpressaoFimPara(declaracao: FimPara): void;
    visitarDeclaracaoFazer(declaracao: Fazer): void;
    visitarExpressaoFormatacaoEscrita(declaracao: FormatacaoEscrita): Promise<string>;
    visitarDeclaracaoEscolha(declaracao: Escolha): void;
    visitarDeclaracaoTente(declaracao: Tente): void;
    visitarDeclaracaoEnquanto(declaracao: Enquanto): void;
    visitarDeclaracaoImportar(declaracao: Importar): void;
    protected avaliarArgumentosEscreva(argumentos: Construto[]): Promise<string>;
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): Promise<any>;
    executarBloco(declaracoes: Declaracao[], ambiente?: EspacoVariaveis): Promise<any>;
    visitarExpressaoBloco(declaracao: Bloco): Promise<any>;
    protected avaliacaoDeclaracaoVar(declaracao: Var): Promise<any>;
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoVar(declaracao: Var): Promise<any>;
    visitarDeclaracaoVarMultiplo(declaracao: VarMultiplo): Promise<any>;
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    visitarDeclaracaoConstMultiplo(declaracao: ConstMultiplo): Promise<any>;
    visitarExpressaoContinua(declaracao?: Continua): ContinuarQuebra;
    visitarExpressaoSustar(declaracao?: Sustar): SustarQuebra;
    visitarExpressaoRetornar(declaracao: Retorna): Promise<RetornoQuebra>;
    visitarExpressaoDeleguaFuncao(expressao: any): void;
    visitarExpressaoAtribuicaoPorIndice(expressao: any): Promise<any>;
    visitarExpressaoAcessoIndiceVariavel(expressao: any): void;
    visitarExpressaoDefinirValor(expressao: any): void;
    visitarDeclaracaoDefinicaoFuncao(declaracao: FuncaoDeclaracao): void;
    visitarDeclaracaoClasse(declaracao: Classe): void;
    visitarExpressaoAcessoMetodo(expressao: any): void;
    visitarExpressaoIsto(expressao: any): void;
    visitarExpressaoDicionario(expressao: any): void;
    visitarExpressaoVetor(expressao: any): void;
    visitarExpressaoSuper(expressao: Super): void;
    paraTexto(objeto: any): any;
    /**
     * Efetivamente executa uma declaração.
     * @param declaracao A declaração a ser executada.
     * @param mostrarResultado Se resultado deve ser mostrado ou não. Normalmente usado
     *                         pelo modo LAIR.
     */
    executar(declaracao: Declaracao, mostrarResultado?: boolean): Promise<any>;
    /**
     * Executa o último escopo empilhado no topo na pilha de escopos do interpretador.
     * Esse método pega exceções, mas apenas as devolve.
     *
     * O tratamento das exceções é feito de acordo com o bloco chamador.
     * Por exemplo, em `tente ... pegue ... finalmente`, a exceção é capturada e tratada.
     * Em outros blocos, pode ser desejável ter o erro em tela.
     * @param manterAmbiente Se verdadeiro, ambiente do topo da pilha de escopo é copiado para o ambiente imediatamente abaixo.
     * @returns O resultado da execução do escopo, se houver.
     */
    executarUltimoEscopo(manterAmbiente?: boolean): Promise<any>;
    interpretar(declaracoes: Declaracao[], manterAmbiente?: boolean): Promise<RetornoInterpretador>;
}
