"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeiaMultiplo = void 0;
const geracao_identificadores_1 = require("../geracao-identificadores");
const declaracao_1 = require("./declaracao");
/**
 * Declaração que pede a leitura de várias informações pela entrada
 * configurada no início da aplicação (por exemplo, o console).
 */
class LeiaMultiplo extends declaracao_1.Declaracao {
    constructor(simbolo, argumentos, numeroArgumentosEsperados) {
        super(simbolo.linha, simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.id = (0, geracao_identificadores_1.uuidv4)();
        this.argumentos = argumentos;
        this.numeroArgumentosEsperados = numeroArgumentosEsperados;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoLeiaMultiplo(this);
    }
}
exports.LeiaMultiplo = LeiaMultiplo;
//# sourceMappingURL=leia-multiplo.js.map