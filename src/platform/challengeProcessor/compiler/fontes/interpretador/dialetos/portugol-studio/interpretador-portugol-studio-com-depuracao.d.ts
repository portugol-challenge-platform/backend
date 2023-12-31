import { Leia } from '../../../declaracoes';
import { InterpretadorComDepuracao } from '../../interpretador-com-depuracao';
export declare class InterpretadorPortugolStudioComDepuracao extends InterpretadorComDepuracao {
    mensagemPrompt: string;
    constructor(diretorioBase: string, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    /**
     * No Portugol Studio, como o bloco de execução da função `inicio` é criado
     * pelo avaliador sintático, precisamos ter uma forma aqui de avançar o
     * primeiro bloco pós execução de comando, seja ele qual for.
     */
    private avancarPrimeiroEscopoAposInstrucao;
    instrucaoContinuarInterpretacao(escopo?: number): Promise<any>;
    instrucaoPasso(escopo?: number): Promise<any>;
}
