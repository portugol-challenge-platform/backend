"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorGuarani = void 0;
const lexador_base_1 = require("../lexador-base");
const guarani_1 = __importDefault(require("../../tipos-de-simbolos/guarani"));
const guarani_2 = require("./palavras-reservadas/guarani");
class LexadorGuarani extends lexador_base_1.LexadorBase {
    analisarTexto(delimitador) {
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: "Texto noñemohu'ãiva.",
            });
            return;
        }
        const valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(guarani_1.default.TEXTO, valor);
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
        const numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(guarani_1.default.NUMERO, parseFloat(numeroCompleto));
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual).toLowerCase();
        const tipo = codigo in guarani_2.palavrasReservadas ? guarani_2.palavrasReservadas[codigo] : guarani_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case '(':
                this.adicionarSimbolo(guarani_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(guarani_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
                this.avancar();
                break;
            case "'":
                this.avancar();
                this.analisarTexto("'");
                this.avancar();
                break;
            // Esta sessão ignora espaços em branco na tokenização.
            // Ponto-e-vírgula é opcional em Delégua, então pode apenas ser ignorado.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
            case ';':
                this.avancar();
                break;
            default:
                if (this.eDigito(caractere))
                    this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else {
                    this.erros.push({
                        linha: this.linha + 1,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.',
                    });
                    this.avancar();
                }
        }
    }
    mapear(codigo, hashArquivo) {
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        this.hashArquivo = hashArquivo;
        for (let iterador = 0; iterador < this.codigo.length; iterador++) {
            this.codigo[iterador] += '\0';
        }
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
exports.LexadorGuarani = LexadorGuarani;
//# sourceMappingURL=lexador-guarani.js.map