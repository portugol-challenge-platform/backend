"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = void 0;
class Logico {
    constructor(hashArquivo, esquerda, operador, direita) {
        this.linha = esquerda.linha;
        this.hashArquivo = hashArquivo;
        this.esquerda = esquerda;
        this.operador = operador;
        this.direita = direita;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLogica(this);
    }
}
exports.Logico = Logico;
//# sourceMappingURL=logico.js.map