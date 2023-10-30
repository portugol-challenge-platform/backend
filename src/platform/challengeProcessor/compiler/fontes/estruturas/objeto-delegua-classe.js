"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjetoDeleguaClasse = void 0;
const excecoes_1 = require("../excecoes");
class ObjetoDeleguaClasse {
    constructor(classe) {
        this.classe = classe;
        this.campos = {};
    }
    obter(simbolo) {
        if (this.campos.hasOwnProperty(simbolo.lexema)) {
            return this.campos[simbolo.lexema];
        }
        const metodo = this.classe.encontrarMetodo(simbolo.lexema);
        if (metodo)
            return metodo.funcaoPorMetodoDeClasse(this);
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, 'Método indefinido não recuperado.');
    }
    definir(simbolo, valor) {
        this.campos[simbolo.lexema] = valor;
    }
    toString() {
        return '<Objeto ' + this.classe.nome + '>';
    }
}
exports.ObjetoDeleguaClasse = ObjetoDeleguaClasse;
//# sourceMappingURL=objeto-delegua-classe.js.map