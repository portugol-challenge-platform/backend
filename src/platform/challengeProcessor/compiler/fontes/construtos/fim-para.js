"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FimPara = void 0;
/**
 * Construto especial para algumas linguagens como VisuAlg,
 * que combina a avaliação da condição de continuação
 * com o incremento. No caso específico do VisuAlg,
 * ao final da última execução do bloco `para`,
 * o incremento não acontece.
 *
 * Considerando como o depurador executa, o efeito visual
 * usando apenas as declarações já existentes causava uma
 * série de comportamentos estranhos.
 */
class FimPara {
    constructor(hashArquivo, linha, condicaoPara, blocoIncremento) {
        this.hashArquivo = hashArquivo;
        this.linha = linha;
        this.condicaoPara = condicaoPara;
        this.incremento = blocoIncremento;
    }
    async aceitar(visitante) {
        return await visitante.visitarExpressaoFimPara(this);
    }
}
exports.FimPara = FimPara;
//# sourceMappingURL=fim-para.js.map