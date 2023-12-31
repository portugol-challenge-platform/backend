import { SimboloInterface } from '../interfaces';
import { RetornoLexador } from '../interfaces/retornos';
import { ErroLexador } from './erro-lexador';
/**
 * O MicroLexador funciona apenas dentro de interpolações de texto.
 * Portanto, seus tipos de símbolos e palavras reservadas são
 * bastante reduzidos em relação ao lexador normal.
 */
export declare class MicroLexador {
    simbolos: SimboloInterface[];
    erros: ErroLexador[];
    inicioSimbolo: number;
    atual: number;
    codigo: string;
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: any): boolean;
    eFinalDoCodigo(): boolean;
    adicionarSimbolo(tipo: string, literal?: any): void;
    analisarTexto(delimitador?: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    /**
     * Lê apenas uma linha de código e a transforma em símbolos.
     * @param codigo O código
     */
    mapear(codigo: string): RetornoLexador<SimboloInterface>;
}
