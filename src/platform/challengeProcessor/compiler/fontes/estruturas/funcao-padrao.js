"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoPadrao = void 0;
const chamavel_1 = require("./chamavel");
/**
 * Uma `FuncaoPadrao` normalmente é uma função em JavaScript.
 */
class FuncaoPadrao extends chamavel_1.Chamavel {
    constructor(valorAridade, funcao) {
        super();
        this.valorAridade = valorAridade;
        this.funcao = funcao;
    }
    async chamar(argumentos, simbolo) {
        this.simbolo = simbolo;
        return await this.funcao.apply(this, argumentos);
    }
    paraTexto() {
        return '<função>';
    }
}
exports.FuncaoPadrao = FuncaoPadrao;
//# sourceMappingURL=funcao-padrao.js.map