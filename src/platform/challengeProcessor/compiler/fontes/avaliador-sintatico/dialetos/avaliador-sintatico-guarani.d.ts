import { Construto, FuncaoConstruto } from '../../construtos';
import { Escreva, Declaracao, Se, Enquanto, Para, Escolha, Fazer } from '../../declaracoes';
import { RetornoLexador, RetornoAvaliadorSintatico } from '../../interfaces/retornos';
import { AvaliadorSintaticoBase } from '../avaliador-sintatico-base';
import { SimboloInterface } from '../../interfaces';
export declare class AvaliadorSintaticoGuarani extends AvaliadorSintaticoBase {
    primario(): Construto;
    chamar(): Construto;
    atribuir(): Construto;
    declaracaoEscreva(): Escreva;
    blocoEscopo(): Declaracao[];
    declaracaoSe(): Se;
    declaracaoEnquanto(): Enquanto;
    declaracaoPara(): Para;
    declaracaoEscolha(): Escolha;
    declaracaoFazer(): Fazer;
    corpoDaFuncao(tipo: string): FuncaoConstruto;
    expressao(): Construto;
    resolverDeclaracaoForaDeBloco(): Declaracao | Declaracao[] | Construto | Construto[] | any;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, hashArquivo: number): RetornoAvaliadorSintatico<Declaracao>;
}
