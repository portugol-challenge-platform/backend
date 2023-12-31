import { Leia } from '../../../declaracoes';
import { InterpretadorBase } from '../../interpretador-base';
export declare class InterpretadorPortugolStudio extends InterpretadorBase {
    constructor(diretorioBase: string, performance?: boolean, funcaoDeRetorno?: Function);
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
}
