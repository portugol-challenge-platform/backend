"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Const = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Uma declaração de constante.
 */
class Const extends declaracao_1.Declaracao {
    constructor(simbolo, inicializador, tipo = undefined) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.inicializador = inicializador;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoConst(this);
    }
}
exports.Const = Const;
//# sourceMappingURL=const.js.map