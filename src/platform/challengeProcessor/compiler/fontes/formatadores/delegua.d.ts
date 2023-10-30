import { SimboloInterface } from '../interfaces';
/**
 * O formatador de código Delégua.
 * Normalmente usado por IDEs, mas pode ser usado por linha de comando ou programaticamente.
 */
export declare class FormatadorDelegua {
    indentacao: number;
    blocoAberto: boolean;
    constructor();
    /**
     * Devolve código formatado de acordo com os símbolos encontrados.
     * @param simbolos Um vetor de símbolos.
     * @param quebraLinha O símbolo de quebra de linha. Normalmente `\r\n` para Windows e `\n` para outros sistemas operacionais.
     * @param tamanhoIndentacao O tamanho de cada bloco de indentação (por padrão, 4)
     * @returns Código Delégua formatado.
     */
    formatar(simbolos: SimboloInterface[], quebraLinha: string, tamanhoIndentacao?: number): string;
}
