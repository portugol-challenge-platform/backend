import { Construto, Literal } from '../../../construtos';
import { Declaracao, Leia, Para } from '../../../declaracoes';
import { InterpretadorBirlInterface } from '../../../interfaces/dialeto/interpretador-birl-interface';
import { RetornoInterpretador } from '../../../interfaces/retornos';
import { InterpretadorComDepuracao } from '../../interpretador-com-depuracao';
export declare class InterpretadorBirlComDepuracao extends InterpretadorComDepuracao implements InterpretadorBirlInterface {
    constructor(diretorioBase: string, funcaoDeRetorno?: Function, funcaoDeRetornoMesmaLinha?: Function);
    atribuirVariavel(interpretador: InterpretadorBirlInterface, expressao: Construto, valor: any, tipo: string): Promise<any>;
    resolveQuantidadeDeInterpolacoes(expressao: Literal): Promise<RegExpMatchArray>;
    verificaTipoDaInterpolação(dados: {
        tipo: string;
        valor: any;
    }): Promise<boolean>;
    substituirValor(stringOriginal: string, novoValor: any, simboloTipo: string): Promise<string>;
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    visitarExpressaoLeia(expressao: Leia): Promise<any>;
    visitarExpressaoLiteral(expressao: Literal): Promise<any>;
    visitarDeclaracaoPara(declaracao: Para): Promise<any>;
    avaliarArgumentosEscreva(argumentos: Construto[]): Promise<string>;
    interpretar(declaracoes: Declaracao[], manterAmbiente?: boolean): Promise<RetornoInterpretador>;
}
