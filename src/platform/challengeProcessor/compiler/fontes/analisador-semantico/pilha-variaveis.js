"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilhaVariaveis = void 0;
class PilhaVariaveis {
    constructor() {
        this.pilha = [];
    }
    empilhar(item) {
        this.pilha.push(item);
    }
    eVazio() {
        return this.pilha.length === 0;
    }
    topoDaPilha() {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha[this.pilha.length - 1];
    }
    removerUltimo() {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha.pop();
    }
}
exports.PilhaVariaveis = PilhaVariaveis;
//# sourceMappingURL=pilha-variaveis.js.map