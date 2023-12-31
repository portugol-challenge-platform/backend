"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Var = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Uma declaração de variável.
 */
class Var extends declaracao_1.Declaracao {
    constructor(simbolo, inicializador, tipo = undefined) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.inicializador = inicializador;
        this.tipo = tipo;
        this.referencia = false;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoVar(this);
    }
}
exports.Var = Var;
//# sourceMappingURL=var.js.map