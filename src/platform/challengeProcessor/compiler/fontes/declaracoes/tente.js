"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tente = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Declaração `tente`.
 */
class Tente extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, caminhoTente, caminhoPegue, caminhoSenao, caminhoFinalmente) {
        super(linha, hashArquivo);
        this.caminhoTente = caminhoTente;
        this.caminhoPegue = caminhoPegue;
        this.caminhoSenao = caminhoSenao;
        this.caminhoFinalmente = caminhoFinalmente;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoTente(this);
    }
}
exports.Tente = Tente;
//# sourceMappingURL=tente.js.map