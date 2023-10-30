"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classe = void 0;
const declaracao_1 = require("./declaracao");
class Classe extends declaracao_1.Declaracao {
    constructor(simbolo, superClasse, metodos, propriedades = []) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.superClasse = superClasse;
        this.metodos = metodos;
        this.propriedades = propriedades;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoClasse(this);
    }
}
exports.Classe = Classe;
//# sourceMappingURL=classe.js.map