import { LexadorInterface, SimboloInterface } from '../../interfaces';
import { RetornoLexador } from '../../interfaces/retornos';
import { Directive, ModuleDeclaration, Statement } from 'estree';
/**
 * Este lexador existe apenas para abstrair o Esprima em
 * outras dependências, como `delegua-node`.
 */
export declare class LexadorJavaScript implements LexadorInterface<Statement | Directive | ModuleDeclaration> {
    simbolos: SimboloInterface[];
    codigo: string | string[];
    inicioSimbolo: number;
    atual: number;
    linha: number;
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: string): boolean;
    eFinalDoCodigo(): boolean;
    avancar(): string | void;
    adicionarSimbolo(tipo: any, literal: any): void;
    simboloAtual(): string;
    proximoSimbolo(): string;
    simboloAnterior(): string;
    analisarTexto(delimitador: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<Statement | Directive | ModuleDeclaration>;
}
