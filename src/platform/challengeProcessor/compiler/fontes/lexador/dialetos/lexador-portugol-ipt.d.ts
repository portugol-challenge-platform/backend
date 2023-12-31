import { LexadorInterface, SimboloInterface } from '../../interfaces';
import { RetornoLexador } from '../../interfaces/retornos';
import { ErroLexador } from '../erro-lexador';
export declare class LexadorPortugolIpt implements LexadorInterface<SimboloInterface> {
    simbolos: SimboloInterface[];
    erros: ErroLexador[];
    hashArquivo: number;
    codigo: string[];
    inicioSimbolo: number;
    atual: number;
    linha: number;
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: string): boolean;
    eFinalDoCodigo(): boolean;
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    private eUltimaLinha;
    avancar(): string | void;
    adicionarSimbolo(tipo: any, literal?: any): void;
    private eFinalDaLinha;
    simboloAtual(): string;
    proximoSimbolo(): string;
    simboloAnterior(): string;
    analisarTexto(delimitador: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
