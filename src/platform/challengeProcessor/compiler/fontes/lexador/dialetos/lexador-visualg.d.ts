import { RetornoLexador } from '../../interfaces/retornos';
import { LexadorBaseLinhaUnica } from '../lexador-base-linha-unica';
import { SimboloInterface } from '../../interfaces';
/**
 * O Lexador do VisuAlg é de linha única porque não possui comentários
 * multilinha na especificação.
 */
export declare class LexadorVisuAlg extends LexadorBaseLinhaUnica {
    analisarNumero(): void;
    analisarTexto(delimitador: string): void;
    /**
     * Identificação de palavra-chave.
     * Palavras-chaves em VisuAlg não são sensíveis a tamanho de caixa
     * (caracteres maiúsculos e minúsculos são equivalentes).
     */
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
