"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agrupamento = void 0;
/**
 * Um agrupamento é essencialmente uma expressão qualquer dentro de parênteses.
 * Usado para resolver precedência de operadores. Por exemplo:
 * `(2 + 2) * 5`, `(2 + 2)` é um agrupamento cuja expressão é `2 + 2`.
 */
class Agrupamento {
    constructor(hashArquivo, linha, expressao) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.expressao = expressao;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAgrupamento(this);
    }
}
exports.Agrupamento = Agrupamento;
//# sourceMappingURL=agrupamento.js.map