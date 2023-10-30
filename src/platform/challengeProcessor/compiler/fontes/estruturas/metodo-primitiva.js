"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPrimitiva = void 0;
const chamavel_1 = require("./chamavel");
/**
 * Classe de método de primitiva.
 * Exemplos:
 *
 * - `v.inclui(1)` (`v` é um vetor)
 * - `t.minusculo()` (`t` é um texto)
 *
 * A aridade é sempre a quantidade de argumentos do método menos um porque o
 * primeiro parâmetro é sempre a referência para a primitiva.
 */
class MetodoPrimitiva extends chamavel_1.Chamavel {
    constructor(primitiva, metodo, requerInterpretador = false) {
        super();
        this.primitiva = primitiva;
        this.metodo = metodo;
        this.valorAridade = metodo.length - 1;
    }
    async chamar(interpretador, argumentos = []) {
        return await this.metodo(interpretador, this.primitiva, ...argumentos);
    }
}
exports.MetodoPrimitiva = MetodoPrimitiva;
//# sourceMappingURL=metodo-primitiva.js.map