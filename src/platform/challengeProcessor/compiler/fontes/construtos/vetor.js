"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vetor = void 0;
class Vetor {
    constructor(hashArquivo, linha, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.valores = valores;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoVetor(this);
    }
}
exports.Vetor = Vetor;
//# sourceMappingURL=vetor.js.map