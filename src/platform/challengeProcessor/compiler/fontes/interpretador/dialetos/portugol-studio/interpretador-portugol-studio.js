"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorPortugolStudio = void 0;
const interpretador_base_1 = require("../../interpretador-base");
const comum_1 = require("./comum");
class InterpretadorPortugolStudio extends interpretador_base_1.InterpretadorBase {
    constructor(diretorioBase, performance = false, funcaoDeRetorno = null) {
        super(diretorioBase, performance, funcaoDeRetorno);
    }
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeia(expressao) {
        return (0, comum_1.visitarExpressaoLeiaComum)(this.interfaceEntradaSaida, this.pilhaEscoposExecucao, expressao);
    }
}
exports.InterpretadorPortugolStudio = InterpretadorPortugolStudio;
//# sourceMappingURL=interpretador-portugol-studio.js.map