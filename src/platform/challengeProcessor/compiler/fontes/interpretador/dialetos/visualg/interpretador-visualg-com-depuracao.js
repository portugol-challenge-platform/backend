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
exports.InterpretadorVisuAlgComDepuracao = void 0;
const _ = __importStar(require("lodash"));
const visualg_1 = require("../../../bibliotecas/dialetos/visualg");
const quebras_1 = require("../../../quebras");
const interpretador_com_depuracao_1 = require("../../interpretador-com-depuracao");
const comum = __importStar(require("./comum"));
/**
 * Interpretador com depuração para o dialeto VisuAlg.
 */
class InterpretadorVisuAlgComDepuracao extends interpretador_com_depuracao_1.InterpretadorComDepuracao {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        super(diretorioBase, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
        this.mensagemPrompt = '> ';
        (0, visualg_1.registrarBibliotecaNumericaVisuAlg)(this, this.pilhaEscoposExecucao);
        (0, visualg_1.registrarBibliotecaCaracteresVisuAlg)(this, this.pilhaEscoposExecucao);
    }
    visitarDeclaracaoConst(declaracao) {
        throw new Error('Método não implementado.');
    }
    async avaliarArgumentosEscrevaVisuAlg(argumentos) {
        let formatoTexto = '';
        for (const argumento of argumentos) {
            const resultadoAvaliacao = await this.avaliar(argumento);
            let valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor')) ? resultadoAvaliacao.valor : resultadoAvaliacao;
            formatoTexto += `${this.paraTexto(valor)}`;
        }
        return formatoTexto;
    }
    /**
     * No VisuAlg, o bloco executa se a condição for falsa.
     * Por isso a reimplementação aqui.
     * @param declaracao A declaração `Fazer`
     * @returns Só retorna em caso de erro na execução, e neste caso, o erro.
     */
    async visitarDeclaracaoFazer(declaracao) {
        let retornoExecucao;
        do {
            try {
                retornoExecucao = await this.executar(declaracao.caminhoFazer);
                if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                    retornoExecucao = null;
                }
            }
            catch (erro) {
                return Promise.reject(erro);
            }
        } while (!(retornoExecucao instanceof quebras_1.Quebra) &&
            !this.eVerdadeiro(await this.avaliar(declaracao.condicaoEnquanto)));
    }
    /**
     * Execução de uma escrita na saída padrão, sem quebras de linha.
     * Implementada para alguns dialetos, como VisuAlg.
     *
     * Como `readline.question` sobrescreve o que foi escrito antes, aqui
     * definimos `this.mensagemPrompt` para uso com `leia`.
     * No VisuAlg é muito comum usar `escreva()` seguido de `leia()` para
     * gerar um prompt na mesma linha.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarExpressaoEscrevaMesmaLinha(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscrevaVisuAlg(declaracao.argumentos);
            this.mensagemPrompt = formatoTexto;
            this.funcaoDeRetornoMesmaLinha(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push(erro);
        }
    }
    /**
     * Execução de uma escrita na saída configurada, que pode ser `console` (padrão) ou
     * alguma função para escrever numa página Web.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarExpressaoEscreva(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscrevaVisuAlg(declaracao.argumentos);
            this.funcaoDeRetorno(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push(erro);
        }
    }
    async visitarExpressaoFimPara(declaracao) {
        if (!this.eVerdadeiro(await this.avaliar(declaracao.condicaoPara))) {
            const escopoPara = this.pilhaEscoposExecucao.pilha[this.pilhaEscoposExecucao.pilha.length - 2];
            if (this.comando === 'proximo') {
                escopoPara.declaracaoAtual++;
            }
            escopoPara.emLacoRepeticao = false;
            return new quebras_1.SustarQuebra();
        }
        if (declaracao.incremento === null || declaracao.incremento === undefined) {
            return;
        }
        await this.executar(declaracao.incremento);
    }
    /**
     * Execução da leitura de valores da entrada configurada no
     * início da aplicação.
     * @param expressao Expressão do tipo Leia
     * @returns Promise com o resultado da leitura.
     */
    async visitarExpressaoLeia(expressao) {
        for (let argumento of expressao.argumentos) {
            const promessaLeitura = () => new Promise((resolucao) => this.interfaceEntradaSaida.question(this.mensagemPrompt, (resposta) => {
                this.mensagemPrompt = '> ';
                resolucao(resposta);
            }));
            const valorLido = await promessaLeitura();
            await comum.atribuirVariavel(this, argumento, valorLido);
        }
    }
    async visitarDeclaracaoPara(declaracao) {
        const cloneDeclaracao = _.cloneDeep(declaracao);
        const corpoExecucao = cloneDeclaracao.corpo;
        if (cloneDeclaracao.inicializador !== null) {
            await this.avaliar(cloneDeclaracao.inicializador);
            // O incremento vai ao final do bloco de escopo.
            if (cloneDeclaracao.incrementar !== null) {
                await comum.resolverIncrementoPara(this, cloneDeclaracao);
                corpoExecucao.declaracoes.push(cloneDeclaracao.incrementar);
            }
        }
        const escopoAtual = this.pilhaEscoposExecucao.topoDaPilha();
        switch (this.comando) {
            case 'proximo':
                if (cloneDeclaracao.condicao !== null &&
                    this.eVerdadeiro(await this.avaliar(cloneDeclaracao.condicao))) {
                    escopoAtual.emLacoRepeticao = true;
                    const resultadoBloco = this.executarBloco(corpoExecucao.declaracoes);
                    return resultadoBloco;
                }
                escopoAtual.emLacoRepeticao = false;
                return null;
            default:
                let retornoExecucao;
                while (!(retornoExecucao instanceof quebras_1.Quebra) && !this.pontoDeParadaAtivo) {
                    if (cloneDeclaracao.condicao !== null &&
                        !this.eVerdadeiro(await this.avaliar(cloneDeclaracao.condicao))) {
                        break;
                    }
                    try {
                        retornoExecucao = await this.executar(corpoExecucao);
                        if (retornoExecucao instanceof quebras_1.SustarQuebra) {
                            return null;
                        }
                        if (retornoExecucao instanceof quebras_1.ContinuarQuebra) {
                            retornoExecucao = null;
                        }
                    }
                    catch (erro) {
                        return Promise.reject(erro);
                    }
                }
                return retornoExecucao;
        }
    }
    async visitarExpressaoBinaria(expressao) {
        return comum.visitarExpressaoBinaria(this, expressao);
    }
    async visitarExpressaoLogica(expressao) {
        return comum.visitarExpressaoLogica(this, expressao);
    }
}
exports.InterpretadorVisuAlgComDepuracao = InterpretadorVisuAlgComDepuracao;
//# sourceMappingURL=interpretador-visualg-com-depuracao.js.map