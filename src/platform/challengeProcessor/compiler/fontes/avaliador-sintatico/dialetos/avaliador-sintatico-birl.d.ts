import { Chamada, FuncaoConstruto } from '../../construtos';
import { Bloco, Continua, Declaracao, Enquanto, Escolha, Escreva, Expressao, Fazer, FuncaoDeclaracao, Leia, Para, Retorna, Se, Sustar, Var } from '../../declaracoes';
import { RetornoAvaliadorSintatico, RetornoLexador } from '../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../avaliador-sintatico-base';
import { Construto } from '../../construtos/construto';
import { ParametroInterface, SimboloInterface } from '../../interfaces';
/**
 * Avaliador Sintático de BIRL
 */
export declare class AvaliadorSintaticoBirl extends AvaliadorSintaticoBase {
    private validarEscopoPrograma;
    tratarSimbolos(simbolos: Array<SimboloInterface>): string | void;
    validarSegmentoHoraDoShow(): void;
    validarSegmentoBirlFinal(): void;
    primario(): Construto;
    chamar(): Construto;
    atribuir(): Construto;
    blocoEscopo(): Declaracao[];
    declaracaoEnquanto(): Enquanto;
    declaracaoExpressao(): Expressao;
    declaracaoPara(): Para;
    declaracaoEscolha(): Escolha;
    declaracaoEscreva(): Escreva;
    declaracaoFazer(): Fazer;
    declaracaoCaracteres(): Var[];
    validarTipoDeclaracaoInteiro(): SimboloInterface;
    declaracaoInteiros(): Var[];
    declaracaoPontoFlutuante(): Var[];
    declaracaoRetorna(): Retorna;
    protected validaTipoDeclaracaoLeia(caracteres: string): string;
    declaracaoLeia(): Leia;
    protected consomeSeSenao(): {
        condicaoSeSenao: any;
    };
    protected consomeSe(): {
        simboloSe: SimboloInterface;
        condicaoSe: any;
    };
    consumeSenao(): void;
    resolveCaminhoSe(): Bloco;
    declaracaoSe(): Se;
    resolveSimboloInterfaceParaTiposDadosInterface(simbolo: SimboloInterface): "numero" | "texto";
    protected logicaComumParamentros(): ParametroInterface[];
    corpoDaFuncao(tipo: string): FuncaoConstruto;
    declacacaoEnquanto(): Enquanto;
    declaracaoSustar(): Sustar;
    declaracaoContinua(): Continua;
    resolveTipo(tipo: string): SimboloInterface;
    funcao(tipo: string): FuncaoDeclaracao;
    declaracaoChamaFuncao(): Chamada;
    resolverDeclaracaoForaDeBloco(): any;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
