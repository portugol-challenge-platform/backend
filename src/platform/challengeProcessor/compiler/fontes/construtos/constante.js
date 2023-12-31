"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constante = void 0;
class Constante {
    constructor(hashArquivo, simbolo) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoDeVariavel(this));
    }
}
exports.Constante = Constante;
//# sourceMappingURL=constante.js.map