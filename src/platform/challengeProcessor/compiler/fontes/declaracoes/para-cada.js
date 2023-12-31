"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParaCada = void 0;
const declaracao_1 = require("./declaracao");
class ParaCada extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, nomeVariavelIteracao, vetor, corpo) {
        super(linha, hashArquivo);
        this.nomeVariavelIteracao = nomeVariavelIteracao;
        this.vetor = vetor;
        this.corpo = corpo;
        this.posicaoAtual = 0;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoParaCada(this);
    }
}
exports.ParaCada = ParaCada;
//# sourceMappingURL=para-cada.js.map