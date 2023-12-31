"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importar = void 0;
const declaracao_1 = require("./declaracao");
class Importar extends declaracao_1.Declaracao {
    constructor(caminho, simboloFechamento) {
        super(caminho.linha, caminho.hashArquivo);
        this.caminho = caminho;
        this.simboloFechamento = simboloFechamento;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoImportar(this);
    }
}
exports.Importar = Importar;
//# sourceMappingURL=importar.js.map