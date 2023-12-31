import { LexadorInterface, SimboloInterface } from '../../interfaces';
import { ErroLexador } from '../erro-lexador';
import { RetornoLexador } from '../../interfaces/retornos/retorno-lexador';
import { Pragma } from './pragma';
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * Este lexador é diferente dos demais, porque também produz uma estrutura de dados de pragmas, que explica,
 * por exemplo quantos espaços há na frente de cada linha. Assim como a linguagem Python, os blocos de
 * escopo são definidos pelo número de espaços à frente do código.
 */
export declare class LexadorPitugues implements LexadorInterface<SimboloInterface> {
    codigo: string[];
    hashArquivo: number;
    simbolos: SimboloInterface[];
    erros: ErroLexador[];
    pragmas: {
        [linha: number]: Pragma;
    };
    inicioSimbolo: number;
    atual: number;
    linha: number;
    performance: boolean;
    constructor(performance?: boolean);
    eDigito(caractere: string): boolean;
    eAlfabeto(caractere: string): boolean;
    eAlfabetoOuDigito(caractere: string): boolean;
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha(): boolean;
    eFinalDaLinha(): boolean;
    eFinalDoCodigo(): boolean;
    avancar(): void;
    adicionarSimbolo(tipo: any, literal?: any): void;
    simboloAtual(): string;
    proximoSimbolo(): string;
    simboloAnterior(): string;
    analisarTexto(delimitador?: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarIndentacao(): void;
    avancarParaProximaLinha(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
