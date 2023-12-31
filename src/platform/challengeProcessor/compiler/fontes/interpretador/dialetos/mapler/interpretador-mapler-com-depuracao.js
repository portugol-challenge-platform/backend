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
exports.InterpretadorMaplerComDepuracao = void 0;
const construtos_1 = require("../../../construtos");
const quebras_1 = require("../../../quebras");
const interpretador_com_depuracao_1 = require("../../interpretador-com-depuracao");
const comum = __importStar(require("./comum"));
/**
 * Interpretador com depuração para o dialeto Mapler.
 */
class InterpretadorMaplerComDepuracao extends interpretador_com_depuracao_1.InterpretadorComDepuracao {
    constructor(diretorioBase, funcaoDeRetorno = null, funcaoDeRetornoMesmaLinha = null) {
        super(diretorioBase, funcaoDeRetorno, funcaoDeRetornoMesmaLinha);
        this.mensagemPrompt = '> ';
    }
    async avaliarArgumentosEscrevaMapler(argumentos) {
        let formatoTexto = '';
        for (const argumento of argumentos) {
            const resultadoAvaliacao = await this.avaliar(argumento);
            let valor = (resultadoAvaliacao === null || resultadoAvaliacao === void 0 ? void 0 : resultadoAvaliacao.hasOwnProperty('valor')) ? resultadoAvaliacao.valor : resultadoAvaliacao;
            formatoTexto += `${this.paraTexto(valor)}`;
        }
        return formatoTexto;
    }
    /**
     * No Mapler, o bloco executa se a condição for falsa.
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
     * Implementada para alguns dialetos, como Mapler.
     *
     * Como `readline.question` sobrescreve o que foi escrito antes, aqui
     * definimos `this.mensagemPrompt` para uso com `leia`.
     * No Mapler é muito comum usar `escreva()` seguido de `leia()` para
     * gerar um prompt na mesma linha.
     * @param declaracao A declaração.
     * @returns Sempre nulo, por convenção de visita.
     */
    async visitarExpressaoEscrevaMesmaLinha(declaracao) {
        try {
            const formatoTexto = await this.avaliarArgumentosEscrevaMapler(declaracao.argumentos);
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
            const formatoTexto = await this.avaliarArgumentosEscrevaMapler(declaracao.argumentos);
            this.funcaoDeRetorno(formatoTexto);
            return null;
        }
        catch (erro) {
            this.erros.push(erro);
        }
    }
    async atribuirVariavel(expressao, valor) {
        if (expressao instanceof construtos_1.Variavel) {
            this.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
            return;
        }
        if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
            const promises = await Promise.all([
                this.avaliar(expressao.entidadeChamada),
                this.avaliar(expressao.indice),
            ]);
            let alvo = promises[0];
            let indice = promises[1];
            if (alvo.hasOwnProperty('valor')) {
                alvo = alvo.valor;
            }
            if (indice.hasOwnProperty('valor')) {
                indice = indice.valor;
            }
            alvo[indice] = valor;
        }
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
            await this.atribuirVariavel(argumento, valorLido);
        }
    }
    async visitarExpressaoBinaria(expressao) {
        return comum.visitarExpressaoBinaria(this, expressao);
    }
    async visitarExpressaoLogica(expressao) {
        return comum.visitarExpressaoLogica(this, expressao);
    }
}
exports.InterpretadorMaplerComDepuracao = InterpretadorMaplerComDepuracao;
//# sourceMappingURL=interpretador-mapler-com-depuracao.js.map