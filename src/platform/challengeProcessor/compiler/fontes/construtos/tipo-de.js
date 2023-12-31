"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDe = void 0;
class TipoDe {
    constructor(hashArquivo, simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.valor = valor;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoTipoDe(this));
    }
}
exports.TipoDe = TipoDe;
//# sourceMappingURL=tipo-de.js.map