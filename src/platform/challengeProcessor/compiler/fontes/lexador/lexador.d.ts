import { LexadorInterface, SimboloInterface } from '../interfaces';
import { ErroLexador } from './erro-lexador';
import { RetornoLexador } from '../interfaces/retornos/retorno-lexador';
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 */
export declare class Lexador implements LexadorInterface<SimboloInterface> {
    codigo: string[];
    hashArquivo: number;
    simbolos: SimboloInterface[];
    erros: ErroLexador[];
    inicioSimbolo: number;
    atual: number;
    linha: number;
    performance: boolean;
    constructor(performance?: boolean);
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: any): boolean;
    eFinalDaLinha(): boolean;
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha(): boolean;
    eFinalDoCodigo(): boolean;
    avancar(): void;
    adicionarSimbolo(tipo: string, literal?: any): void;
    simboloAtual(): string;
    avancarParaProximaLinha(): void;
    proximoSimbolo(): string;
    simboloAnterior(): string;
    analisarTexto(delimitador?: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    encontrarFimComentarioAsterisco(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
