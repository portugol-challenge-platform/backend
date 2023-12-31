"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorPitugues = void 0;
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const pitugues_1 = __importDefault(require("../../tipos-de-simbolos/pitugues"));
const simbolo_1 = require("../simbolo");
const palavras_reservadas_1 = require("../palavras-reservadas");
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * Este lexador é diferente dos demais, porque também produz uma estrutura de dados de pragmas, que explica,
 * por exemplo quantos espaços há na frente de cada linha. Assim como a linguagem Python, os blocos de
 * escopo são definidos pelo número de espaços à frente do código.
 */
class LexadorPitugues {
    constructor(performance = false) {
        this.performance = performance;
        this.simbolos = [];
        this.erros = [];
        this.pragmas = {};
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
    /**
     * Indica se o código está na última linha.
     * @returns Verdadeiro se contador de linhas está na última linha.
     *          Falso caso contrário.
     */
    eUltimaLinha() {
        return this.linha >= this.codigo.length - 1;
    }
    eFinalDaLinha() {
        return this.atual >= this.codigo[this.linha].length;
    }
    eFinalDoCodigo() {
        if (this.linha > this.codigo.length - 1)
            return true;
        return this.linha == this.codigo.length - 1 && this.codigo[this.codigo.length - 1].length <= this.atual;
    }
    avancar() {
        this.atual += 1;
        if (this.eFinalDaLinha() && !this.eUltimaLinha()) {
            this.linha++;
            this.atual = 0;
            // this.logicaEmLinhaIniciada = false;
            this.analisarIndentacao();
        }
    }
    adicionarSimbolo(tipo, literal = null) {
        const texto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, texto, literal, this.linha + 1, this.hashArquivo));
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
    analisarTexto(delimitador = '"') {
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
        this.simbolos.push(new simbolo_1.Simbolo(pitugues_1.default.TEXTO, textoCompleto, textoCompleto, linhaPrimeiroCaracter + 1, this.hashArquivo));
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
        this.simbolos.push(new simbolo_1.Simbolo(pitugues_1.default.NUMERO, numeroCompleto, parseFloat(numeroCompleto), linhaPrimeiroDigito + 1, this.hashArquivo));
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
        const tipo = textoPalavraChave in palavras_reservadas_1.palavrasReservadas
            ? palavras_reservadas_1.palavrasReservadas[textoPalavraChave]
            : pitugues_1.default.IDENTIFICADOR;
        this.simbolos.push(new simbolo_1.Simbolo(tipo, textoPalavraChave, null, linhaPrimeiroCaracter + 1, this.hashArquivo));
    }
    analisarIndentacao() {
        let espacos = 0;
        while (['\t', ' '].includes(this.simboloAtual()) && !this.eFinalDoCodigo()) {
            espacos++;
            this.avancar();
        }
        this.pragmas[this.linha + 1] = {
            linha: this.linha + 1,
            espacosIndentacao: espacos,
        };
    }
    avancarParaProximaLinha() {
        this.linha++;
        this.atual = 0;
        this.analisarIndentacao();
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case ' ':
            case '\t':
                this.avancar();
                break;
            case '\r':
            case '\n':
            case '\0':
            case ';':
                this.avancar();
                break;
            case '=':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(pitugues_1.default.IGUAL_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.IGUAL);
                }
                break;
            case '#':
                this.avancarParaProximaLinha();
                break;
            case '[':
                this.adicionarSimbolo(pitugues_1.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(pitugues_1.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(pitugues_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(pitugues_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '{':
                this.adicionarSimbolo(pitugues_1.default.CHAVE_ESQUERDA);
                this.avancar();
                break;
            case '}':
                this.adicionarSimbolo(pitugues_1.default.CHAVE_DIREITA);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(pitugues_1.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(pitugues_1.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(pitugues_1.default.MENOS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.SUBTRACAO);
                }
                break;
            case '+':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(pitugues_1.default.MAIS_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.ADICAO);
                }
                break;
            case '/':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '/':
                        this.adicionarSimbolo(pitugues_1.default.DIVISAO_INTEIRA);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(pitugues_1.default.DIVISAO);
                        break;
                }
                break;
            case ':':
                this.adicionarSimbolo(pitugues_1.default.DOIS_PONTOS);
                this.avancar();
                break;
            case '%':
                this.adicionarSimbolo(pitugues_1.default.MODULO);
                this.avancar();
                break;
            case '*':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '*') {
                    this.avancar();
                    this.adicionarSimbolo(pitugues_1.default.EXPONENCIACAO);
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.MULTIPLICACAO);
                }
                break;
            case '!':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(pitugues_1.default.DIFERENTE);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.NEGACAO);
                }
            case '&':
                this.adicionarSimbolo(pitugues_1.default.BIT_AND);
                this.avancar();
                break;
            case '~':
                this.adicionarSimbolo(pitugues_1.default.BIT_NOT);
                this.avancar();
                break;
            case '|':
                this.adicionarSimbolo(pitugues_1.default.BIT_OR);
                this.avancar();
                break;
            case '^':
                this.adicionarSimbolo(pitugues_1.default.BIT_XOR);
                this.avancar();
                break;
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(pitugues_1.default.MENOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '<') {
                    this.adicionarSimbolo(pitugues_1.default.MENOR_MENOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(pitugues_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '>') {
                    this.adicionarSimbolo(pitugues_1.default.MAIOR_MAIOR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(pitugues_1.default.MAIOR);
                }
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
        const inicioMapeamento = (0, browser_process_hrtime_1.default)();
        this.simbolos = [];
        this.erros = [];
        this.pragmas = {};
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 0;
        this.codigo = codigo || [''];
        this.hashArquivo = hashArquivo;
        // Análise de indentação da primeira linha.
        this.analisarIndentacao();
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        if (this.performance) {
            const deltaMapeamento = (0, browser_process_hrtime_1.default)(inicioMapeamento);
            console.log(`[Lexador] Tempo para mapeamento: ${deltaMapeamento[0] * 1e9 + deltaMapeamento[1]}ns`);
        }
        return {
            simbolos: this.simbolos,
            erros: this.erros,
            pragmas: this.pragmas,
        };
    }
}
exports.LexadorPitugues = LexadorPitugues;
//# sourceMappingURL=lexador-pitugues.js.map