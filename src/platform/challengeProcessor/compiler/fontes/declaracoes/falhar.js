"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Falhar = void 0;
const declaracao_1 = require("./declaracao");
class Falhar extends declaracao_1.Declaracao {
    constructor(simbolo, explicacao) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.explicacao = explicacao;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoFalhar(this));
    }
}
exports.Falhar = Falhar;
//# sourceMappingURL=falhar.js.map