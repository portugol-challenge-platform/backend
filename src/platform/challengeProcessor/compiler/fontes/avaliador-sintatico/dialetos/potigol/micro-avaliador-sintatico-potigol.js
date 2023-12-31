"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroAvaliadorSintaticoPotigol = void 0;
const construtos_1 = require("../../../construtos");
const micro_avaliador_sintatico_base_1 = require("../../micro-avaliador-sintatico-base");
const tuplas_1 = require("../../../construtos/tuplas");
const potigol_1 = __importDefault(require("../../../tipos-de-simbolos/potigol"));
class MicroAvaliadorSintaticoPotigol extends micro_avaliador_sintatico_base_1.MicroAvaliadorSintaticoBase {
    constructor(hashArquivo) {
        super();
        this.hashArquivo = hashArquivo;
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case potigol_1.default.PARENTESE_ESQUERDO:
                this.avancarEDevolverAnterior();
                const expressao = this.ou();
                switch (this.simbolos[this.atual].tipo) {
                    case potigol_1.default.VIRGULA:
                        // Tupla
                        const argumentos = [expressao];
                        while (this.simbolos[this.atual].tipo === potigol_1.default.VIRGULA) {
                            this.avancarEDevolverAnterior();
                            argumentos.push(this.ou());
                        }
                        this.consumir(potigol_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                        return new tuplas_1.SeletorTuplas(...argumentos);
                    default:
                        this.consumir(potigol_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                        return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
                }
            case potigol_1.default.CARACTERE:
            case potigol_1.default.INTEIRO:
            case potigol_1.default.LOGICO:
            case potigol_1.default.REAL:
            case potigol_1.default.TEXTO:
                const simboloLiteral = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloLiteral.linha), simboloLiteral.literal);
            case potigol_1.default.FALSO:
            case potigol_1.default.VERDADEIRO:
                const simboloVerdadeiroFalso = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloVerdadeiroFalso.linha), simboloVerdadeiroFalso.tipo === potigol_1.default.VERDADEIRO);
            case potigol_1.default.VIRGULA:
                return undefined;
            default:
                const simboloIdentificador = this.avancarEDevolverAnterior();
                return new construtos_1.ConstanteOuVariavel(this.hashArquivo, simboloIdentificador);
        }
    }
    chamar() {
        return this.primario();
    }
    analisar(retornoLexador, linha) {
        this.erros = [];
        this.atual = 0;
        this.linha = linha;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        const declaracoes = [];
        while (this.atual < this.simbolos.length) {
            declaracoes.push(this.declaracao());
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.MicroAvaliadorSintaticoPotigol = MicroAvaliadorSintaticoPotigol;
//# sourceMappingURL=micro-avaliador-sintatico-potigol.js.map