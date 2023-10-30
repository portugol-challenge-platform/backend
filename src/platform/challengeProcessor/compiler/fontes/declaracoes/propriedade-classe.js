"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropriedadeClasse = void 0;
const declaracao_1 = require("./declaracao");
class PropriedadeClasse extends declaracao_1.Declaracao {
    constructor(nome, tipo) {
        super(Number(nome.linha), nome.hashArquivo);
        this.nome = nome;
        this.tipo = tipo;
    }
    async aceitar(visitante) {
        return Promise.reject(new Error('Não utilizado por enquanto.'));
    }
}
exports.PropriedadeClasse = PropriedadeClasse;
//# sourceMappingURL=propriedade-classe.js.map