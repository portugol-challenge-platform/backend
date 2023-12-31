"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassePadrao = void 0;
const chamavel_1 = require("./chamavel");
/**
 * Classe de importação de classes de bibliotecas do JavaScript.
 */
class ClassePadrao extends chamavel_1.Chamavel {
    constructor(nome, funcaoDeClasse) {
        super();
        this.nome = nome;
        this.funcaoDeClasse = funcaoDeClasse;
    }
    paraTexto() {
        return `<classe-padrão ${this.nome}>`;
    }
    /**
     * Para o caso de uma classe padrão, instanciá-la é chamá-la
     * como função tendo a palavra 'new' na frente.
     * @param argumentos
     * @param simbolo
     */
    chamar(argumentos, simbolo) {
        const novoObjeto = new this.funcaoDeClasse();
        return novoObjeto;
    }
}
exports.ClassePadrao = ClassePadrao;
//# sourceMappingURL=classe-padrao.js.map