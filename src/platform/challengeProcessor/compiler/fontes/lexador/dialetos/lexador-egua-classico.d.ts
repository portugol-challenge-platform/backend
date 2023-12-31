import { LexadorInterface, SimboloInterface } from '../../interfaces';
import { ErroLexador } from '../erro-lexador';
import { RetornoLexador } from '../../interfaces/retornos/retorno-lexador';
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * Este Lexador implementa o mesmo mecanismo de lexação da linguagem Égua.
 * https://github.com/eguatech/egua/blob/master/src/lexer.js
 */
export declare class LexadorEguaClassico implements LexadorInterface<SimboloInterface> {
    codigo: any;
    simbolos: SimboloInterface[];
    erros: ErroLexador[];
    inicioSimbolo: number;
    atual: number;
    linha: number;
    constructor(codigo?: any);
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: any): boolean;
    eFinalDoCodigo(): boolean;
    avancar(): string;
    adicionarSimbolo(tipo: any, literal?: any): void;
    proximoIgualA(esperado: any): boolean;
    simboloAtual(): any;
    proximoSimbolo(): any;
    simboloAnterior(): any;
    analisarTexto(texto?: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo?: string[]): RetornoLexador<SimboloInterface>;
}
