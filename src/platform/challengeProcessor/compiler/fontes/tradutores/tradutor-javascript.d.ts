import { AcessoIndiceVariavel, AcessoMetodo, Agrupamento, AtribuicaoPorIndice, Atribuir, Binario, Chamada, DefinirValor, FormatacaoEscrita, FuncaoConstruto, Literal, Logico, TipoDe, Unario, Variavel, Vetor } from '../construtos';
import { Bloco, Classe, Const, Declaracao, Enquanto, Escolha, Escreva, Expressao, Falhar, Fazer, FuncaoDeclaracao, Importar, Leia, Para, ParaCada, Retorna, Se, Tente, Var } from '../declaracoes';
import { SimboloInterface, TradutorInterface } from '../interfaces';
import { CaminhoEscolha } from '../interfaces/construtos';
/**
 * Esse tradutor traduz para JavaScript sem módulos, o que significa que
 * instruções em Delégua como `leia()` e `importar()` não são suportadas.
 * O tradutor levantará mensagem de alerta toda vez que essas instruções são encontradas.
 */
export declare class TradutorJavaScript implements TradutorInterface<Declaracao> {
    indentacao: number;
    declaracoesDeClasses: Classe[];
    traduzirSimboloOperador(operador: SimboloInterface): string;
    traduzirFuncoesNativas(metodo: string): string;
    traduzirConstrutoAgrupamento(agrupamento: Agrupamento): string;
    traduzirConstrutoAtribuir(atribuir: Atribuir): string;
    traduzirConstrutoBinario(binario: Binario): string;
    traduzirConstrutoDefinirValor(definirValor: DefinirValor): string;
    traduzirConstrutoLiteral(literal: Literal): string;
    traduzirConstrutoVariavel(variavel: Variavel): string;
    traduzirConstrutoChamada(chamada: Chamada): string;
    logicaComumBlocoEscopo(declaracoes: Declaracao[]): string;
    traduzirDeclaracaoBloco(declaracaoBloco: Bloco): string;
    logicaTraducaoMetodoClasse(metodoClasse: FuncaoDeclaracao): string;
    traduzirDeclaracaoClasse(declaracaoClasse: Classe): string;
    traduzirDeclaracaoEnquanto(declaracaoEnquanto: Enquanto): string;
    logicaComumCaminhosEscolha(caminho: CaminhoEscolha): string;
    traduzirDeclaracaoEscolha(declaracaoEscolha: Escolha): string;
    traduzirDeclaracaoEscreva(declaracaoEscreva: Escreva): string;
    traduzirDeclaracaoEscrevaMesmaLinha(declaracaoEscreva: Escreva): string;
    traduzirDeclaracaoExpressao(declaracaoExpressao: Expressao): string;
    traduzirDeclaracaoFazer(declaracaoFazer: Fazer): string;
    traduzirDeclaracaoFuncao(declaracaoFuncao: FuncaoDeclaracao): string;
    traduzirDeclaracaoImportar(declaracaoImportar: Importar): string;
    traduzirDeclaracaoLeia(declaracaoLeia: Leia): string[];
    traduzirDeclaracaoParaCada(declaracaoParaCada: ParaCada): string;
    traduzirDeclaracaoPara(declaracaoPara: Para): string;
    traduzirDeclaracaoRetorna(declaracaoRetorna: Retorna): string;
    traduzirDeclaracaoSe(declaracaoSe: Se): string;
    traduzirDeclaracaoTente(declaracaoTente: Tente): string;
    traduzirDeclaracaoConst(declaracaoConst: Const): string;
    traduzirDeclaracaoVar(declaracaoVar: Var): string;
    trazudirConstrutoAcessoMetodo(acessoMetodo: AcessoMetodo): string;
    traduzirFuncaoConstruto(funcaoConstruto: FuncaoConstruto): string;
    traduzirConstrutoLogico(logico: Logico): string;
    traduzirConstrutoAtribuicaoPorIndice(AtribuicaoPorIndice: AtribuicaoPorIndice): string;
    traduzirAcessoIndiceVariavel(acessoIndiceVariavel: AcessoIndiceVariavel): string;
    traduzirConstrutoVetor(vetor: Vetor): string;
    traduzirConstrutoFormatacaoEscrita(formatacaoEscrita: FormatacaoEscrita): string;
    traduzirConstrutoTipoDe(tipoDe: TipoDe): string;
    traduzirDeclaracaoFalhar(falhar: Falhar): string;
    traduzirConstrutoUnario(unario: Unario): string;
    dicionarioConstrutos: {
        AcessoIndiceVariavel: any;
        AcessoMetodo: any;
        Agrupamento: any;
        AtribuicaoPorIndice: any;
        Atribuir: any;
        Binario: any;
        Chamada: any;
        DefinirValor: any;
        FuncaoConstruto: any;
        Isto: () => string;
        Literal: any;
        Logico: any;
        TipoDe: any;
        Unario: any;
        Variavel: any;
        Vetor: any;
        FormatacaoEscrita: any;
    };
    dicionarioDeclaracoes: {
        Atribuir: any;
        Bloco: any;
        Classe: any;
        Const: any;
        Continua: () => string;
        Enquanto: any;
        Escolha: any;
        Escreva: any;
        EscrevaMesmaLinha: any;
        Expressao: any;
        Fazer: any;
        Falhar: any;
        FuncaoDeclaracao: any;
        Importar: any;
        Leia: any;
        Para: any;
        ParaCada: any;
        Retorna: any;
        Se: any;
        Sustar: () => string;
        Tente: any;
        Var: any;
    };
    traduzir(declaracoes: Declaracao[]): string;
}
