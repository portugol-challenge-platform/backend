import { Chamavel } from './chamavel';
/**
 * Classe de importação de classes de bibliotecas do JavaScript.
 */
export declare class ClassePadrao extends Chamavel {
    nome: string;
    funcaoDeClasse: any;
    constructor(nome: string, funcaoDeClasse: any);
    paraTexto(): string;
    /**
     * Para o caso de uma classe padrão, instanciá-la é chamá-la
     * como função tendo a palavra 'new' na frente.
     * @param argumentos
     * @param simbolo
     */
    chamar(argumentos: any[], simbolo: any): any;
}
