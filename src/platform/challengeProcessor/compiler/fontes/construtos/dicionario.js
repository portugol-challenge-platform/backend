"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dicionario = void 0;
class Dicionario {
    constructor(hashArquivo, linha, chaves, valores) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.chaves = chaves;
        this.valores = valores;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDicionario(this);
    }
}
exports.Dicionario = Dicionario;
//# sourceMappingURL=dicionario.js.map