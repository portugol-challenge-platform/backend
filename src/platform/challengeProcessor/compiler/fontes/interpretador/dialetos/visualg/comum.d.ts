import { Binario, Construto, Logico } from '../../../construtos';
import { Para } from '../../../declaracoes';
import { InterpretadorBase } from '../../interpretador-base';
export declare function atribuirVariavel(interpretador: InterpretadorBase, expressao: Construto, valor: any): Promise<any>;
/**
 * Método de visita de expressão binária.
 * Reintroduzido pelas particularidades do VisuAlg.
 * @param expressao A expressão binária.
 * @returns O resultado da resolução da expressão.
 */
export declare function visitarExpressaoBinaria(interpretador: InterpretadorBase, expressao: Binario | any): Promise<any>;
export declare function visitarExpressaoLogica(interpretador: InterpretadorBase, expressao: Logico): Promise<any>;
export declare function resolverIncrementoPara(interpretador: InterpretadorBase, declaracao: Para): Promise<any>;
