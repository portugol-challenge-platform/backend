"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamavel = void 0;
class Chamavel {
    aridade() {
        return this.valorAridade;
    }
    async chamar(interpretador, argumentos, simbolo) {
        return Promise.reject(new Error('Este método não deveria ser chamado.'));
    }
}
exports.Chamavel = Chamavel;
//# sourceMappingURL=chamavel.js.map