import { Constante, ConstanteOuVariavel, Construto, FuncaoConstruto } from '../../../construtos';
import { Escreva, Declaracao, Se, Enquanto, Para, Escolha, Fazer, EscrevaMesmaLinha, Const, Var, FuncaoDeclaracao, Classe, ConstMultiplo } from '../../../declaracoes';
import { RetornoLexador, RetornoAvaliadorSintatico } from '../../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../../avaliador-sintatico-base';
import { ParametroInterface, SimboloInterface } from '../../../interfaces';
import { RetornoDeclaracao } from '../../retornos';
import { MicroAvaliadorSintaticoPotigol } from './micro-avaliador-sintatico-potigol';
/**
 * TODO: Pensar numa forma de avaliar múltiplas constantes sem
 * transformar o retorno de `primario()` em um vetor.
 */
export declare class AvaliadorSintaticoPotigol extends AvaliadorSintaticoBase {
    microAvaliadorSintatico: MicroAvaliadorSintaticoPotigol;
    tiposPotigolParaDelegua: {
        Caractere: string;
        Inteiro: string;
        Logico: string;
        Lógico: string;
        Real: string;
        Texto: string;
        undefined: any;
    };
    declaracoesAnteriores: {
        [identificador: string]: any[];
    };
    /**
     * Testa se o primeiro parâmetro na lista de símbolos
     * pertence a uma declaração ou não.
     * @param simbolos Os símbolos que fazem parte da lista de argumentos
     * de uma chamada ou declaração de função.
     * @returns `true` se parâmetros são de declaração. `false` caso contrário.
     */
    protected testePrimeiroParametro(simbolos: SimboloInterface[]): boolean;
    /**
     * Retorna uma declaração de função iniciada por igual,
     * ou seja, com apenas uma instrução.
     * @param simboloPrimario O símbolo que identifica a função (nome).
     * @param parenteseEsquerdo O parêntese esquerdo, usado para fins de pragma.
     * @param parametros A lista de parâmetros da função.
     * @param tipoRetorno O tipo de retorno da função.
     * @returns Um construto do tipo `FuncaoDeclaracao`.
     */
    protected declaracaoFuncaoPotigolIniciadaPorIgual(simboloPrimario: SimboloInterface, parenteseEsquerdo: SimboloInterface, parametros: ParametroInterface[], tipoRetorno?: SimboloInterface): FuncaoDeclaracao;
    /**
     * Retorna uma declaração de função terminada por fim,
     * ou seja, com mais de uma instrução.
     * @param simboloPrimario O símbolo que identifica a função (nome).
     * @param parenteseEsquerdo O parêntese esquerdo, usado para fins de pragma.
     * @param parametros A lista de parâmetros da função.
     * @param tipoRetorno O tipo de retorno da função.
     * @returns Um construto do tipo `FuncaoDeclaracao`.
     */
    protected declaracaoFuncaoPotigolTerminadaPorFim(simboloPrimario: SimboloInterface, parenteseEsquerdo: SimboloInterface, parametros: ParametroInterface[], tipoRetorno?: SimboloInterface): FuncaoDeclaracao;
    corpoDaFuncao(nomeFuncao: string, simboloPragma?: SimboloInterface, parametros?: any[]): FuncaoConstruto;
    protected declaracaoDeFuncaoOuMetodo(construtoPrimario: ConstanteOuVariavel): FuncaoDeclaracao;
    finalizarChamada(entidadeChamada: Construto): Construto;
    /**
     * Verificação comum de tipos.
     * Avança o símbolo se não houver erros.
     * @param simbolo O símbolo sendo analisado.
     * @param mensagemErro A mensagem de erro caso o símbolo atual não seja de tipo.
     */
    protected verificacaoTipo(simbolo: SimboloInterface, mensagemErro: string): void;
    protected logicaComumParametrosPotigol(simbolos: SimboloInterface[]): {
        parametros: ParametroInterface[];
        tipagemDefinida: boolean;
    };
    primario(): Construto;
    /**
     * Em Potigol, só é possível determinar a diferença entre uma chamada e uma
     * declaração de função depois dos argumentos.
     *
     * Chamadas não aceitam dicas de tipos de parâmetros.
     * @returns Um construto do tipo `AcessoMetodo`, `AcessoIndiceVariavel` ou `Constante`,
     * dependendo dos símbolos encontrados.
     */
    chamar(): Construto;
    comparacaoIgualdade(): Construto;
    declaracaoEscreva(): Escreva;
    declaracaoImprima(): EscrevaMesmaLinha;
    /**
     * Blocos de escopo em Potigol existem quando:
     *
     * - Em uma declaração de função ou método, após fecha parênteses, o próximo
     * símbolo obrigatório não é `=` e há pelo menos um `fim` até o final do código;
     * - Em uma declaração `se`;
     * - Em uma declaração `enquanto`;
     * - Em uma declaração `para`.
     * @returns Um vetor de `Declaracao`.
     */
    blocoEscopo(): Array<RetornoDeclaracao>;
    declaracaoSe(): Se;
    declaracaoEnquanto(): Enquanto;
    declaracaoPara(): Para;
    declaracaoEscolha(): Escolha;
    protected declaracaoDeConstantes(): ConstMultiplo | Const[];
    protected declaracaoDeVariaveis(): Var[];
    protected logicaAtribuicaoComDicaDeTipo(expressao: Constante): Const;
    declaracaoFazer(): Fazer;
    /**
     * Uma declaração de tipo nada mais é do que um declaração de classe.
     * Em Potigol, classe e tipo são praticamente a mesma coisa.
     *
     * @returns Um construto do tipo `Classe`.
     */
    protected declaracaoTipo(): Classe;
    atribuir(): any | any[];
    /**
     * Em Potigol, uma definição de função normalmente começa com um
     * identificador - que não é uma palavra reservada - seguido de parênteses.
     * Este ponto de entrada verifica o símbolo atual e o próximo.
     *
     * Diferentemente dos demais dialetos, verificamos logo de cara se
     * temos uma definição ou chamada de função, isto porque definições
     * nunca aparecem do lado direito de uma atribuição, a não ser que
     * estejam entre parênteses (_currying_).
     *
     * Se o próximo símbolo for parênteses, ou é uma definiçao de função,
     * ou uma chamada de função.
     */
    expressaoOuDefinicaoFuncao(): any;
    resolverDeclaracaoForaDeBloco(): Declaracao | Declaracao[] | Construto | Construto[] | any;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
