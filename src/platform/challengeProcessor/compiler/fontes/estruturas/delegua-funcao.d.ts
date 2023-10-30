import { Chamavel } from './chamavel';
import { VisitanteComumInterface } from '../interfaces';
import { ObjetoDeleguaClasse } from './objeto-delegua-classe';
import { FuncaoConstruto } from '../construtos';
import { ArgumentoInterface } from '../interpretador/argumento-interface';
/**
 * Qualquer função declarada em código é uma DeleguaFuncao.
 */
export declare class DeleguaFuncao extends Chamavel {
    nome: string;
    declaracao: FuncaoConstruto;
    eInicializador: boolean;
    instancia: ObjetoDeleguaClasse;
    constructor(nome: string, declaracao: FuncaoConstruto, instancia?: ObjetoDeleguaClasse, eInicializador?: boolean);
    aridade(): number;
    paraTexto(): string;
    chamar(visitante: VisitanteComumInterface, argumentos: Array<ArgumentoInterface>): Promise<any>;
    funcaoPorMetodoDeClasse(instancia: ObjetoDeleguaClasse): DeleguaFuncao;
}
