import { Binario, Logico } from '../../../construtos';
import { VisitanteComumInterface } from '../../../interfaces';
/**
 * Método de visita de expressão binária.
 * Reintroduzido pelas particularidades do VisuAlg.
 * @param expressao A expressão binária.
 * @returns O resultado da resolução da expressão.
 */
export declare function visitarExpressaoBinaria(visitante: VisitanteComumInterface, expressao: Binario | any): Promise<any>;
export declare function visitarExpressaoLogica(interpretador: VisitanteComumInterface, expressao: Logico): Promise<any>;
