"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deceto = void 0;
const tupla_1 = require("./tupla");
class Deceto extends tupla_1.Tupla {
    constructor(primeiro, segundo, terceiro, quarto, quinto, sexto, setimo, oitavo, nono, decimo) {
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
        this.decimo = decimo;
    }
    get sétimo() {
        return this.setimo;
    }
    set sétimo(valor) {
        this.setimo = valor;
    }
    get décimo() {
        return this.decimo;
    }
    set décimo(valor) {
        this.decimo = valor;
    }
}
exports.Deceto = Deceto;
//# sourceMappingURL=deceto.js.map