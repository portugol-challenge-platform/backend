"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradutorPortugolIpt = void 0;
const dialetos_1 = require("../avaliador-sintatico/dialetos");
const dialetos_2 = require("../lexador/dialetos");
class TradutorPortugolIpt {
    constructor() {
        this.indentacao = 0;
        this.dicionarioConstrutos = {
            FormatacaoEscrita: this.traduzirConstrutoFormatacaoEscrita.bind(this),
            Literal: this.traduzirConstrutoLiteral.bind(this),
        };
        this.dicionarioDeclaracoes = {
            Escreva: this.traduzirDeclaracaoEscreva.bind(this),
            EscrevaMesmaLinha: this.traduzirDeclaracaoEscrevaMesmaLinha.bind(this),
        };
    }
    traduzirConstrutoLiteral(literal) {
        if (typeof literal.valor === 'string')
            return `'${literal.valor}'`;
        return literal.valor;
    }
    traduzirConstrutoFormatacaoEscrita(formatacaoEscrita) {
        let resultado = '';
        resultado += String(formatacaoEscrita.expressao.valor);
        return resultado;
    }
    traduzirDeclaracaoEscreva(declaracaoEscreva) {
        let resultado = 'escreva(';
        for (const argumento of declaracaoEscreva.argumentos) {
            const valor = this.dicionarioConstrutos[argumento.expressao.constructor.name](argumento.expressao);
            resultado += valor + ', ';
        }
        resultado = resultado.slice(0, -2);
        resultado += ')';
        return resultado;
    }
    traduzirDeclaracaoEscrevaMesmaLinha(declaracaoEscreva) {
        let resultado = 'escreva(';
        for (const argumento of declaracaoEscreva.argumentos) {
            const valor = this.dicionarioConstrutos[argumento.expressao.constructor.name](argumento.expressao);
            resultado += valor + ', ';
        }
        resultado = resultado.slice(0, -2);
        resultado += ')';
        return resultado;
    }
    traduzir(codigo) {
        let resultado = '';
        this.lexador = new dialetos_2.LexadorPortugolIpt();
        this.avaliadorSintatico = new dialetos_1.AvaliadorSintaticoPortugolIpt();
        const retornoLexador = this.lexador.mapear(codigo.split('\n'), -1);
        const retornoAvaliadorSintatico = this.avaliadorSintatico.analisar(retornoLexador, -1);
        for (const declaracao of retornoAvaliadorSintatico.declaracoes) {
            resultado += `${this.dicionarioDeclaracoes[declaracao.constructor.name](declaracao)} \n`;
        }
        return resultado;
    }
}
exports.TradutorPortugolIpt = TradutorPortugolIpt;
//# sourceMappingURL=tradutor-portugol-ipt.js.map