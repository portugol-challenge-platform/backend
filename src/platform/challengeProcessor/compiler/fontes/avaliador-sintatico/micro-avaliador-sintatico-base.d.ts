import { Construto } from '../construtos';
import { Declaracao } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
import { RetornoAvaliadorSintatico, RetornoLexador } from '../interfaces/retornos';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';
export declare abstract class MicroAvaliadorSintaticoBase {
    simbolos: SimboloInterface[];
    erros: ErroAvaliadorSintatico[];
    atual: number;
    linha: number;
    avancarEDevolverAnterior(): SimboloInterface;
    verificarTipoSimboloAtual(tipo: string): boolean;
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean;
    erro(simbolo: SimboloInterface, mensagemDeErro: string): ErroAvaliadorSintatico;
    consumir(tipo: string, mensagemDeErro: string): SimboloInterface;
    abstract chamar(): Construto;
    unario(): Construto;
    exponenciacao(): Construto;
    multiplicar(): Construto;
    adicaoOuSubtracao(): Construto;
    comparar(): Construto;
    comparacaoIgualdade(): Construto;
    e(): Construto;
    ou(): Construto;
    declaracao(): Declaracao | Construto;
    abstract analisar(retornoLexador: RetornoLexador<SimboloInterface>, linha: number): RetornoAvaliadorSintatico<Declaracao>;
}
