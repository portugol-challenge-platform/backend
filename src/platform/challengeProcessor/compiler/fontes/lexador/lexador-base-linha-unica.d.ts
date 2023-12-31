import { LexadorInterface, SimboloInterface } from '../interfaces';
import { RetornoLexador } from '../interfaces/retornos';
import { ErroLexador } from './erro-lexador';
export declare abstract class LexadorBaseLinhaUnica implements LexadorInterface<SimboloInterface> {
    simbolos: SimboloInterface[];
    codigo: string;
    inicioSimbolo: number;
    atual: number;
    linha: number;
    erros: ErroLexador[];
    hashArquivo: number;
    constructor();
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: string): boolean;
    eFinalDoCodigo(): boolean;
    eFinalDaLinha(): boolean;
    avancar(): string;
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
