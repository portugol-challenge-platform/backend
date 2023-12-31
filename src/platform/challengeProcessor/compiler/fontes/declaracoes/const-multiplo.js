"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstMultiplo = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Uma declaração de múltiplas constantes.
 */
class ConstMultiplo extends declaracao_1.Declaracao {
    constructor(simbolos, inicializador, tipo = undefined) {
        super(Number(simbolos[0].linha), simbolos[0].hashArquivo);
        this.simbolos = simbolos;
        this.inicializador = inicializador;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoConstMultiplo(this);
    }
}
exports.ConstMultiplo = ConstMultiplo;
//# sourceMappingURL=const-multiplo.js.map