import { Literal } from '../construtos';
import { Classe, Declaracao, Escreva } from '../declaracoes';
export declare class TradutorAssemblyX64 {
    indentacao: number;
    declaracoesDeClasses: Classe[];
    bss: string;
    data: string;
    text: string;
    gerarDigitoAleatorio(): string;
    dicionarioConstrutos: {};
    dicionarioDeclaracoes: {
        Escreva: any;
    };
    criaStringLiteral(literal: Literal): string;
    criaTamanhoNaMemoriaReferenteAVar(nomeStringLiteral: string): string;
    traduzirDeclaracaoEscreva(declaracaoEscreva: Escreva): void;
    saida_sistema(): void;
    traduzir(declaracoes: Declaracao[]): string;
}
