"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorPortugolIpt = void 0;
const simbolo_1 = require("../simbolo");
const portugol_ipt_1 = require("./palavras-reservadas/portugol-ipt");
const portugol_ipt_2 = __importDefault(require("../../tipos-de-simbolos/portugol-ipt"));
class LexadorPortugolIpt {
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
        if (this.linha > this.codigo.length - 1)
            return true;
        return this.linha == this.codigo.length - 1 && this.codigo[this.codigo.length - 1].length <= this.atual;
    }
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha() {
        return this.linha >= this.codigo.length - 1;
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
    eFinalDaLinha() {
        return this.atual >= this.codigo[this.linha].length;
    }
    simboloAtual() {
        if (this.eFinalDaLinha())
            return '\0';
        if (this.linha > this.codigo.length - 1)
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
    analisarTexto(delimitador) {
        const linhaPrimeiroCaracter = this.linha;
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Texto não finalizado.',
            });
            return;
        }
        const textoCompleto = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(portugol_ipt_2.default.TEXTO, textoCompleto, textoCompleto, linhaPrimeiroCaracter + 1, this.hashArquivo));
    }
    analisarNumero() {
        const linhaPrimeiroDigito = this.linha;
        while (this.eDigito(this.simboloAtual()) && this.linha === linhaPrimeiroDigito) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        let numeroCompleto;
        if (linhaPrimeiroDigito < this.linha) {
            const linhaNumero = this.codigo[linhaPrimeiroDigito];
            numeroCompleto = linhaNumero.substring(this.inicioSimbolo, linhaNumero.length);
        }
        else {
            numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        }
        this.simbolos.push(new simbolo_1.Simbolo(portugol_ipt_2.default.INTEIRO, numeroCompleto, parseFloat(numeroCompleto), linhaPrimeiroDigito + 1, this.hashArquivo));
    }
    identificarPalavraChave() {
        const linhaPrimeiroCaracter = this.linha;
        while (this.eAlfabetoOuDigito(this.simboloAtual()) && this.linha === linhaPrimeiroCaracter) {
            this.avancar();
        }
        let textoPalavraChave;
        if (linhaPrimeiroCaracter < this.linha) {
            const linhaPalavraChave = this.codigo[linhaPrimeiroCaracter];
            textoPalavraChave = linhaPalavraChave.substring(this.inicioSimbolo, linhaPalavraChave.length);
        }
        else {
            textoPalavraChave = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        }
        const tipo = textoPalavraChave in portugol_ipt_1.palavrasReservadas
            ? portugol_ipt_1.palavrasReservadas[textoPalavraChave]
            : portugol_ipt_2.default.IDENTIFICADOR;
        this.simbolos.push(new simbolo_1.Simbolo(tipo, textoPalavraChave, null, linhaPrimeiroCaracter + 1, this.hashArquivo));
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case ';':
                // TODO: Ponto-e-vírgula não é exatamente tolerado em Portugol IPT.
                this.avancar();
                break;
            case ' ':
            case '\t':
            case '\0':
                this.avancar();
                break;
            case '\r':
            case '\n':
                this.adicionarSimbolo(portugol_ipt_2.default.QUEBRA_LINHA);
                this.avancar();
                break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
                this.avancar();
                break;
            case '<':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '-':
                        this.adicionarSimbolo(portugol_ipt_2.default.SETA_ATRIBUICAO);
                        this.avancar();
                        break;
                    case '=':
                        this.adicionarSimbolo(portugol_ipt_2.default.MENOR_IGUAL);
                        this.avancar();
                        break;
                    /* case '>':
                        this.adicionarSimbolo(tiposDeSimbolos.DIFERENTE);
                        this.avancar();
                        break; */
                    default:
                        this.adicionarSimbolo(portugol_ipt_2.default.MENOR);
                        break;
                }
                break;
            case '>':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '=':
                        this.adicionarSimbolo(portugol_ipt_2.default.MAIOR_IGUAL);
                        this.avancar();
                        break;
                    /* case '>':
                        this.adicionarSimbolo(tiposDeSimbolos.DIFERENTE);
                        this.avancar();
                        break; */
                    default:
                        this.adicionarSimbolo(portugol_ipt_2.default.MAIOR);
                        break;
                }
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
        this.simbolos = [];
        this.erros = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        this.hashArquivo = hashArquivo;
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
exports.LexadorPortugolIpt = LexadorPortugolIpt;
//# sourceMappingURL=lexador-portugol-ipt.js.map