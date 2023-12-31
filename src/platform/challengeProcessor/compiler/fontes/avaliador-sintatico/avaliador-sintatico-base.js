"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoBase = void 0;
const construtos_1 = require("../construtos");
const declaracoes_1 = require("../declaracoes");
const erro_avaliador_sintatico_1 = require("./erro-avaliador-sintatico");
const comum_1 = __importDefault(require("../tipos-de-simbolos/comum"));
/**
 * O Avaliador Sintático Base é uma tentativa de mapear métodos em comum
 * entre todos os outros Avaliadores Sintáticos. Depende de um dicionário
 * de tipos de símbolos comuns entre todos os dialetos.
 */
class AvaliadorSintaticoBase {
    declaracaoDeVariaveis() {
        throw new Error('Método não implementado.');
    }
    consumir(tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    }
    erro(simbolo, mensagemDeErro) {
        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }
    simboloAnterior() {
        return this.simbolos[this.atual - 1];
    }
    verificarTipoSimboloAtual(tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual].tipo === tipo;
    }
    verificarTipoProximoSimbolo(tipo) {
        return this.simbolos[this.atual + 1].tipo === tipo;
    }
    estaNoFinal() {
        return this.atual === this.simbolos.length;
    }
    avancarEDevolverAnterior() {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simbolos[this.atual - 1];
    }
    regredirEDevolverAtual() {
        if (this.atual > 0)
            this.atual -= 1;
        return this.simbolos[this.atual];
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
    declaracaoLeia() {
        throw new Error('Método não implementado.');
    }
    finalizarChamada(entidadeChamada) {
        const argumentos = [];
        if (!this.verificarTipoSimboloAtual(comum_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(comum_1.default.VIRGULA));
        }
        const parenteseDireito = this.consumir(comum_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos);
    }
    unario() {
        if (this.verificarSeSimboloAtualEIgualA(comum_1.default.NEGACAO, comum_1.default.SUBTRACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            return new construtos_1.Unario(this.hashArquivo, operador, direito, 'ANTES');
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.EXPONENCIACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.DIVISAO, comum_1.default.DIVISAO_INTEIRA, comum_1.default.MULTIPLICACAO, comum_1.default.MODULO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    adicaoOuSubtracao() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.SUBTRACAO, comum_1.default.ADICAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitShift() {
        throw new Error('Método não implementado.');
    }
    bitE() {
        throw new Error('Método não implementado.');
    }
    bitOu() {
        throw new Error('Método não implementado.');
    }
    comparar() {
        let expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.MAIOR, comum_1.default.MAIOR_IGUAL, comum_1.default.MENOR, comum_1.default.MENOR_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.DIFERENTE, comum_1.default.IGUAL, comum_1.default.IGUAL_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    em() {
        throw new Error('Método não implementado.');
    }
    e() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.E)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(comum_1.default.OU)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.e();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    expressao() {
        return this.atribuir();
    }
    declaracaoExpressao() {
        throw new Error('Método não implementado.');
    }
    declaracaoSustar() {
        throw new Error('Método não implementado.');
    }
    declaracaoContinua() {
        throw new Error('Método não implementado.');
    }
    declaracaoRetorna() {
        throw new Error('Método não implementado.');
    }
    declaracaoImportar() {
        throw new Error('Método não implementado.');
    }
    declaracaoTente() {
        throw new Error('Método não implementado.');
    }
    resolverDeclaracao() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeVariavel() {
        throw new Error('Método não implementado.');
    }
    funcao(tipo) {
        const simboloFuncao = this.avancarEDevolverAnterior();
        const nomeFuncao = this.consumir(comum_1.default.IDENTIFICADOR, `Esperado nome ${tipo}.`);
        return new declaracoes_1.FuncaoDeclaracao(nomeFuncao, this.corpoDaFuncao(tipo));
    }
    declaracaoDeClasse() {
        throw new Error('Método não implementado.');
    }
    logicaComumParametros() {
        const parametros = [];
        do {
            if (parametros.length >= 255) {
                this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 parâmetros');
            }
            const parametro = {};
            if (this.simbolos[this.atual].tipo === comum_1.default.MULTIPLICACAO) {
                this.consumir(comum_1.default.MULTIPLICACAO, null);
                parametro.abrangencia = 'multiplo';
            }
            else {
                parametro.abrangencia = 'padrao';
            }
            parametro.nome = this.consumir(comum_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
            if (this.verificarSeSimboloAtualEIgualA(comum_1.default.IGUAL)) {
                parametro.valorPadrao = this.primario();
            }
            parametros.push(parametro);
            if (parametro.abrangencia === 'multiplo')
                break;
        } while (this.verificarSeSimboloAtualEIgualA(comum_1.default.VIRGULA));
        return parametros;
    }
}
exports.AvaliadorSintaticoBase = AvaliadorSintaticoBase;
//# sourceMappingURL=avaliador-sintatico-base.js.map