"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retorna = void 0;
const declaracao_1 = require("./declaracao");
class Retorna extends declaracao_1.Declaracao {
    constructor(simboloChave, valor) {
        super(Number(simboloChave.linha), simboloChave.hashArquivo);
        this.simboloChave = simboloChave;
        this.valor = valor;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoRetornar(this);
    }
}
exports.Retorna = Retorna;
//# sourceMappingURL=retorna.js.map