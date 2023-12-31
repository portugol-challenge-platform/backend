"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noneto = void 0;
const tupla_1 = require("./tupla");
class Noneto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo, oitavo, nono) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
        this.oitavo = oitavo;
        this.nono = nono;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
}
exports.Noneto = Noneto;
//# sourceMappingURL=noneto.js.map