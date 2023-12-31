import { AvaliadorSintaticoPortugolIpt } from '../avaliador-sintatico/dialetos';
import { FormatacaoEscrita, Literal } from '../construtos';
import { LexadorPortugolIpt } from '../lexador/dialetos';
export declare class TradutorPortugolIpt {
    indentacao: number;
    lexador: LexadorPortugolIpt;
    avaliadorSintatico: AvaliadorSintaticoPortugolIpt;
    dicionarioConstrutos: {
        FormatacaoEscrita: any;
        Literal: any;
    };
    dicionarioDeclaracoes: {
        Escreva: any;
        EscrevaMesmaLinha: any;
    };
    traduzirConstrutoLiteral(literal: Literal): string;
    traduzirConstrutoFormatacaoEscrita(formatacaoEscrita: FormatacaoEscrita): string;
    traduzirDeclaracaoEscreva(declaracaoEscreva: any): string;
    traduzirDeclaracaoEscrevaMesmaLinha(declaracaoEscreva: any): string;
    traduzir(codigo: string): string;
}
