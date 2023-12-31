"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspacoVariaveis = void 0;
/**
 * Um espaço de variáveis é ligado a um `EscopoExecucao`.
 * Contém os valores de variáveis e resoluções de chamadas.
 *
 * As resoluções de chamadas são utilizadas pelo depurador quando
 * uma certa linha precisa "executar duas vezes". Isso acontece quando
 * um ponto de parada é ativado dentro de um escopo relacionado com
 * a chamada. É apenas usado pelo Interpretador com Depuração.
 */
class EspacoVariaveis {
    constructor() {
        this.valores = {};
        this.resolucoesChamadas = {};
    }
}
exports.EspacoVariaveis = EspacoVariaveis;
//# sourceMappingURL=espaco-variaveis.js.map