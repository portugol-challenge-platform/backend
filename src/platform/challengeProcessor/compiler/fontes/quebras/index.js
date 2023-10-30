"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinuarQuebra = exports.SustarQuebra = exports.RetornoQuebra = exports.Quebra = void 0;
class Quebra {
}
exports.Quebra = Quebra;
class RetornoQuebra extends Quebra {
    constructor(valor) {
        super();
        this.valor = valor;
    }
}
exports.RetornoQuebra = RetornoQuebra;
class SustarQuebra extends Quebra {
}
exports.SustarQuebra = SustarQuebra;
class ContinuarQuebra extends Quebra {
}
exports.ContinuarQuebra = ContinuarQuebra;
//# sourceMappingURL=index.js.map