"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escreva = void 0;
const declaracao_1 = require("./declaracao");
class Escreva extends declaracao_1.Declaracao {
    constructor(linha, hashArquivo, argumentos) {
        super(linha, hashArquivo);
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoEscreva(this);
    }
}
exports.Escreva = Escreva;
//# sourceMappingURL=escreva.js.map