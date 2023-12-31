"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroAvaliadorSintaticoBase = void 0;
const construtos_1 = require("../construtos");
const erro_avaliador_sintatico_1 = require("./erro-avaliador-sintatico");
const comum_1 = __importDefault(require("../tipos-de-simbolos/comum"));
class MicroAvaliadorSintaticoBase {
    avancarEDevolverAnterior() {
        if (this.atual < this.simbolos.length)
            this.atual += 1;
        return this.simbolos[this.atual - 1];
    }
    verificarTipoSimboloAtual(tipo) {
        if (this.atual === this.simbolos.length)
            return false;
        return this.simbolos[this.atual].tipo === tipo;
    }
    verificarSeSimboloAtualEIgualA(...argumentos) {
        for (let i = 0; i < argumentos.length; i++) {
            const tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }
        return false;
    }
    erro(simbolo, mensagemDeErro) {
        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }
    consumir(tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    }
    unario() {
        if (this.verificarSeSimboloAtualEIgualA(comum_1.default.NEGACAO, comum_1.default.SUBTRACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            return new construtos_1.Unario(-1, operador, direito, 'ANTES');
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.EXPONENCIACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.DIVISAO, comum_1.default.DIVISAO_INTEIRA, comum_1.default.MODULO, comum_1.default.MULTIPLICACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    adicaoOuSubtracao() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.SUBTRACAO, comum_1.default.ADICAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    comparar() {
        let expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.MAIOR, comum_1.default.MAIOR_IGUAL, comum_1.default.MENOR, comum_1.default.MENOR_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.DIFERENTE, comum_1.default.IGUAL_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    e() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.E)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(-1, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.OU)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.e();
            expressao = new construtos_1.Logico(-1, expressao, operador, direito);
        }
        return expressao;
    }
    declaracao() {
        return this.ou();
    }
}
exports.MicroAvaliadorSintaticoBase = MicroAvaliadorSintaticoBase;
//# sourceMappingURL=micro-avaliador-sintatico-base.js.map