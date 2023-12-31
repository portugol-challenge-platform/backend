"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretadorPortugolStudioComDepuracao = void 0;
const comum_1 = require("./comum");
const interpretador_com_depuracao_1 = require("../../interpretador-com-depuracao");
class InterpretadorPortugolStudioComDepuracao extends interpretador_com_depuracao_1.InterpretadorComDepuracao {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        super(diretorioBase, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
        this.mensagemPrompt = '> ';
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
    /**
     * No Portugol Studio, como o bloco de execução da função `inicio` é criado
     * pelo avaliador sintático, precisamos ter uma forma aqui de avançar o
     * primeiro bloco pós execução de comando, seja ele qual for.
     */
    avancarPrimeiroEscopoAposInstrucao() {
        const escopoUm = this.pilhaEscoposExecucao.naPosicao(1);
        if (!escopoUm)
            return;
        escopoUm.declaracaoAtual = escopoUm.declaracoes.length;
    }
    async instrucaoContinuarInterpretacao(escopo) {
        const retornoExecucao = await super.instrucaoContinuarInterpretacao(escopo);
        this.avancarPrimeiroEscopoAposInstrucao();
        return retornoExecucao;
    }
    async instrucaoPasso(escopo) {
        const retornoExecucaoPasso = await super.instrucaoPasso(escopo);
        this.avancarPrimeiroEscopoAposInstrucao();
        return retornoExecucaoPasso;
    }
}
exports.InterpretadorPortugolStudioComDepuracao = InterpretadorPortugolStudioComDepuracao;
//# sourceMappingURL=interpretador-portugol-studio-com-depuracao.js.map