"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorBirlComDepuracao = void 0;
const interpretador_com_depuracao_1 = require("../../interpretador-com-depuracao");
const comum = __importStar(require("./comum"));
class InterpretadorBirlComDepuracao extends interpretador_com_depuracao_1.InterpretadorComDepuracao {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        super(diretorioBase, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
    }
    async atribuirVariavel(interpretador, expressao, valor, tipo) {
        return comum.atribuirVariavel(interpretador, expressao, valor, tipo);
    }
    async resolveQuantidadeDeInterpolacoes(expressao) {
        return comum.resolveQuantidadeDeInterpolacoes(expressao);
    }
    async verificaTipoDaInterpolação(dados) {
        return comum.verificaTipoDaInterpolação(dados);
    }
    async substituirValor(stringOriginal, novoValor, simboloTipo) {
        return comum.substituirValor(stringOriginal, novoValor, simboloTipo);
    }
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeia(expressao) {
        await comum.visitarExpressaoLeia(this, expressao);
    }
    async visitarExpressaoLiteral(expressao) {
        return comum.visitarExpressaoLiteral(expressao);
    }
    async visitarDeclaracaoPara(declaracao) {
        return comum.visitarDeclaracaoPara(this, declaracao);
    }
    async avaliarArgumentosEscreva(argumentos) {
        return comum.avaliarArgumentosEscreva(this, argumentos);
    }
    async interpretar(declaracoes, manterAmbiente) {
        return comum.interpretar(this, declaracoes, manterAmbiente);
    }
}
exports.InterpretadorBirlComDepuracao = InterpretadorBirlComDepuracao;
//# sourceMappingURL=interpretador-birl-com-depuracao.js.map