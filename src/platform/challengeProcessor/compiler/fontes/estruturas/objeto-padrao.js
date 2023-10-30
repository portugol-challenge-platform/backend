"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoPadrao = void 0;
/**
 * Um objeto padrão é uma instância de uma Classe Padrão (JavaScript).
 * TODO: Marcado para depreciação na próxima versão.
 */
class ObjetoPadrao {
    constructor(classePadrao) {
        this.classePadrao = classePadrao;
    }
    paraTexto() {
        let retornoTexto = `<objeto-padrão da classe ${this.classePadrao}>\n`;
        for (const [nome, valor] of Object.entries(this)) {
            retornoTexto += `    - ${nome}: ${valor}\n`;
        }
        retornoTexto += `</objeto-padrão>`;
        return retornoTexto;
    }
}
exports.ObjetoPadrao = ObjetoPadrao;
//# sourceMappingURL=objeto-padrao.js.map