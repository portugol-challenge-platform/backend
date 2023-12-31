"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sustar = void 0;
const declaracao_1 = require("./declaracao");
class Sustar extends declaracao_1.Declaracao {
    constructor(simbolo) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoSustar(this));
    }
}
exports.Sustar = Sustar;
//# sourceMappingURL=sustar.js.map