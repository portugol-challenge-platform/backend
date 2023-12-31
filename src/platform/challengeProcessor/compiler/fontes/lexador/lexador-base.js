"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorBase = void 0;
const simbolo_1 = require("./simbolo");
/**
 * Essa versão do Lexador Base é por padrão com comentários multilinha.
 * Em outras palavras, se o dialeto da linguagem terá comentários multilinha,
 * este Lexador Base deverá ser usado.
 */
class LexadorBase {
    constructor() {
        this.simbolos = [];
        this.erros = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
    }
    avancarParaProximaLinha() {
        this.linha++;
        this.atual = 0;
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
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha() {
        return this.linha >= this.codigo.length - 1;
    }
    eFinalDoCodigo() {
        return this.eUltimaLinha() && this.codigo[this.codigo.length - 1].length <= this.atual;
    }
    eFinalDaLinha() {
        if (this.codigo.length === this.linha) {
            return true;
        }
        return this.atual >= this.codigo[this.linha].length;
    }
    encontrarFimComentarioAsterisco() {
        while (!this.eFinalDoCodigo()) {
            this.avancar();
            if (this.simboloAtual() === '*' && this.proximoSimbolo() === '/') {
                this.avancar();
                this.avancar();
                break;
            }
        }
    }
    avancar() {
        this.atual += 1;
        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
        }
    }
    adicionarSimbolo(tipo, literal) {
        const texto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, literal || texto, literal, this.linha + 1, this.hashArquivo));
    }
    simboloAtual() {
        if (this.eFinalDoCodigo())
            return '\0';
        return this.codigo[this.linha].charAt(this.atual);
    }
    proximoSimbolo() {
        if (this.atual + 1 >= this.codigo[this.linha].length)
            return '\0';
        return this.codigo[this.linha].charAt(this.atual + 1);
    }
    simboloAnterior() {
        return this.codigo[this.linha].charAt(this.atual - 1);
    }
}
exports.LexadorBase = LexadorBase;
//# sourceMappingURL=lexador-base.js.map