"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquanto = void 0;
const declaracao_1 = require("./declaracao");
class Enquanto extends declaracao_1.Declaracao {
    constructor(condicao, corpo) {
        super(condicao.linha, condicao.hashArquivo);
        this.condicao = condicao;
        this.corpo = corpo;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoEnquanto(this);
    }
}
exports.Enquanto = Enquanto;
//# sourceMappingURL=enquanto.js.map