"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoDeclaracao = void 0;
const declaracao_1 = require("./declaracao");
class FuncaoDeclaracao extends declaracao_1.Declaracao {
    constructor(simbolo, funcao, tipoRetorno) {
        super(Number(simbolo.linha), simbolo.hashArquivo);
        this.simbolo = simbolo;
        this.funcao = funcao;
        this.tipoRetorno = tipoRetorno;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarDeclaracaoDefinicaoFuncao(this));
    }
}
exports.FuncaoDeclaracao = FuncaoDeclaracao;
//# sourceMappingURL=funcao.js.map