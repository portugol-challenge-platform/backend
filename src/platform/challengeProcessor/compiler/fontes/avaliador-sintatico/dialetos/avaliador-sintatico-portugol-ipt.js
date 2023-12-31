"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoPortugolIpt = void 0;
const construtos_1 = require("../../construtos");
const declaracoes_1 = require("../../declaracoes");
const avaliador_sintatico_base_1 = require("../avaliador-sintatico-base");
const portugol_ipt_1 = __importDefault(require("../../tipos-de-simbolos/portugol-ipt"));
class AvaliadorSintaticoPortugolIpt extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
    primario() {
        switch (this.simbolos[this.atual].tipo) {
            case portugol_ipt_1.default.IDENTIFICADOR:
                const simboloIdentificador = this.avancarEDevolverAnterior();
                return new construtos_1.Variavel(this.hashArquivo, simboloIdentificador);
            case portugol_ipt_1.default.INTEIRO:
            case portugol_ipt_1.default.TEXTO:
                const simboloAnterior = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
    }
    /**
     * Aparentemente, o Portugol IPT não suporta chamadas de função.
     * @returns O retorno da chamada de `primario()`.
     */
    chamar() {
        return this.primario();
    }
    atribuir() {
        const expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.SETA_ATRIBUICAO)) {
            const setaAtribuicao = this.simbolos[this.atual - 1];
            const valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoPorIndice(this.hashArquivo, expressao.linha, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(setaAtribuicao, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    /**
     * A declaração escreva (ou escrever) do Portugol IPT é sempre na mesma linha.
     */
    declaracaoEscreva() {
        const simboloAtual = this.avancarEDevolverAnterior();
        // const argumentos = this.logicaComumEscreva();
        const argumentos = [];
        do {
            const valor = this.resolverDeclaracaoForaDeBloco();
            argumentos.push(new construtos_1.FormatacaoEscrita(this.hashArquivo, Number(simboloAtual.linha), valor));
        } while (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.VIRGULA));
        return new declaracoes_1.EscrevaMesmaLinha(Number(simboloAtual.linha), this.hashArquivo, argumentos);
    }
    blocoEscopo() {
        throw new Error('Método não implementado.');
    }
    declaracaoSe() {
        this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        this.consumir(portugol_ipt_1.default.ENTAO, "Esperado 'então' ou 'entao' após condição do se.");
        this.consumir(portugol_ipt_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'então' ou 'entao' em condição se.");
        const caminhoEntao = this.resolverDeclaracaoForaDeBloco();
        while (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.QUEBRA_LINHA))
            ;
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.SENAO)) {
            this.consumir(portugol_ipt_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'senão' ou 'senao' em instrução se.");
            caminhoSenao = this.resolverDeclaracaoForaDeBloco();
        }
        this.consumir(portugol_ipt_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'então' ou 'entao' em condição se.");
        this.consumir(portugol_ipt_1.default.FIMSE, "Esperado 'fimse' para finalização de uma instrução se.");
        return new declaracoes_1.Se(condicao, caminhoEntao, [], caminhoSenao);
    }
    declaracaoEnquanto() {
        throw new Error('Método não implementado.');
    }
    declaracaoPara() {
        throw new Error('Método não implementado.');
    }
    declaracaoEscolha() {
        throw new Error('Método não implementado.');
    }
    declaracaoFazer() {
        throw new Error('Método não implementado.');
    }
    declaracaoInteiros() {
        const simboloInteiro = this.consumir(portugol_ipt_1.default.INTEIRO, '');
        const inicializacoes = [];
        do {
            const identificador = this.consumir(portugol_ipt_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'inteiro'.");
            // Inicializações de variáveis podem ter valores definidos.
            let valorInicializacao = 0;
            if (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.IGUAL)) {
                const literalInicializacao = this.consumir(portugol_ipt_1.default.INTEIRO, 'Esperado literal inteiro após símbolo de igual em declaração de variável.');
                valorInicializacao = Number(literalInicializacao.literal);
            }
            inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloInteiro.linha), valorInicializacao)));
        } while (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.VIRGULA));
        return inicializacoes;
    }
    /**
     * Análise de uma declaração `leia()`. No VisuAlg, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const argumentos = [];
        do {
            argumentos.push(this.resolverDeclaracaoForaDeBloco());
        } while (this.verificarSeSimboloAtualEIgualA(portugol_ipt_1.default.VIRGULA));
        return new declaracoes_1.Leia(simboloAtual, argumentos);
    }
    corpoDaFuncao(tipo) {
        throw new Error('Método não implementado.');
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case portugol_ipt_1.default.ESCREVER:
                return this.declaracaoEscreva();
            case portugol_ipt_1.default.INTEIRO:
                return this.declaracaoInteiros();
            case portugol_ipt_1.default.LER:
                return this.declaracaoLeia();
            case portugol_ipt_1.default.QUEBRA_LINHA:
                this.avancarEDevolverAnterior();
                return null;
            case portugol_ipt_1.default.SE:
                return this.declaracaoSe();
            default:
                return this.expressao();
        }
    }
    validarSegmentoInicio() {
        this.consumir(portugol_ipt_1.default.INICIO, `Esperada expressão 'inicio' para marcar escopo do algoritmo.`);
    }
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        while (this.verificarTipoSimboloAtual(portugol_ipt_1.default.QUEBRA_LINHA)) {
            this.avancarEDevolverAnterior();
        }
        let declaracoes = [];
        this.validarSegmentoInicio();
        while (!this.estaNoFinal() && this.simbolos[this.atual].tipo !== portugol_ipt_1.default.FIM) {
            const resolucaoDeclaracao = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(resolucaoDeclaracao)) {
                declaracoes = declaracoes.concat(resolucaoDeclaracao);
            }
            else {
                declaracoes.push(resolucaoDeclaracao);
            }
        }
        return {
            declaracoes: declaracoes.filter((d) => d),
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoPortugolIpt = AvaliadorSintaticoPortugolIpt;
//# sourceMappingURL=avaliador-sintatico-portugol-ipt.js.map