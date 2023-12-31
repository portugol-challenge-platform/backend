"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Septeto = void 0;
const tupla_1 = require("./tupla");
class Septeto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
}
exports.Septeto = Septeto;
//# sourceMappingURL=septeto.js.map