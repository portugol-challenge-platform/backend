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
exports.InterpretadorPotigolComDepuracao = void 0;
const biblioteca_global_1 = require("../../../bibliotecas/dialetos/potigol/biblioteca-global");
const interpretador_com_depuracao_1 = require("../../interpretador-com-depuracao");
const comum = __importStar(require("./comum"));
class InterpretadorPotigolComDepuracao extends interpretador_com_depuracao_1.InterpretadorComDepuracao {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        super(diretorioBase, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
        this.expandirPropriedadesDeObjetosEmEspacoVariaveis = true;
        this.regexInterpolacao = /{(.*?)}/g;
        (0, biblioteca_global_1.registrarBibliotecaGlobalPotigol)(this, this.pilhaEscoposExecucao);
    }
    async resolverInterpolacoes(textoOriginal, linha) {
        return comum.resolverInterpolacoes(this, textoOriginal, linha);
    }
    retirarInterpolacao(texto, variaveis) {
        return comum.retirarInterpolacao(texto, variaveis);
    }
    async visitarExpressaoAcessoMetodo(expressao) {
        return comum.visitarExpressaoAcessoMetodo(this, expressao);
    }
}
exports.InterpretadorPotigolComDepuracao = InterpretadorPotigolComDepuracao;
//# sourceMappingURL=interpretador-potigol-com-depuracao.js.map