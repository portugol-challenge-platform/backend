"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continua = void 0;
const declaracao_1 = require("./declaracao");
class Continua extends declaracao_1.Declaracao {
    constructor(simbolo) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoContinua(this));
    }
}
exports.Continua = Continua;
//# sourceMappingURL=continua.js.map