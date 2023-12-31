"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorBaseLinhaUnica = void 0;
const simbolo_1 = require("./simbolo");
class LexadorBaseLinhaUnica {
    constructor() {
        this.simbolos = [];
        this.erros = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
    }
    eDigito(caractere) {
        return caractere >= '0' && caractere <= '9';
    }
    eAlfabeto(caractere) {
        const acentuacoes = [
            'á',
            'Á',
            'ã',
            'Ã',
            'â',
            'Â',
            'à',
            'À',
            'é',
            'É',
            'ê',
            'Ê',
            'í',
            'Í',
            'ó',
            'Ó',
            'õ',
            'Õ',
            'ô',
            'Ô',
            'ú',
            'Ú',
            'ç',
            'Ç',
            '_',
        ];
        return ((caractere >= 'a' && caractere <= 'z') ||
            (caractere >= 'A' && caractere <= 'Z') ||
            acentuacoes.includes(caractere));
    }
    eAlfabetoOuDigito(caractere) {
        return this.eDigito(caractere) || this.eAlfabeto(caractere);
    }
    eFinalDoCodigo() {
        return this.atual >= this.codigo.length;
    }
    eFinalDaLinha() {
        if (this.codigo.length === this.linha) {
            return true;
        }
        return this.atual >= this.codigo[this.linha].length;
    }
    avancar() {
        this.atual += 1;
        return this.codigo[this.atual - 1];
    }
    adicionarSimbolo(tipo, literal) {
        const texto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, literal || texto, literal, this.linha + 1, this.hashArquivo));
    }
    simboloAtual() {
        if (this.eFinalDoCodigo())
            return '\0';
        return this.codigo.charAt(this.atual);
    }
    proximoSimbolo() {
        if (this.atual + 1 >= this.codigo.length)
            return '\0';
        return this.codigo.charAt(this.atual + 1);
    }
    simboloAnterior() {
        return this.codigo.charAt(this.atual - 1);
    }
}
exports.LexadorBaseLinhaUnica = LexadorBaseLinhaUnica;
//# sourceMappingURL=lexador-base-linha-unica.js.map