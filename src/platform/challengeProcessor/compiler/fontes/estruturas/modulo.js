"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaModulo = void 0;
class DeleguaModulo {
    constructor(nome) {
        this.nome = nome || '';
        this.componentes = {};
    }
    toString() {
        return this.nome ? `<modulo ${this.nome}>` : '<modulo>';
    }
}
exports.DeleguaModulo = DeleguaModulo;
//# sourceMappingURL=modulo.js.map