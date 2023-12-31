import { Atribuir, Binario, Construto, FimPara, Literal, Logico, Super, TipoDe, Unario, Variavel } from '../../../construtos';
import { Bloco, Classe, Const, Continua, Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Expressao, Fazer, FuncaoDeclaracao, Leia, Para, ParaCada, Retorna, Se, Tente, Var } from '../../../declaracoes';
import { EspacoVariaveis } from '../../../espaco-variaveis';
import { SimboloInterface, VariavelInterface } from '../../../interfaces';
import { ErroInterpretador } from '../../../interfaces/erros/erro-interpretador';
import { InterpretadorInterfaceBirl } from '../../../interfaces/interpretador-interface-birl';
import { PilhaEscoposExecucaoInterface } from '../../../interfaces/pilha-escopos-execucao-interface';
import { RetornoInterpretador } from '../../../interfaces/retornos';
import { ContinuarQuebra, RetornoQuebra, SustarQuebra } from '../../../quebras';
import { InterpretadorBase } from '../../interpretador-base';
export declare class InterpretadorBirl extends InterpretadorBase implements InterpretadorInterfaceBirl {
    diretorioBase: any;
    funcaoDeRetorno: Function;
    funcaoDeRetornoMesmaLinha: Function;
    pilhaEscoposExecucao: PilhaEscoposExecucaoInterface;
    interfaceEntradaSaida: any;
    erros: ErroInterpretador[];
    declaracoes: Declaracao[];
    resultadoInterpretador: Array<string>;
    regexInterpolacao: RegExp;
    expressoesStringC: {
        '%d': string;
        '%i': string;
        '%u': string;
        '%f': string;
        '%F': string;
        '%e': string;
        '%E': string;
        '%g': string;
        '%G': string;
        '%x': string;
        '%X': string;
        '%o': string;
        '%s': string;
        '%c': string;
        '%p': string;
    };
    constructor(diretorioBase: string, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    visitarExpressaoTipoDe(expressao: TipoDe): Promise<any>;
    visitarExpressaoFalhar(expressao: any): Promise<any>;
    avaliar(expressao: Construto | Declaracao): Promise<any>;
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
    visitarExpressaoAgrupamento(expressao: any): Promise<any>;
    protected verificarOperandoNumero(operador: SimboloInterface, operando: any): void;
    visitarExpressaoUnaria(expressao: Unario): Promise<any>;
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
    visitarExpressaoBinaria(expressao: Binario): Promise<any>;
    /**
     * Executa uma chamada de função, método ou classe.
     * @param expressao A expressão chamada.
     * @returns O resultado da chamada.
     */
    visitarExpressaoDeChamada(expressao: any): Promise<any>;
    visitarDeclaracaoDeAtribuicao(expressao: Atribuir): Promise<void>;
    protected procurarVariavel(simbolo: SimboloInterface): any;
    visitarExpressaoDeVariavel(expressao: Variavel): any;
    visitarDeclaracaoDeExpressao(declaracao: Expressao): Promise<void>;
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
    visitarExpressaoLogica(expressao: Logico): Promise<any>;
    visitarDeclaracaoPara(declaracao: Para): Promise<any>;
    visitarDeclaracaoParaCada(declaracao: ParaCada): Promise<any>;
    eVerdadeiro(objeto: any): boolean;
    /**
     * Executa uma expressão Se, que tem uma condição, pode ter um bloco
     * Senão, e múltiplos blocos Senão-se.
     * @param declaracao A declaração Se.
     * @returns O resultado da avaliação do bloco cuja condição é verdadeira.
     */
    visitarDeclaracaoSe(declaracao: Se): Promise<any>;
    visitarExpressaoFimPara(declaracao: FimPara): Promise<void>;
    visitarDeclaracaoFazer(declaracao: Fazer): Promise<void>;
    visitarDeclaracaoEscolha(declaracao: Escolha): Promise<void>;
    visitarDeclaracaoTente(declaracao: Tente): Promise<void>;
    visitarDeclaracaoEnquanto(declaracao: Enquanto): Promise<any>;
    substituirValor(stringOriginal: string, novoValor: number | string | any, simboloTipo: string): Promise<string>;
    resolveQuantidadeDeInterpolacoes(texto: Literal): Promise<RegExpMatchArray>;
    verificaTipoDaInterpolação(dados: {
        tipo: string;
        valor: any;
    }): Promise<boolean>;
    avaliarArgumentosEscreva(argumentos: Construto[]): Promise<string>;
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): Promise<void>;
    visitarExpressaoBloco(declaracao: Bloco): Promise<any>;
    protected avaliacaoDeclaracaoVarOuConst(declaracao: Var): Promise<any>;
    /**
     * Executa expressão de definição de variável.
     * @param declaracao A declaração Var
     * @returns Sempre retorna nulo.
     */
    visitarDeclaracaoVar(declaracao: Var): Promise<any>;
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    visitarExpressaoContinua(declaracao?: Continua): ContinuarQuebra;
    visitarExpressaoSustar(declaracao?: any): SustarQuebra;
    visitarExpressaoRetornar(declaracao: Retorna): Promise<RetornoQuebra>;
    visitarExpressaoAtribuicaoPorIndice(expressao: any): Promise<any>;
    visitarExpressaoAcessoIndiceVariavel(expressao: any): Promise<void>;
    visitarExpressaoDefinirValor(expressao: any): Promise<void>;
    visitarDeclaracaoDefinicaoFuncao(declaracao: FuncaoDeclaracao): void;
    visitarDeclaracaoClasse(declaracao: Classe): Promise<void>;
    visitarExpressaoAcessoMetodo(expressao: any): Promise<void>;
    visitarExpressaoIsto(expressao: any): void;
    visitarExpressaoDicionario(expressao: any): Promise<void>;
    visitarExpressaoVetor(expressao: any): Promise<void>;
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
