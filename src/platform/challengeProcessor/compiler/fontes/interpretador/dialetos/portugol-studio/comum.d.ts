import { Leia } from '../../../declaracoes';
import { PilhaEscoposExecucaoInterface } from '../../../interfaces/pilha-escopos-execucao-interface';
/**
 * Execução da leitura de valores da entrada configurada no
 * início da aplicação.
 * @param expressao Expressão do tipo Leia
 * @returns Promise com o resultado da leitura.
 */
export declare function visitarExpressaoLeiaComum(interfaceEntradaSaida: any, pilhaEscoposExecucao: PilhaEscoposExecucaoInterface, expressao: Leia): Promise<any>;
