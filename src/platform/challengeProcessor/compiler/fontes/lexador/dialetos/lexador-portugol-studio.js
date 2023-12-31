"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorPortugolStudio = void 0;
const lexador_base_1 = require("../lexador-base");
const portugol_studio_1 = require("./palavras-reservadas/portugol-studio");
const portugol_studio_2 = __importDefault(require("../../tipos-de-simbolos/portugol-studio"));
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * O Lexador de Portugol Studio possui algumas particularidades:
 * - Aspas simples são para caracteres individuais, e aspas duplas para cadeias de caracteres.
 * - Literais de vetores usam chaves, e não colchetes.
 */
class LexadorPortugolStudio extends lexador_base_1.LexadorBase {
    logicaComumCaracteres(delimitador) {
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Cadeia de caracteres não finalizada.',
            });
            return;
        }
        const valor = this.codigo[this.linha].substring(this.inicioSimbolo + 1, this.atual);
        return valor;
    }
    analisarCaracter() {
        const valor = this.logicaComumCaracteres("'");
        this.adicionarSimbolo(portugol_studio_2.default.CARACTER, valor);
    }
    analisarTexto() {
        const valor = this.logicaComumCaracteres('"');
        this.adicionarSimbolo(portugol_studio_2.default.CADEIA, valor);
    }
    analisarNumero() {
        let real = false;
        while (this.eDigito(this.simboloAtual())) {
            this.avancar();
        }
        if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
            real = true;
            this.avancar();
            while (this.eDigito(this.simboloAtual())) {
                this.avancar();
            }
        }
        const numeroCompleto = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(real ? portugol_studio_2.default.REAL : portugol_studio_2.default.INTEIRO, parseFloat(numeroCompleto));
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo[this.linha].substring(this.inicioSimbolo, this.atual);
        const tipo = codigo in portugol_studio_1.palavrasReservadas ? portugol_studio_1.palavrasReservadas[codigo] : portugol_studio_2.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case '[':
                this.adicionarSimbolo(portugol_studio_2.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(portugol_studio_2.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(portugol_studio_2.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(portugol_studio_2.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '{':
                this.adicionarSimbolo(portugol_studio_2.default.CHAVE_ESQUERDA);
                this.avancar();
                break;
            case '}':
                this.adicionarSimbolo(portugol_studio_2.default.CHAVE_DIREITA);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(portugol_studio_2.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(portugol_studio_2.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(portugol_studio_2.default.MENOS_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '-') {
                    this.adicionarSimbolo(portugol_studio_2.default.DECREMENTAR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(portugol_studio_2.default.SUBTRACAO);
                }
                break;
            case '+':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(portugol_studio_2.default.MAIS_IGUAL);
                    this.avancar();
                }
                else if (this.simboloAtual() === '+') {
                    this.adicionarSimbolo(portugol_studio_2.default.INCREMENTAR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(portugol_studio_2.default.ADICAO);
                }
                break;
            case '%':
                this.adicionarSimbolo(portugol_studio_2.default.MODULO);
                this.avancar();
                break;
            case '*':
                this.inicioSimbolo = this.atual;
                this.avancar();
                switch (this.simboloAtual()) {
                    case '=':
                        this.avancar();
                        this.adicionarSimbolo(portugol_studio_2.default.MULTIPLICACAO_IGUAL);
                        break;
                    default:
                        this.adicionarSimbolo(portugol_studio_2.default.MULTIPLICACAO);
                        break;
                }
                break;
            case '!':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(portugol_studio_2.default.DIFERENTE);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(portugol_studio_2.default.NEGACAO);
                }
                break;
            case '=':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(portugol_studio_2.default.IGUAL_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(portugol_studio_2.default.IGUAL);
                }
                break;
            /* case '&':
                this.adicionarSimbolo(tiposDeSimbolos.BIT_AND);
                this.avancar();
                break;

            case '~':
                this.adicionarSimbolo(tiposDeSimbolos.BIT_NOT);
                this.avancar();
                break;

            case '|':
                this.adicionarSimbolo(tiposDeSimbolos.BIT_OR);
                this.avancar();
                break;

            case '^':
                this.adicionarSimbolo(tiposDeSimbolos.BIT_XOR);
                this.avancar();
                break; */
            case '<':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(portugol_studio_2.default.MENOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(portugol_studio_2.default.MENOR);
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(portugol_studio_2.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(portugol_studio_2.default.MAIOR);
                }
                break;
            case '/':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '/':
                        this.avancarParaProximaLinha();
                        break;
                    case '*':
                        this.encontrarFimComentarioAsterisco();
                        break;
                    case '=':
                        this.adicionarSimbolo(portugol_studio_2.default.DIVISAO_IGUAL);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(portugol_studio_2.default.DIVISAO);
                        break;
                }
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
            case '"':
                this.avancar();
                this.analisarTexto();
                this.avancar();
                break;
            case "'":
                this.avancar();
                this.analisarCaracter();
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
exports.LexadorPortugolStudio = LexadorPortugolStudio;
//# sourceMappingURL=lexador-portugol-studio.js.map