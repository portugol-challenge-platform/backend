"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Octeto = void 0;
const tupla_1 = require("./tupla");
class Octeto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo, oitavo) {
        super();
        this.primeiro = primeiro;
        this.segundo = segundo;
        this.terceiro = terceiro;
        this.quarto = quarto;
        this.quinto = quinto;
        this.sexto = sexto;
        this.setimo = setimo;
        this.oitavo = oitavo;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
}
exports.Octeto = Octeto;
//# sourceMappingURL=octeto.js.map