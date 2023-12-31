"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leia = void 0;
const geracao_identificadores_1 = require("../geracao-identificadores");
const declaracao_1 = require("./declaracao");
/**
 * Declaração que pede a leitura de uma informação pela entrada
 * configurada no início da aplicação (por exemplo, o console).
 */
class Leia extends declaracao_1.Declaracao {
    constructor(simbolo, argumentos) {
        super(simbolo.linha, simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.id = (0, geracao_identificadores_1.uuidv4)();
        this.argumentos = argumentos;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLeia(this);
    }
}
exports.Leia = Leia;
//# sourceMappingURL=leia.js.map