import { RetornoLexador } from '../../interfaces/retornos';
import { LexadorBase } from '../lexador-base';
import { SimboloInterface } from '../../interfaces';
export declare class LexadorGuarani extends LexadorBase {
    analisarTexto(delimitador: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    mapear(codigo: string[], hashArquivo: number): RetornoLexador<SimboloInterface>;
}
