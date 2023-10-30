import { Agrupamento, Atribuir, Binario, FimPara, Literal, Logico, Variavel } from '../construtos';
import { Bloco, Declaracao, Para, Se, Var } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
/**
 * Este tradutor reverso traduz de VisuAlg para Delégua.
 */
export declare class TradutorReversoVisuAlg {
    indentacao: number;
    traduzirSimboloOperador(operador: SimboloInterface): string;
    traduzirConstrutoAgrupamento(agrupamento: Agrupamento): string;
    traduzirDeclaracaoAtribuir(atribuir: Atribuir): string;
    traduzirConstrutoBinario(binario: Binario): string;
    traduzirConstrutoFimPara(fimPara: FimPara): string;
    traduzirConstrutoLiteral(literal: Literal): string;
    traduzirConstrutoVariavel(variavel: Variavel): string;
    logicaComumBlocoEscopo(declaracoes: Declaracao[]): string;
    traduzirDeclaracaoBloco(declaracaoBloco: Bloco): string;
    logicaComumCaminhosEscolha(caminho: any): string;
    traduzirDeclaracaoEscolha(declaracaoEscolha: any): string;
    traduzirDeclaracaoEscreva(declaracaoEscreva: any): string;
    traduzirDeclaracaoLeia(declaracaoLeia: any): string;
    traduzirDeclaracaoPara(declaracaoPara: Para): string;
    traduzirDeclaracaoSe(declaracaoSe: Se): string;
    traduzirDeclaracaoVar(declaracaoVar: Var): string;
    tradzirDeclaracaoEscrevaMesmaLinha(declaracaoEscreva: any): string;
    traduzirConstrutoLogico(logico: Logico): string;
    dicionarioConstrutos: {
        Agrupamento: any;
        Binario: any;
        FimPara: any;
        Literal: any;
        Logico: any;
        Variavel: any;
    };
    dicionarioDeclaracoes: {
        Atribuir: any;
        Bloco: any;
        EscrevaMesmaLinha: any;
        Escolha: any;
        Escreva: any;
        Leia: any;
        Para: any;
        Se: any;
        Var: any;
    };
    traduzir(declaracoes: Declaracao[]): string;
}
