import { VisitanteComumInterface } from '../interfaces';
import { Construto } from './construto';
/**
 * Um construto de formatação de escrita é utilizado por instruções `escreva`
 * e derivadas para adição de espaços e casas decimais, este último para quando
 * o conteúdo da escrita é um número.
 */
export declare class FormatacaoEscrita implements Construto {
    linha: number;
    hashArquivo: number;
    expressao: Construto;
    espacos: number;
    casasDecimais: number;
    constructor(hashArquivo: number, linha: number, expressao: Construto, espacos?: number, casasDecimais?: number);
    aceitar(visitante: VisitanteComumInterface): Promise<any>;
}
