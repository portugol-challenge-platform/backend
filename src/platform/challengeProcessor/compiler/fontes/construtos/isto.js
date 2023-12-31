"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isto = void 0;
class Isto {
    constructor(hashArquivo, linha, palavraChave) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.palavraChave = palavraChave;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoIsto(this));
    }
}
exports.Isto = Isto;
//# sourceMappingURL=isto.js.map