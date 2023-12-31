import { LexadorInterface, SimboloInterface } from '../interfaces';
import { RetornoLexador } from '../interfaces/retornos';
import { ErroLexador } from './erro-lexador';
/**
 * Essa versão do Lexador Base é por padrão com comentários multilinha.
 * Em outras palavras, se o dialeto da linguagem terá comentários multilinha,
 * este Lexador Base deverá ser usado.
 */
export declare abstract class LexadorBase implements LexadorInterface<SimboloInterface> {
    erros: ErroLexador[];
    hashArquivo: number;
    simbolos: SimboloInterface[];
    codigo: string[];
    inicioSimbolo: number;
    atual: number;
    linha: number;
    constructor();
    protected avancarParaProximaLinha(): void;
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: string): boolean;
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    protected eUltimaLinha(): boolean;
    eFinalDoCodigo(): boolean;
    eFinalDaLinha(): boolean;
    protected encontrarFimComentarioAsterisco(): void;
    avancar(): void;
    adicionarSimbolo(tipo: any, literal?: any): void;
    simboloAtual(): string;
    proximoSimbolo(): string;
    simboloAnterior(): string;
    abstract analisarTexto(delimitador: string): void;
    abstract analisarNumero(): void;
    abstract identificarPalavraChave(): void;
    abstract analisarToken(): void;
    abstract mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
