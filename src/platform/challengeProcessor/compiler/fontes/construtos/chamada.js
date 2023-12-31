"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chamada = void 0;
const geracao_identificadores_1 = require("../geracao-identificadores");
/**
 * Chamada de funções, métodos, etc.
 */
class Chamada {
    constructor(hashArquivo, entidadeChamada, parentese, argumentos) {
        this.id = (0, geracao_identificadores_1.uuidv4)();
        this.linha = entidadeChamada.linha;
        this.hashArquivo = hashArquivo;
        this.entidadeChamada = entidadeChamada;
        this.parentese = parentese;
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoDeChamada(this);
    }
}
exports.Chamada = Chamada;
//# sourceMappingURL=chamada.js.map