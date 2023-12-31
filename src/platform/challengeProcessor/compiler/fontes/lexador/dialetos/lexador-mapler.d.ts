import { RetornoLexador } from '../../interfaces/retornos';
import { LexadorBaseLinhaUnica } from '../lexador-base-linha-unica';
import { SimboloInterface } from '../../interfaces';
export declare class LexadorMapler extends LexadorBaseLinhaUnica {
    analisarNumero(): void;
    analisarTexto(delimitador: string): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
