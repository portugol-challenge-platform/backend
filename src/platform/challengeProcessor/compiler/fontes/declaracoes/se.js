"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Se = void 0;
const declaracao_1 = require("./declaracao");
class Se extends declaracao_1.Declaracao {
    constructor(condicao, caminhoEntao, caminhosSeSenao, caminhoSenao) {
        super(condicao.linha, condicao.hashArquivo);
        this.condicao = condicao;
        this.caminhoEntao = caminhoEntao;
        this.caminhosSeSenao = caminhosSeSenao;
        this.caminhoSenao = caminhoSenao;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoSe(this);
    }
}
exports.Se = Se;
//# sourceMappingURL=se.js.map