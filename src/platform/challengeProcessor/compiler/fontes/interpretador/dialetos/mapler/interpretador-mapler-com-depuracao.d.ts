import { Binario, Construto, Logico } from '../../../construtos';
import { EscrevaMesmaLinha, Escreva, Fazer, Leia } from '../../../declaracoes';
import { InterpretadorComDepuracao } from '../../interpretador-com-depuracao';
/**
 * Interpretador com depuração para o dialeto Mapler.
 */
export declare class InterpretadorMaplerComDepuracao extends InterpretadorComDepuracao {
    mensagemPrompt: string;
    constructor(diretorioBase: string, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    private avaliarArgumentosEscrevaMapler;
    /**
     * No Mapler, o bloco executa se a condição for falsa.
     * Por isso a reimplementação aqui.
     * @param declaracao A declaração `Fazer`
     * @returns Só retorna em caso de erro na execução, e neste caso, o erro.
     */
    visitarDeclaracaoFazer(declaracao: Fazer): Promise<any>;
    /**
     * Execução de uma escrita na saída padrão, sem quebras de linha.
     * Implementada para alguns dialetos, como Mapler.
     *
     * Como `readline.question` sobrescreve o que foi escrito antes, aqui
     * definimos `this.mensagemPrompt` para uso com `leia`.
     * No Mapler é muito comum usar `escreva()` seguido de `leia()` para
     * gerar um prompt na mesma linha.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarExpressaoEscrevaMesmaLinha(declaracao: EscrevaMesmaLinha): Promise<any>;
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    visitarExpressaoEscreva(declaracao: Escreva): Promise<any>;
    atribuirVariavel(expressao: Construto, valor: any): Promise<any>;
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    visitarExpressaoBinaria(expressao: Binario | any): Promise<any>;
    visitarExpressaoLogica(expressao: Logico): Promise<any>;
}
