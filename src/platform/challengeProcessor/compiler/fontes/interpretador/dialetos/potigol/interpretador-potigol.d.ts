import { InterpretadorBase } from '../../interpretador-base';
import { AcessoMetodo } from '../../../construtos';
/**
 * Uma implementação do interpretador de Potigol.
 */
export declare class InterpretadorPotigol extends InterpretadorBase {
    constructor(diretorioBase: string, performance?: boolean, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    paraTexto(objeto: any): any;
    protected resolverInterpolacoes(textoOriginal: string, linha: number): Promise<any[]>;
    protected retirarInterpolacao(texto: string, variaveis: any[]): string;
    visitarExpressaoAcessoMetodo(expressao: AcessoMetodo): Promise<any>;
}
