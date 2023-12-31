"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarMultiplo = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Uma declaração de múltiplas variáveis.
 */
class VarMultiplo extends declaracao_1.Declaracao {
    constructor(simbolos, inicializador, tipo = undefined) {
        super(Number(simbolos[0].linha), simbolos[0].hashArquivo);
        this.simbolos = simbolos;
        this.inicializador = inicializador;
        this.tipo = tipo;
        this.referencia = false;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoVarMultiplo(this);
    }
}
exports.VarMultiplo = VarMultiplo;
//# sourceMappingURL=var-multiplo.js.map