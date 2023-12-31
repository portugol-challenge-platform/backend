import { RetornoLexador } from '../../interfaces/retornos';
import { LexadorBaseLinhaUnica } from '../lexador-base-linha-unica';
import { SimboloInterface } from '../../interfaces';
export declare class LexadorBirl extends LexadorBaseLinhaUnica {
    adicionarSimbolo(tipo: string, lexema?: string, literal?: any): void;
    proximoIgualA(esperado: string): boolean;
    analisarTexto(delimitador: string): void;
    analisarNumero(): void;
    identificarPalavraChave(): void;
    analisarToken(): void;
    InjetaUmItemDentroDaLista(item: string, posicao: number): string[];
    mapear(codigo: string[], hashArquivo?: number): RetornoLexador<SimboloInterface>;
}
