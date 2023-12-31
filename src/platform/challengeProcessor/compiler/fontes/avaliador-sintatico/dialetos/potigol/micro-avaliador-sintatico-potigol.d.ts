import { Construto } from '../../../construtos';
import { Declaracao } from '../../../declaracoes';
import { RetornoLexador, RetornoAvaliadorSintatico } from '../../../interfaces/retornos';
import { MicroAvaliadorSintaticoBase } from '../../micro-avaliador-sintatico-base';
import { SimboloInterface } from '../../../interfaces';
export declare class MicroAvaliadorSintaticoPotigol extends MicroAvaliadorSintaticoBase {
    hashArquivo: number;
    constructor(hashArquivo: number);
    primario(): Construto;
    chamar(): Construto;
    analisar(retornoLexador: RetornoLexador<SimboloInterface>, linha: number): RetornoAvaliadorSintatico<Declaracao>;
}
