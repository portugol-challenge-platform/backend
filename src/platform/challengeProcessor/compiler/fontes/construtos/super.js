"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
class Super {
    constructor(hashArquivo, simboloChave, metodo) {
        this.linha = Number(simboloChave.linha);
        this.hashArquivo = hashArquivo;
        this.simboloChave = simboloChave;
        this.metodo = metodo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoSuper(this));
    }
}
exports.Super = Super;
//# sourceMappingURL=super.js.map