"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, lexema, literal, linha, hashArquivo) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.literal = literal;
        this.linha = linha;
        this.hashArquivo = hashArquivo;
    }
    paraTexto() {
        return this.tipo + ' ' + this.lexema + ' ' + this.literal;
    }
}
exports.Simbolo = Simbolo;
//# sourceMappingURL=simbolo.js.map