import { Construto, FuncaoConstruto } from '../../construtos';
import { Escreva, Declaracao, Se, Enquanto, Para, Escolha, Fazer, Var, Leia } from '../../declaracoes';
import { RetornoLexador, RetornoAvaliadorSintatico } from '../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../avaliador-sintatico-base';
import { SimboloInterface } from '../../interfaces';
export declare class AvaliadorSintaticoPortugolIpt extends AvaliadorSintaticoBase {
    primario(): Construto;
    /**
     * Aparentemente, o Portugol IPT não suporta chamadas de função.
     * @returns O retorno da chamada de `primario()`.
     */
    chamar(): Construto;
    atribuir(): Construto;
    /**
     * A declaração escreva (ou escrever) do Portugol IPT é sempre na mesma linha.
     */
    declaracaoEscreva(): Escreva;
    blocoEscopo(): Declaracao[];
    declaracaoSe(): Se;
    declaracaoEnquanto(): Enquanto;
    declaracaoPara(): Para;
    declaracaoEscolha(): Escolha;
    declaracaoFazer(): Fazer;
    declaracaoInteiros(): Var[];
    /**
     * Análise de uma declaração `leia()`. No VisuAlg, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia(): Leia;
    corpoDaFuncao(tipo: string): FuncaoConstruto;
    resolverDeclaracaoForaDeBloco(): Declaracao | Declaracao[] | Construto | Construto[] | any;
    private validarSegmentoInicio;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
