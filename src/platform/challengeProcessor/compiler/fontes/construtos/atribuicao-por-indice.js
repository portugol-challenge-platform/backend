"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtribuicaoPorIndice = void 0;
class AtribuicaoPorIndice {
    constructor(hashArquivo, linha, objeto, indice, valor) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.objeto = objeto;
        this.indice = indice;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoAtribuicaoPorIndice(this);
    }
}
exports.AtribuicaoPorIndice = AtribuicaoPorIndice;
//# sourceMappingURL=atribuicao-por-indice.js.map