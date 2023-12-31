"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Para = void 0;
const declaracao_1 = require("./declaracao");
/**
 * Uma estrutura de repetição `para`, normalmente com um inicializador,
 * uma condição de continuação e uma instrução de incremento.
 */
class Para extends declaracao_1.Declaracao {
    constructor(hashArquivo, linha, inicializador, condicao, incrementar, corpo) {
        super(linha, hashArquivo);
        this.inicializador = inicializador;
        this.condicao = condicao;
        this.incrementar = incrementar;
        this.corpo = corpo;
        this.inicializada = false;
        this.blocoPosExecucao = undefined;
        this.resolverIncrementoEmExecucao = false;
    }
    async aceitar(visitante) {
        return await visitante.visitarDeclaracaoPara(this);
    }
}
exports.Para = Para;
//# sourceMappingURL=para.js.map