"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroResolvedor = void 0;
class ErroResolvedor extends Error {
    constructor(simbolo, mensagem) {
        super(mensagem);
        this.simbolo = simbolo;
        Object.setPrototypeOf(this, ErroResolvedor.prototype);
    }
}
exports.ErroResolvedor = ErroResolvedor;
//# sourceMappingURL=erro-resolvedor.js.map