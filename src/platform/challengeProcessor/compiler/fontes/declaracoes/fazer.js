"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fazer = void 0;
const declaracao_1 = require("./declaracao");
class Fazer extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, caminhoFazer, condicaoEnquanto) {
        super(linha, hashArquivo);
        this.caminhoFazer = caminhoFazer;
        this.condicaoEnquanto = condicaoEnquanto;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoFazer(this);
    }
}
exports.Fazer = Fazer;
//# sourceMappingURL=fazer.js.map