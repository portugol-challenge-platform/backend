"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expressao = void 0;
const declaracao_1 = require("./declaracao");
class Expressao extends declaracao_1.Declaracao {
    constructor(expressao) {
        super(expressao.linha, expressao.hashArquivo);
        this.expressao = expressao;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoDeExpressao(this);
    }
}
exports.Expressao = Expressao;
//# sourceMappingURL=expressao.js.map