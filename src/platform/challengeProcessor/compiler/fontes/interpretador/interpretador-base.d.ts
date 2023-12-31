import { EspacoVariaveis } from '../espaco-variaveis';
import { MicroLexador } from './../../fontes/lexador/micro-lexador';
import { MicroAvaliadorSintatico } from './../../fontes/avaliador-sintatico/micro-avaliador-sintatico';
import { InterpretadorInterface, SimboloInterface, VariavelInterface } from '../interfaces';
import { Bloco, Classe, Const, ConstMultiplo, Continua, Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Expressao, Falhar, Fazer, FuncaoDeclaracao, Importar, Leia, LeiaMultiplo, Para, ParaCada, Retorna, Se, Tente, Var, VarMultiplo } from '../declaracoes';
import { DeleguaFuncao, DeleguaModulo } from '../estruturas';
import { AcessoIndiceVariavel, Agrupamento, Atribuir, Construto, FimPara, FormatacaoEscrita, Literal, Logico, Super, TipoDe, Unario, Variavel, Vetor } from '../construtos';
import { ErroInterpretador } from '../interfaces/erros/erro-interpretador';
import { RetornoInterpretador } from '../interfaces/retornos/retorno-interpretador';
import { ContinuarQuebra, RetornoQuebra, SustarQuebra } from '../quebras';
import { PilhaEscoposExecucaoInterface } from '../interfaces/pilha-escopos-execucao-interface';
/**
 * O Interpretador visita todos os elementos complexos gerados pelo avaliador sintático (_parser_),
 * e de fato executa a lógica de programação descrita no código.
 *
 * O Interpretador Base não contém dependências com o Node.js. É
 * recomendado para uso em execuções que ocorrem no navegador de internet.
 */
export declare class InterpretadorBase implements InterpretadorInterface {
    diretorioBase: string;
    erros: ErroInterpretador[];
    declaracoes: Declaracao[];
    resultadoInterpretador: Array<string>;
    expandirPropriedadesDeObjetosEmEspacoVariaveis: boolean;
    performance: boolean;
    funcaoDeRetorno: Function;
    funcaoDeRetornoMesmaLinha: Function;
    interfaceDeEntrada: any;
    interfaceEntradaSaida: any;
    pilhaEscoposExecucao: PilhaEscoposExecucaoInterface;
    microLexador: MicroLexador;
    microAvaliadorSintatico: MicroAvaliadorSintatico;
    regexInterpolacao: RegExp;
    constructor(diretorioBase: string, performance?: boolean, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    visitarExpressaoTipoDe(expressao: TipoDe): Promise<string>;
    visitarExpressaoFalhar(expressao: Falhar): Promise<any>;
    visitarExpressaoFimPara(declaracao: FimPara): void;
    avaliar(expressao: Construto | Declaracao): Promise<any>;
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo `LeiaMultiplo`.
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeiaMultiplo(expressao: LeiaMultiplo): Promise<any>;
    /**
     * Retira a interpolação de um texto.
     * @param {texto} texto O texto
     * @param {any[]} variaveis A lista de variaveis interpoladas
     * @returns O texto com o valor das variaveis.
     */
    protected retirarInterpolacao(texto: string, variaveis: any[]): string;
    /**
     * Resolve todas as interpolações em um texto.
     * @param {texto} textoOriginal O texto original com as variáveis interpoladas.
     * @returns Uma lista de variáveis interpoladas.
     */
    protected resolverInterpolacoes(textoOriginal: string, linha: number): Promise<any[]>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
    visitarExpressaoAgrupamento(expressao: Agrupamento): Promise<any>;
    eVerdadeiro(objeto: any): boolean;
    protected verificarOperandoNumero(operador: SimboloInterface, operando: any): void;
    visitarExpressaoUnaria(expressao: Unario): Promise<any>;
    visitarExpressaoFormatacaoEscrita(declaracao: FormatacaoEscrita): Promise<string>;
    protected eIgual(esquerda: VariavelInterface | any, direita: VariavelInterface | any): boolean;
    /**
     * Verifica se operandos são números, que podem ser tanto variáveis puras do JavaScript
     * (neste caso, `number`), ou podem ser variáveis de Delégua com inferência (`VariavelInterface`).
     * @param operador O símbolo do operador.
     * @param direita O operando direito.
     * @param esquerda O operando esquerdo.
     * @returns Se ambos os operandos são números ou não.
     */
    protected verificarOperandosNumeros(operador: SimboloInterface, direita: VariavelInterface | any, esquerda: VariavelInterface | any): void;
    visitarExpressaoBinaria(expressao: any): Promise<any>;
    /**
     * Executa uma chamada de função, método ou classe.
     * @param expressao A expressão chamada.
     * @returns O resultado da chamada.
     */
    visitarExpressaoDeChamada(expressao: any): Promise<any>;
    /**
     * Execução de uma expressão de atribuição.
     * @param expressao A expressão.
     * @returns O valor atribuído.
     */
    visitarDeclaracaoDeAtribuicao(expressao: Atribuir): Promise<any>;
    protected procurarVariavel(simbolo: SimboloInterface): any;
    visitarExpressaoDeVariavel(expressao: Variavel): any;
    visitarDeclaracaoDeExpressao(declaracao: Expressao): Promise<any>;
    visitarExpressaoLogica(expressao: Logico): Promise<any>;
    visitarDeclaracaoPara(declaracao: Para): Promise<any>;
    visitarDeclaracaoParaCada(declaracao: ParaCada): Promise<any>;
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    visitarDeclaracaoSe(declaracao: Se): Promise<any>;
    visitarDeclaracaoEnquanto(declaracao: Enquanto): Promise<any>;
    visitarDeclaracaoEscolha(declaracao: Escolha): Promise<any>;
    visitarDeclaracaoFazer(declaracao: Fazer): Promise<any>;
    /**
     * Interpretação de uma declaração `tente`.
     * @param declaracao O objeto da declaração.
     */
    visitarDeclaracaoTente(declaracao: Tente): Promise<any>;
    visitarDeclaracaoImportar(declaracao: Importar): Promise<DeleguaModulo>;
    protected avaliarArgumentosEscreva(argumentos: Construto[]): Promise<string>;
    /**
     * Execução de uma escrita na saída padrão, sem quebras de linha.
     * Implementada para alguns dialetos, como VisuAlg.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): Promise<any>;
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    /**
     * Empilha declarações na pilha de escopos de execução, cria um novo ambiente e
     * executa as declarações empilhadas.
     * Se o retorno do último bloco foi uma exceção (normalmente um erro em tempo de execução),
     * atira a exceção daqui.
     * Isso é usado, por exemplo, em blocos tente ... pegue ... finalmente.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    executarBloco(declaracoes: Declaracao[], ambiente?: EspacoVariaveis): Promise<any>;
    visitarExpressaoBloco(declaracao: Bloco): Promise<any>;
    protected avaliacaoDeclaracaoVarOuConst(declaracao: Const | ConstMultiplo | Var | VarMultiplo): Promise<any>;
    /**
     * Executa expressão de definição de constante.
     * @param declaracao A declaração `Const`.
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    /**
     * Executa expressão de definição de múltiplas constantes.
     * @param declaracao A declaração `ConstMultiplo`.
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoConstMultiplo(declaracao: ConstMultiplo): Promise<any>;
    visitarExpressaoContinua(declaracao?: Continua): ContinuarQuebra;
    visitarExpressaoSustar(declaracao?: any): SustarQuebra;
    visitarExpressaoRetornar(declaracao: Retorna): Promise<RetornoQuebra>;
    visitarExpressaoDeleguaFuncao(declaracao: any): DeleguaFuncao;
    visitarExpressaoAtribuicaoPorIndice(expressao: any): Promise<any>;
    visitarExpressaoAcessoIndiceVariavel(expressao: AcessoIndiceVariavel | any): Promise<any>;
    visitarExpressaoDefinirValor(expressao: any): Promise<any>;
    visitarDeclaracaoDefinicaoFuncao(declaracao: FuncaoDeclaracao): void;
    /**
     * Executa uma declaração de classe.
     * @param declaracao A declaração de classe.
     * @returns Sempre retorna nulo, por ser requerido pelo contrato de visita.
     */
    visitarDeclaracaoClasse(declaracao: Classe): Promise<any>;
    /**
     * Executa um acesso a método, normalmente de um objeto de classe.
     * @param expressao A expressão de acesso.
     * @returns O resultado da execução.
     */
    visitarExpressaoAcessoMetodo(expressao: any): Promise<any>;
    visitarExpressaoIsto(expressao: any): any;
    visitarExpressaoDicionario(expressao: any): Promise<any>;
    visitarExpressaoVetor(expressao: Vetor): Promise<any>;
    visitarExpressaoSuper(expressao: Super): any;
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoVar(declaracao: Var): Promise<any>;
    /**
     * Executa expressão de definição de múltiplas variáveis.
     * @param declaracao A declaração `VarMultiplo`.
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoVarMultiplo(declaracao: VarMultiplo): Promise<any>;
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
    /**
     * Interpretação sem depurador, com medição de performance.
     * Método que efetivamente inicia o processo de interpretação.
     * @param declaracoes Um vetor de declarações gerado pelo Avaliador Sintático.
     * @param manterAmbiente Se ambiente de execução (variáveis, classes, etc.) deve ser mantido. Normalmente usado
     *                       pelo modo REPL (LAIR).
     * @returns Um objeto com o resultado da interpretação.
     */
    interpretar(declaracoes: Declaracao[], manterAmbiente?: boolean): Promise<RetornoInterpretador>;
}
