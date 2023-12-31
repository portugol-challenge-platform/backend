"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
class Literal {
    constructor(hashArquivo, linha, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLiteral(this);
    }
}
exports.Literal = Literal;
//# sourceMappingURL=literal.js.map