"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstanteOuVariavel = void 0;
/**
 * Este construto existe para alguns dialetos, como Potigol, onde
 * não é possível definir se um construto é constante, variável,
 * identificador de função, tipo ou classe no momento da avaliação
 * primária.
 *
 * Durante o restante da avaliação sintática, esse construto deve **obrigatoriamente**
 * resolver para `Constante`, `Variavel` ou algum construto de chamada/declaração de
 * função.
 */
class ConstanteOuVariavel {
    constructor(hashArquivo, simbolo) {
        this.linha = Number(simbolo.linha);
        this.hashArquivo = hashArquivo;
        this.simbolo = simbolo;
    }
    async aceitar(visitante) {
        return Promise.reject(new Error('Este método não deveria ser chamado. ' +
            'O construto deve resolver como constante ou variável ainda na avaliação sintática.'));
    }
}
exports.ConstanteOuVariavel = ConstanteOuVariavel;
//# sourceMappingURL=constante-ou-variavel.js.map