import { AcessoMetodo } from '../../../construtos';
import { InterpretadorBase } from '../../interpretador-base';
/**
 * Executa um acesso a método, normalmente de um objeto de classe.
 * @param expressao A expressão de acesso.
 * @returns O resultado da execução.
 */
export declare function visitarExpressaoAcessoMetodo(interpretador: InterpretadorBase, expressao: AcessoMetodo): Promise<any>;
/**
 * Resolve todas as interpolações em um texto.
 * @param {texto} textoOriginal O texto original com as variáveis interpoladas.
 * @returns Uma lista de variáveis interpoladas.
 */
export declare function resolverInterpolacoes(interpretador: InterpretadorBase, textoOriginal: string, linha: number): Promise<any[]>;
/**
 * Retira a interpolação de um texto.
 * @param {texto} texto O texto
 * @param {any[]} variaveis A lista de variaveis interpoladas
 * @returns O texto com o valor das variaveis.
 */
export declare function retirarInterpolacao(texto: string, variaveis: any[]): string;
