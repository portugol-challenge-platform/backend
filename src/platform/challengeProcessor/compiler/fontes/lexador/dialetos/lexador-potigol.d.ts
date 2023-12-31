import { RetornoLexador } from '../../interfaces/retornos';
import { LexadorBaseLinhaUnica } from '../lexador-base-linha-unica';
import { SimboloInterface } from '../../interfaces';
/**
 * Lexador para o dialeto Potigol.
 * Este dialeto é sensível a tamanho de caixa. `Inteiro` é aceito. `inteiro` não.
 */
export declare class LexadorPotigol extends LexadorBaseLinhaUnica {
    protected logicaComumCaracteres(delimitador: string): string;
    analisarCaracter(): void;
    analisarTexto(): void;
    analisarNumero(): void;
    avancarParaProximaLinha(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
