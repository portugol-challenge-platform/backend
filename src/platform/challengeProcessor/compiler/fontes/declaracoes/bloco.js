"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloco = void 0;
const declaracao_1 = require("./declaracao");
class Bloco extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, declaracoes) {
        super(linha, hashArquivo);
        this.declaracoes = declaracoes;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoBloco(this);
    }
}
exports.Bloco = Bloco;
//# sourceMappingURL=bloco.js.map