"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaClasse = void 0;
const chamavel_1 = require("./chamavel");
const objeto_delegua_classe_1 = require("./objeto-delegua-classe");
/**
 * Estrutura de declaração de classe.
 */
class DeleguaClasse extends chamavel_1.Chamavel {
    constructor(nome, superClasse, metodos, propriedades) {
        super();
        this.nome = nome;
        this.superClasse = superClasse;
        this.metodos = metodos || {};
        this.propriedades = propriedades || [];
    }
    encontrarMetodo(nome) {
        if (this.metodos.hasOwnProperty(nome)) {
            return this.metodos[nome];
        }
        if (this.superClasse !== null && this.superClasse !== undefined) {
            return this.superClasse.encontrarMetodo(nome);
        }
        return undefined;
    }
    encontrarPropriedade(nome) {
        if (nome in this.propriedades) {
            return this.propriedades[nome];
        }
        if (this.superClasse !== null && this.superClasse !== undefined) {
            return this.superClasse.encontrarPropriedade(nome);
        }
        return undefined;
    }
    paraTexto() {
        let texto = `<classe ${this.nome}`;
        for (let propriedade of this.propriedades) {
            texto += ` ${propriedade.nome}`;
            if (propriedade.tipo) {
                texto += `:${propriedade.tipo}`;
            }
            texto += ' ';
        }
        texto += '>';
        return texto;
    }
    toString() {
        return this.paraTexto();
    }
    aridade() {
        const inicializador = this.encontrarMetodo('construtor');
        return inicializador ? inicializador.aridade() : 0;
    }
    async chamar(visitante, argumentos) {
        const instancia = new objeto_delegua_classe_1.ObjetoDeleguaClasse(this);
        const inicializador = this.encontrarMetodo('construtor');
        if (inicializador) {
            const metodoConstrutor = inicializador.funcaoPorMetodoDeClasse(instancia);
            await metodoConstrutor.chamar(visitante, argumentos);
        }
        return instancia;
    }
}
exports.DeleguaClasse = DeleguaClasse;
//# sourceMappingURL=delegua-classe.js.map