import { Construto } from '../construtos';
import { Declaracao } from '../declaracoes';
import { SimboloInterface } from '../interfaces';
import { RetornoAvaliadorSintatico, RetornoLexador } from '../interfaces/retornos';
import { ErroAvaliadorSintatico } from './erro-avaliador-sintatico';
import { MicroAvaliadorSintaticoBase } from './micro-avaliador-sintatico-base';
/**
 * O MicroAvaliadorSintatico funciona apenas dentro de interpolações de texto.
 */
export declare class MicroAvaliadorSintatico extends MicroAvaliadorSintaticoBase {
    avancarEDevolverAnterior(): SimboloInterface;
    verificarTipoSimboloAtual(tipo: string): boolean;
    verificarSeSimboloAtualEIgualA(...argumentos: string[]): boolean;
    erro(simbolo: SimboloInterface, mensagemDeErro: string): ErroAvaliadorSintatico;
    consumir(tipo: string, mensagemDeErro: string): SimboloInterface;
    primario(): Construto;
    finalizarChamada(entidadeChamada: Construto): Construto;
    chamar(): Construto;
    unario(): Construto;
    exponenciacao(): Construto;
    multiplicar(): Construto;
    adicaoOuSubtracao(): Construto;
    bitShift(): Construto;
    bitE(): Construto;
    bitOu(): Construto;
    comparar(): Construto;
    comparacaoIgualdade(): Construto;
    em(): Construto;
    e(): Construto;
    ou(): Construto;
    declaracao(): Declaracao | Construto;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, linha: number): RetornoAvaliadorSintatico<Declaracao>;
}
