"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrevaMesmaLinha = void 0;
const declaracao_1 = require("./declaracao");
class EscrevaMesmaLinha extends declaracao_1.Declaracao {
    constructor(linha, hashArquivo, argumentos) {
        super(linha, hashArquivo);
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoEscrevaMesmaLinha(this);
    }
}
exports.EscrevaMesmaLinha = EscrevaMesmaLinha;
//# sourceMappingURL=escreva-mesma-linha.js.map