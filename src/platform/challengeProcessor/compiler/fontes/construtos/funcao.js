"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncaoConstruto = void 0;
class FuncaoConstruto {
    constructor(hashArquivo, linha, parametros, corpo, tipoRetorno) {
        this.linha = linha;
        this.hashArquivo = hashArquivo;
        this.parametros = parametros;
        this.tipoRetorno = tipoRetorno;
        this.corpo = corpo;
    }
    async aceitar(visitante) {
        return Promise.resolve(visitante.visitarExpressaoDeleguaFuncao(this));
    }
}
exports.FuncaoConstruto = FuncaoConstruto;
//# sourceMappingURL=funcao.js.map