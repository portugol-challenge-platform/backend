import { AcessoMetodo } from '../../../construtos';
import { InterpretadorComDepuracao } from '../../interpretador-com-depuracao';
export declare class InterpretadorPotigolComDepuracao extends InterpretadorComDepuracao {
    constructor(diretorioBase: string, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    protected resolverInterpolacoes(textoOriginal: string, linha: number): Promise<any[]>;
    protected retirarInterpolacao(texto: string, variaveis: any[]): string;
    visitarExpressaoAcessoMetodo(expressao: AcessoMetodo): Promise<any>;
}
