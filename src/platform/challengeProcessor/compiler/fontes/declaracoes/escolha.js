"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Escolha = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Declaração de escolha de caminho a executar de acordo com literal ou identificador.
 */
class Escolha extends declaracao_1.Declaracao {
    constructor(identificadorOuLiteral, caminhos, caminhoPadrao) {
        super(identificadorOuLiteral.linha, identificadorOuLiteral.hashArquivo);
        this.identificadorOuLiteral = identificadorOuLiteral;
        this.caminhos = caminhos;
        this.caminhoPadrao = caminhoPadrao;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoEscolha(this);
    }
}
exports.Escolha = Escolha;
//# sourceMappingURL=escolha.js.map