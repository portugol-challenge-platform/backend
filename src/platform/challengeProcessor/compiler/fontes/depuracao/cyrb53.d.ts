/**
 * Função de geração de hashes copiada de https://stackoverflow.com/a/52171480/1314276.
 * A ideia é gerar hashes únicos para nomes de arquivos importados e usar o hash para os
 * pragmas de elementos catalogados pelo lexador e usados pelo interpretador.
 * @param nomeArquivo Nome do arquivo
 * @param semente Uma semente de dispersão, padrão: 0
 * @returns Texto com o hash correspondente ao nome do arquivo
 */
export default function cyrb53(nomeArquivo: string, semente?: number): number;
