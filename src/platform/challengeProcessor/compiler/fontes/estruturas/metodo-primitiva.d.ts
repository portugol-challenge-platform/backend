import { VisitanteComumInterface } from '../interfaces';
import { Chamavel } from './chamavel';
/**
 * Classe de método de primitiva.
 * Exemplos:
 *
 * - `v.inclui(1)` (`v` é um vetor)
 * - `t.minusculo()` (`t` é um texto)
 *
 * A aridade é sempre a quantidade de argumentos do método menos um porque o
 * primeiro parâmetro é sempre a referência para a primitiva.
 */
export declare class MetodoPrimitiva extends Chamavel {
    primitiva: any;
    metodo: Function;
    constructor(primitiva: any, metodo: Function, requerInterpretador?: boolean);
    chamar(interpretador: VisitanteComumInterface, argumentos?: any[]): Promise<any>;
}
