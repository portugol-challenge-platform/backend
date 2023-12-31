import { RetornoLexador } from '../../interfaces/retornos';
import { LexadorBase } from '../lexador-base';
import { SimboloInterface } from '../../interfaces';
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * O Lexador de Portugol Studio possui algumas particularidades:
 * - Aspas simples são para caracteres individuais, e aspas duplas para cadeias de caracteres.
 * - Literais de vetores usam chaves, e não colchetes.
 */
export declare class LexadorPortugolStudio extends LexadorBase {
    protected logicaComumCaracteres(delimitador: string): string;
    analisarCaracter(): void;
    analisarTexto(): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
