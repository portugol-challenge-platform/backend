import { Atribuir, Chamada, FimPara, FormatacaoEscrita, Literal, Super, TipoDe } from '../construtos';
import { Bloco, Classe, Const, ConstMultiplo, Continua, Declaracao, Enquanto, Escolha, Escreva, EscrevaMesmaLinha, Expressao, Fazer, FuncaoDeclaracao, Importar, Leia, LeiaMultiplo, Para, ParaCada, Retorna, Se, Sustar, Tente, Var, VarMultiplo } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
import { AnalisadorSemanticoInterface } from '../interfaces/analisador-semantico-interface';
import { ErroAnalisadorSemantico } from '../interfaces/erros';
import { RetornoAnalisadorSemantico } from '../interfaces/retornos/retorno-analisador-semantico';
import { TiposDadosInterface } from '../interfaces/tipos-dados-interface';
import { ContinuarQuebra, RetornoQuebra, SustarQuebra } from '../quebras';
import { PilhaVariaveis } from './pilha-variaveis';
interface VariavelHipoteticaInterface {
    tipo: TiposDadosInterface;
    subtipo?: 'texto' | 'número' | 'inteiro' | 'longo' | 'lógico';
    imutavel: boolean;
    valor?: any;
}
interface FuncaoHipoteticaInterface {
    valor: any;
}
export declare class AnalisadorSemantico implements AnalisadorSemanticoInterface {
    pilhaVariaveis: PilhaVariaveis;
    variaveis: {
        [nomeVariavel: string]: VariavelHipoteticaInterface;
    };
    funcoes: {
        [nomeFuncao: string]: FuncaoHipoteticaInterface;
    };
    atual: number;
    erros: ErroAnalisadorSemantico[];
    constructor();
    erro(simbolo: SimboloInterface, mensagemDeErro: string): void;
    verificarTipoAtribuido(declaracao: Var | Const): void;
    visitarExpressaoTipoDe(expressao: TipoDe): Promise<any>;
    visitarExpressaoFalhar(expressao: any): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
    visitarExpressaoAgrupamento(expressao: any): Promise<any>;
    visitarExpressaoUnaria(expressao: any): Promise<void>;
    visitarExpressaoBinaria(expressao: any): Promise<void>;
    visitarExpressaoDeChamada(expressao: Chamada): Promise<void>;
    visitarDeclaracaoDeAtribuicao(expressao: Atribuir): Promise<void>;
    visitarExpressaoDeVariavel(expressao: any): Promise<void>;
    visitarDeclaracaoDeExpressao(declaracao: Expressao): Promise<any>;
    visitarExpressaoLeia(expressao: Leia): Promise<void>;
    visitarExpressaoLeiaMultiplo(expressao: LeiaMultiplo): Promise<void>;
    visitarExpressaoLogica(expressao: any): Promise<void>;
    visitarDeclaracaoPara(declaracao: Para): Promise<any>;
    visitarDeclaracaoParaCada(declaracao: ParaCada): Promise<any>;
    visitarDeclaracaoSe(declaracao: Se): Promise<void>;
    visitarExpressaoFimPara(declaracao: FimPara): Promise<void>;
    visitarDeclaracaoFazer(declaracao: Fazer): Promise<void>;
    visitarExpressaoFormatacaoEscrita(declaracao: FormatacaoEscrita): Promise<void>;
    visitarDeclaracaoEscolha(declaracao: Escolha): Promise<void>;
    visitarDeclaracaoTente(declaracao: Tente): Promise<void>;
    visitarDeclaracaoEnquanto(declaracao: Enquanto): Promise<void>;
    visitarDeclaracaoImportar(declaracao: Importar): Promise<void>;
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<void>;
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): Promise<void>;
    visitarExpressaoBloco(declaracao: Bloco): Promise<any>;
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    visitarDeclaracaoConstMultiplo(declaracao: ConstMultiplo): Promise<any>;
    visitarDeclaracaoVar(declaracao: Var): Promise<any>;
    visitarDeclaracaoVarMultiplo(declaracao: VarMultiplo): Promise<any>;
    visitarExpressaoContinua(declaracao?: Continua): ContinuarQuebra;
    visitarExpressaoSustar(declaracao?: Sustar): SustarQuebra;
    visitarExpressaoRetornar(declaracao: Retorna): Promise<RetornoQuebra>;
    visitarExpressaoDeleguaFuncao(expressao: any): Promise<void>;
    visitarExpressaoAtribuicaoPorIndice(expressao: any): Promise<any>;
    visitarExpressaoAcessoIndiceVariavel(expressao: any): Promise<void>;
    visitarExpressaoDefinirValor(expressao: any): Promise<void>;
    visitarDeclaracaoDefinicaoFuncao(declaracao: FuncaoDeclaracao): Promise<void>;
    visitarDeclaracaoClasse(declaracao: Classe): Promise<void>;
    visitarExpressaoAcessoMetodo(expressao: any): Promise<void>;
    visitarExpressaoIsto(expressao: any): Promise<void>;
    visitarExpressaoDicionario(expressao: any): Promise<void>;
    visitarExpressaoVetor(expressao: any): Promise<void>;
    visitarExpressaoSuper(expressao: Super): Promise<void>;
    analisar(declaracoes: Declaracao[]): RetornoAnalisadorSemantico;
}
export {};
