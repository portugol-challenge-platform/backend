"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = void 0;
class Unario {
    constructor(hashArquivo, operador, operando, incidenciaOperador = 'ANTES') {
        this.linha = operador.linha;
        this.hashArquivo = hashArquivo;
        this.operador = operador;
        this.operando = operando;
        this.incidenciaOperador = incidenciaOperador;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoUnaria(this);
    }
}
exports.Unario = Unario;
//# sourceMappingURL=unario.js.map