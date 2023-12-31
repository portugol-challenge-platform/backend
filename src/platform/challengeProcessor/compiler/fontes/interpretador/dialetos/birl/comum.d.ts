import { Construto, Literal } from '../../../construtos';
import { Declaracao, Leia, Para } from '../../../declaracoes';
import { InterpretadorBirlInterface } from '../../../interfaces/dialeto/interpretador-birl-interface';
import { RetornoInterpretador } from '../../../interfaces/retornos';
export declare function atribuirVariavel(interpretador: InterpretadorBirlInterface, expressao: Construto, valor: any, tipo: string): Promise<any>;
export declare function avaliarArgumentosEscreva(interpretador: InterpretadorBirlInterface, argumentos: Construto[]): Promise<string>;
export declare function resolveQuantidadeDeInterpolacoes(texto: Literal): Promise<RegExpMatchArray>;
export declare function verificaTipoDaInterpolação(dados: {
    tipo: string;
    valor: any;
}): Promise<boolean>;
export declare function substituirValor(stringOriginal: string, novoValor: number | string | any, simboloTipo: string): Promise<string>;
export declare function visitarExpressaoLeia(interpretador: InterpretadorBirlInterface, expressao: Leia): Promise<any>;
export declare function visitarExpressaoLiteral(expressao: Literal): Promise<any>;
export declare function visitarDeclaracaoPara(interpretador: InterpretadorBirlInterface, declaracao: Para): Promise<any>;
export declare function interpretar(interpretador: InterpretadorBirlInterface, declaracoes: Declaracao[], manterAmbiente?: boolean): Promise<RetornoInterpretador>;
