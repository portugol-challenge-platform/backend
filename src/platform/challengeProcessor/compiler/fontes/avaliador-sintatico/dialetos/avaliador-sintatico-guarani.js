"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoGuarani = void 0;
const construtos_1 = require("../../construtos");
const declaracoes_1 = require("../../declaracoes");
const avaliador_sintatico_base_1 = require("../avaliador-sintatico-base");
const guarani_1 = __importDefault(require("../../tipos-de-simbolos/guarani"));
class AvaliadorSintaticoGuarani extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        if (this.verificarSeSimboloAtualEIgualA(guarani_1.default.NUMERO, guarani_1.default.TEXTO)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    }
    chamar() {
        let expressao = this.primario();
        /* while (true) {
            if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            } else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO)) {
                const nome = this.consumir(tiposDeSimbolos.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new AcessoMetodo(this.hashArquivo, expressao, nome);
            } else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.COLCHETE_ESQUERDO)) {
                const indice = this.expressao();
                const simboloFechamento = this.consumir(
                    tiposDeSimbolos.COLCHETE_DIREITO,
                    "Esperado ']' após escrita do indice."
                );
                expressao = new AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            } else {
                break;
            }
        } */
        return expressao;
    }
    atribuir() {
        const expressao = this.ou();
        /* if (
            expressao instanceof Binario &&
            [
                tiposDeSimbolos.MAIS_IGUAL,
                tiposDeSimbolos.MENOS_IGUAL,
                tiposDeSimbolos.MULTIPLICACAO_IGUAL,
                tiposDeSimbolos.DIVISAO_IGUAL,
                tiposDeSimbolos.DIVISAO_INTEIRA_IGUAL,
                tiposDeSimbolos.MODULO_IGUAL,
            ].includes(expressao.operador.tipo)
        ) {
            return new Atribuir(this.hashArquivo, (expressao.esquerda as Variavel).simbolo, expressao);
        } else if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.IGUAL)) {
            const igual = this.simbolos[this.atual - 1];
            const valor = this.atribuir();

            if (expressao instanceof Variavel) {
                const simbolo = expressao.simbolo;
                return new Atribuir(this.hashArquivo, simbolo, valor);
            } else if (expressao instanceof AcessoMetodo) {
                const get = expressao;
                // return new Conjunto(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
                return new DefinirValor(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
            } else if (expressao instanceof AcessoIndiceVariavel) {
                return new AtribuicaoPorIndice(
                    this.hashArquivo,
                    0,
                    expressao.entidadeChamada,
                    expressao.indice,
                    valor
                );
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        } */
        return expressao;
    }
    declaracaoEscreva() {
        const simboloAtual = this.consumir(guarani_1.default.HAI, '');
        this.consumir(guarani_1.default.PARENTESE_ESQUERDO, "Oñeha'arõ '(' valores mboyve jehaipyrépe.");
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(guarani_1.default.VIRGULA));
        this.consumir(guarani_1.default.PARENTESE_DIREITO, "Oñeha'arõ ')' valores rire jehaipyrépe.");
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    blocoEscopo() {
        throw new Error('Método não implementado.');
    }
    declaracaoSe() {
        throw new Error('Método não implementado.');
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
    corpoDaFuncao(tipo) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        const parenteseEsquerdo = this.consumir(guarani_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${tipo}.`);
        let parametros = [];
        if (!this.verificarTipoSimboloAtual(guarani_1.default.PARENTESE_DIREITO)) {
            parametros = this.logicaComumParametros();
        }
        this.consumir(guarani_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(guarani_1.default.CHAVE_ESQUERDA, `Esperado '{' antes do escopo do ${tipo}.`);
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(parenteseEsquerdo.linha), parametros, corpo);
    }
    expressao() {
        // if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.LEIA)) return this.declaracaoLeia();
        return this.atribuir();
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case guarani_1.default.HAI:
                return this.declaracaoEscreva();
            default:
                return this.expressao();
        }
    }
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        const declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoGuarani = AvaliadorSintaticoGuarani;
//# sourceMappingURL=avaliador-sintatico-guarani.js.map