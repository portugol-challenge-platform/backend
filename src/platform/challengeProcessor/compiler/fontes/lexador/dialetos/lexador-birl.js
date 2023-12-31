"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorBirl = void 0;
const lexador_base_linha_unica_1 = require("../lexador-base-linha-unica");
const simbolo_1 = require("../simbolo");
const birl_1 = __importDefault(require("../../tipos-de-simbolos/birl"));
const birl_2 = require("./palavras-reservadas/birl");
class LexadorBirl extends lexador_base_linha_unica_1.LexadorBaseLinhaUnica {
    adicionarSimbolo(tipo, lexema = '', literal = null) {
        this.simbolos.push(new simbolo_1.Simbolo(tipo, lexema, literal, this.linha, this.hashArquivo));
    }
    proximoIgualA(esperado) {
        if (this.eFinalDoCodigo()) {
            return false;
        }
        if (this.codigo[this.atual] !== esperado) {
            return false;
        }
        this.atual += 1;
        return true;
    }
    analisarTexto(delimitador) {
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Caractere não finalizado',
            });
            return;
        }
        const valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(birl_1.default.TEXTO, valor, valor);
    }
    analisarNumero() {
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        const numeroCompleto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(birl_1.default.NUMERO, numeroCompleto, parseFloat(numeroCompleto));
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual);
        const codigoMinusculo = codigo.toLowerCase();
        const tipo = codigoMinusculo in birl_2.palavrasReservadas ? birl_2.palavrasReservadas[codigoMinusculo] : birl_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo, codigo, codigo);
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case ',':
                this.adicionarSimbolo(birl_1.default.VIRGULA, ',', null);
                this.avancar();
                break;
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(birl_1.default.MENOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(birl_1.default.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(birl_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(birl_1.default.MAIOR);
                }
                break;
            case '(':
                this.adicionarSimbolo(birl_1.default.PARENTESE_ESQUERDO, '(', null);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(birl_1.default.PARENTESE_DIREITO, ')', null);
                this.avancar();
                break;
            case '=':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(birl_1.default.IGUAL_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(birl_1.default.IGUAL);
                }
                break;
            case '&':
                this.avancar();
                if (this.simboloAtual() === '&') {
                    this.avancar();
                    this.adicionarSimbolo(birl_1.default.E);
                }
                else {
                    this.adicionarSimbolo(birl_1.default.PONTEIRO);
                }
                break;
            case '+':
                this.avancar();
                if (this.simboloAtual() === '+') {
                    this.avancar();
                    this.adicionarSimbolo(birl_1.default.INCREMENTAR);
                }
                else {
                    this.adicionarSimbolo(birl_1.default.ADICAO);
                }
                break;
            case '-':
                this.avancar();
                if (this.simboloAtual() === '-') {
                    this.avancar();
                    this.adicionarSimbolo(birl_1.default.DECREMENTAR);
                }
                else {
                    this.adicionarSimbolo(birl_1.default.SUBTRACAO);
                }
                break;
            case '|':
                this.avancar();
                if (this.simboloAtual() === '|') {
                    this.avancar();
                    this.adicionarSimbolo(birl_1.default.OU);
                }
                else {
                    this.adicionarSimbolo(birl_1.default.OU);
                }
                break;
            case '*':
                this.adicionarSimbolo(birl_1.default.MULTIPLICACAO);
                this.avancar();
                break;
            case '/':
                this.adicionarSimbolo(birl_1.default.DIVISAO);
                this.avancar();
                break;
            case '%':
                this.adicionarSimbolo(birl_1.default.MODULO);
                this.avancar();
                break;
            case "'":
                this.analisarTexto("'");
                this.avancar();
                break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
                this.avancar();
                break;
            case ';':
                this.adicionarSimbolo(birl_1.default.PONTO_E_VIRGULA, ';', null);
                this.avancar();
                break;
            case '?':
                this.adicionarSimbolo(birl_1.default.INTERROGACAO, '?', null);
                this.avancar();
                break;
            case '\n':
                this.adicionarSimbolo(birl_1.default.QUEBRA_LINHA, null, null);
                this.avancar();
                this.linha++;
                break;
            case ' ':
            case '\0':
            case '\r':
            case '\t':
            case '':
                this.avancar();
                break;
            default:
                if (this.eDigito(caractere))
                    this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else {
                    this.erros.push({
                        linha: this.linha,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.',
                    });
                    this.avancar();
                }
                break;
        }
    }
    InjetaUmItemDentroDaLista(item, posicao) {
        let codigoComeco;
        let codigoPosPosição;
        for (let i in this.codigo) {
            if (Number(i) === posicao) {
                let iterador = Number(i);
                while (iterador <= this.codigo.length) {
                    codigoPosPosição.push(this.codigo[iterador]);
                    iterador += 1;
                }
                break;
            }
            codigoComeco.push(this.codigo[i]);
        }
        return [...codigoComeco, ...codigoPosPosição];
    }
    mapear(codigo, hashArquivo = -1) {
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 1;
        this.hashArquivo = hashArquivo;
        this.codigo = codigo.join('\n') || '';
        this.codigo += '\n';
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        return {
            simbolos: this.simbolos,
            erros: this.erros,
        };
    }
}
exports.LexadorBirl = LexadorBirl;
//# sourceMappingURL=lexador-birl.js.map