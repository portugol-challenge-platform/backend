import { EspacoVariaveis } from '../espaco-variaveis';
import { Declaracao, Enquanto, Escreva, Para, Retorna } from '../declaracoes';
import { PontoParada } from '../depuracao';
import { ComandoDepurador, InterpretadorComDepuracaoInterface } from '../interfaces';
import { TipoEscopoExecucao } from '../interfaces/escopo-execucao';
import { RetornoQuebra } from '../quebras';
import { RetornoInterpretador } from '../interfaces/retornos/retorno-interpretador';
import { Chamada, Construto } from '../construtos';
import { InterpretadorBase } from './interpretador-base';
/**
 * Implementação do Interpretador com suporte a depuração.
 * Herda o Interpretador padrão de Delégua e implementa métodos a mais, que são
 * usados pelo servidor de depuração.
 * Alguns métodos do Interpretador original, como `executarBloco` e `interpretar`,
 * são reimplementados aqui.
 *
 * A separação entre `Interpretador` e `InterpretadorComDepuracao` se faz
 * necessária por uma série de motivos.
 * O primeiro deles é o desempenho. A depuração torna o desempenho do
 * Interpretador com depuração inferior ao Interpretador original pelas
 * várias verificações de controle que precisam ser feitas para a
 * funcionalidade do suporte a depuração, como verificar pontos de parada,
 * estados da pilha de execução e variáveis.
 * O segundo deles é manter o Interpretador original tão simples quanto possível.
 * Uma implementação mais simples normalmente é mais robusta.
 * O terceiro deles é o uso de memória. O Interpretador original não possui
 * uma série de variáveis implementadas aqui, o que o torna mais econômico em
 * recursos de máquina.
 */
export declare class InterpretadorComDepuracao extends InterpretadorBase implements InterpretadorComDepuracaoInterface {
    pontosParada: PontoParada[];
    finalizacaoDaExecucao: Function;
    pontoDeParadaAtivo: boolean;
    avisoPontoParadaAtivado: Function;
    escopoAtual: number;
    comando?: ComandoDepurador;
    executandoChamada: boolean;
    proximoEscopo?: TipoEscopoExecucao;
    idChamadaAtual?: string;
    passos: number;
    aoEncerrarEscopo: Function;
    constructor(diretorioBase: string, funcaoDeRetorno: Function, funcaoDeRetornoMesmaLinha: Function);
    /**
     * Quando um construto ou declaração possui id, significa que o interpretador
     * deve resolver a avaliação e guardar seu valor até o final do escopo.
     * Isso serve para quando a linguagem está em modo de depuração, e o contexto
     * da execução deixa de existir com um ponto de parada, por exemplo.
     * @param expressao A expressão a ser avaliada.
     * @returns O resultado da avaliação.
     */
    avaliar(expressao: Construto | Declaracao): Promise<any>;
    /**
     * Resolve problema de literais que tenham vírgulas, e confundem a resolução de chamadas.
     * @param valor O valor do argumento, que pode ser um literal com virgulas.
     * @returns Uma string com vírgulas escapadas.
     */
    private escaparVirgulas;
    /**
     * Gera um identificador para resolução de chamadas.
     * Usado para não chamar funções repetidamente quando usando instruções
     * de passo, como "próximo" ou "adentrar-escopo".
     * @param expressao A expressão de chamada.
     * @returns Uma `Promise` que resolve como `string`.
     */
    private gerarIdResolucaoChamada;
    visitarExpressaoDeChamada(expressao: Chamada): Promise<any>;
    visitarDeclaracaoEnquanto(declaracao: Enquanto): Promise<any>;
    avaliarArgumentosEscreva(argumentos: Construto[]): Promise<string>;
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * Se ponto de parada foi ativado durante a avaliação de argumentos, não escreve.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
    visitarDeclaracaoPara(declaracao: Para): Promise<any>;
    /**
     * Ao executar um retorno, manter o valor retornado no Interpretador para
     * uso por linhas que foram executadas com o comando `próximo` do depurador.
     * @param declaracao Uma declaracao Retorna
     * @returns O resultado da execução da visita.
     */
    visitarExpressaoRetornar(declaracao: Retorna): Promise<RetornoQuebra>;
    /**
     * Se bloco de execução já foi instanciado antes (por exemplo, quando há um ponto de parada e a
     * execução do código é retomada pelo depurador), retoma a execução do bloco do ponto em que havia parado.
     * Se bloco de execução ainda não foi instanciado, empilha declarações na pilha de escopos de execução,
     * cria um novo ambiente e executa as declarações empilhadas.
     * Se depurador comandou uma instrução 'adentrar-escopo', execução do bloco não ocorre, mas
     * ponteiros de escopo e execução são atualizados.
     * @param declaracoes Um vetor de declaracoes a ser executado.
     * @param ambiente O ambiente de execução quando houver, como parâmetros, argumentos, etc.
     */
    executarBloco(declaracoes: Declaracao[], ambiente?: EspacoVariaveis): Promise<any>;
    /**
     * Para fins de depuração, verifica se há ponto de parada no mesmo pragma da declaração.
     * @param declaracao A declaração a ser executada.
     * @returns True quando execução deve parar. False caso contrário.
     */
    private verificarPontoParada;
    /**
     * No interpretador com depuração, este método é dividido em dois outros métodos privados:
     * - `this.executarUmPassoNoEscopo`, que executa apenas uma instrução e nada mais;
     * - `this.executarUltimoEscopoComandoContinuar`, que é a execução trivial de um escopo inteiro,
     *      ou com todas as instruções, ou até encontrar um ponto de parada.
     * @param manterAmbiente Se verdadeiro, junta elementos do último escopo com o escopo
     *                       imediatamente abaixo.
     * @param naoVerificarPrimeiraExecucao Booleano que pede ao Interpretador para não
     *                                     verificar o ponto de parada na primeira execução.
     *                                     Normalmente usado pelo Servidor de Depuração para continuar uma linha.
     * @returns O retorno da execução.
     */
    executarUltimoEscopo(manterAmbiente?: boolean, naoVerificarPrimeiraExecucao?: boolean): Promise<any>;
    private descartarTodosEscoposFinalizados;
    private descartarEscopoPorRetornoFuncao;
    private executarUmPassoNoEscopo;
    /**
     * Continua a interpretação parcial do último ponto em que parou.
     * Pode ser tanto o começo da execução inteira, ou pós comando do depurador
     * quando há um ponto de parada.
     * @param manterAmbiente Se verdadeiro, junta elementos do último escopo com o escopo
     *                       imediatamente abaixo.
     * @param naoVerificarPrimeiraExecucao Booleano que pede ao Interpretador para não
     *                                     verificar o ponto de parada na primeira execução.
     *                                     Normalmente usado pelo Servidor de Depuração para continuar uma linha.
     * @returns Um objeto de retorno, com erros encontrados se houverem.
     */
    private executarUltimoEscopoComandoContinuar;
    /**
     * Continua a interpretação, conforme comando do depurador.
     * Quando um ponto de parada é ativado, a pilha de execução do TypeScript é perdida.
     * Esse método cria uma nova pilha de execução do lado do JS, começando do último elemento executado do
     * primeiro escopo, subindo até o último elemento executado do último escopo.
     * Se entre escopos houver ponto de parada ativo, a execução é suspensa até o próximo comando
     * do desenvolvedor.
     * @see executarUltimoEscopo
     */
    instrucaoContinuarInterpretacao(escopo?: number): Promise<any>;
    /**
     * Empilha um escopo se for possível.
     * Se não for, apenas executa a instrução corrente.
     */
    adentrarEscopo(): Promise<any>;
    /**
     * Interpreta apenas uma instrução a partir do ponto de parada ativo, conforme comando do depurador.
     * Esse método cria uma nova pilha de execução do lado do JS, começando do último elemento executado do
     * primeiro escopo, subindo até o último elemento executado do último escopo.
     * @param escopo Indica o escopo a ser visitado. Usado para construir uma pilha de chamadas do lado JS.
     */
    instrucaoPasso(escopo?: number): Promise<any>;
    /**
     * Interpreta restante do bloco de execução em que o ponto de parada está, conforme comando do depurador.
     * Se houver outros pontos de parada no mesmo escopo à frente da instrução atual, todos são ignorados.
     * @param escopo Indica o escopo a ser visitado. Usado para construir uma pilha de chamadas do lado JS.
     */
    instrucaoProximoESair(): Promise<void>;
    /**
     * Prepara a pilha de escopos para uma situação de depuração.
     * Não há execução de código neste caso.
     * @param declaracoes Um vetor de declarações.
     */
    prepararParaDepuracao(declaracoes: Declaracao[]): void;
    private abrirNovoBlocoEscopo;
    /**
     * Reimplementando este método aqui porque a execução por depuração não requer
     * mostrar o resultado em momento algum, ou lidar com o retorno.
     * @param declaracao A declaracao a ser executada.
     * @param mostrarResultado Sempre falso.
     * @returns O resultado da execução.
     */
    executar(declaracao: Declaracao, mostrarResultado?: boolean): Promise<any>;
    /**
     * Interpretação utilizada pelo depurador para avaliar valores de variáveis.
     * Diferentemente da interpretação tradicional, não possui indicadores
     * de performance porque eles não fazem sentido aqui.
     * @param declaracoes Um vetor de declarações.
     * @returns Um objeto de retorno, com erros encontrados se houverem.
     */
    interpretar(declaracoes: Declaracao[], manterAmbiente?: boolean): Promise<RetornoInterpretador>;
    /**
     * Obtém o valor de uma variável por nome.
     * Em versões anteriores, o mecanismo de avaliação fazia toda a avaliação tradicional,
     * passando por Lexador, Avaliador Sintático e Interpretador.
     * Isso tem sua cota de problemas, sobretudo porque a avaliação insere e descarta escopos,
     * entrando em condição de corrida com a interpretação com depuração.
     * @param nome O nome da variável.
     */
    obterVariavel(nome: string): any;
}
