import { Binario, Logico } from '../../../construtos';
import { Const, Escreva, EscrevaMesmaLinha, Fazer, Leia } from '../../../declaracoes';
import { InterpretadorBase } from '../..';
export declare class InterpretadorMapler extends InterpretadorBase {
    mensagemPrompt: string;
    constructor(diretorioBase: string, performance?: boolean, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    visitarDeclaracaoConst(declaracao: Const): Promise<any>;
    private avaliarArgumentosEscrevaMapler;
    /**
     * No Mapler, o bloco de condição executa se falso.
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
    visitarDeclaracaoEscreva(declaracao: Escreva): Promise<any>;
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
