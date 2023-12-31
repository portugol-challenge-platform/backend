"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atribuir = void 0;
class Atribuir {
    constructor(hashArquivo, simbolo, valor) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoDeAtribuicao(this);
    }
}
exports.Atribuir = Atribuir;
//# sourceMappingURL=atribuir.js.map