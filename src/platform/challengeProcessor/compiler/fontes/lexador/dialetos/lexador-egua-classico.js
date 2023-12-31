"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorEguaClassico = void 0;
const simbolo_1 = require("../simbolo");
const egua_classico_1 = require("./palavras-reservadas/egua-classico");
const egua_classico_2 = __importDefault(require("../../tipos-de-simbolos/egua-classico"));
/**
 * O Lexador é responsável por transformar o código em uma coleção de tokens de linguagem.
 * Cada token de linguagem é representado por um tipo, um lexema e informações da linha de código em que foi expresso.
 * Também é responsável por mapear as palavras reservadas da linguagem, que não podem ser usadas por outras
 * estruturas, tais como nomes de variáveis, funções, literais, classes e assim por diante.
 *
 * Este Lexador implementa o mesmo mecanismo de lexação da linguagem Égua.
 * https://github.com/eguatech/egua/blob/master/src/lexer.js
 */
class LexadorEguaClassico {
    constructor(codigo) {
        this.codigo = codigo;
        this.simbolos = [];
        this.erros = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 1;
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
    avancar() {
        this.atual += 1;
        return this.codigo[this.atual - 1];
    }
    adicionarSimbolo(tipo, literal = null) {
        const texto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, texto, literal, this.linha, -1));
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
    analisarTexto(texto = '"') {
        while (this.simboloAtual() !== texto && !this.eFinalDoCodigo()) {
            if (this.simboloAtual() === '\n')
                this.linha = +1;
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha,
                caractere: this.simboloAnterior(),
                mensagem: 'Texto não finalizado.',
            });
            return;
        }
        this.avancar();
        const valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual - 1);
        this.adicionarSimbolo(egua_classico_2.default.TEXTO, valor);
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
        this.adicionarSimbolo(egua_classico_2.default.NUMERO, parseFloat(numeroCompleto));
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual);
        const tipo = codigo in egua_classico_1.palavrasReservadas ? egua_classico_1.palavrasReservadas[codigo] : egua_classico_2.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    }
    analisarToken() {
        const caractere = this.avancar();
        switch (caractere) {
            case '[':
                this.adicionarSimbolo(egua_classico_2.default.COLCHETE_ESQUERDO);
                break;
            case ']':
                this.adicionarSimbolo(egua_classico_2.default.COLCHETE_DIREITO);
                break;
            case '(':
                this.adicionarSimbolo(egua_classico_2.default.PARENTESE_ESQUERDO);
                break;
            case ')':
                this.adicionarSimbolo(egua_classico_2.default.PARENTESE_DIREITO);
                break;
            case '{':
                this.adicionarSimbolo(egua_classico_2.default.CHAVE_ESQUERDA);
                break;
            case '}':
                this.adicionarSimbolo(egua_classico_2.default.CHAVE_DIREITA);
                break;
            case ',':
                this.adicionarSimbolo(egua_classico_2.default.VIRGULA);
                break;
            case '.':
                this.adicionarSimbolo(egua_classico_2.default.PONTO);
                break;
            case '-':
                this.adicionarSimbolo(egua_classico_2.default.SUBTRACAO);
                break;
            case '+':
                this.adicionarSimbolo(egua_classico_2.default.ADICAO);
                break;
            case ':':
                this.adicionarSimbolo(egua_classico_2.default.DOIS_PONTOS);
                break;
            case ';':
                this.adicionarSimbolo(egua_classico_2.default.PONTO_E_VIRGULA);
                break;
            case '%':
                this.adicionarSimbolo(egua_classico_2.default.MODULO);
                break;
            case '*':
                if (this.simboloAtual() === '*') {
                    this.avancar();
                    this.adicionarSimbolo(egua_classico_2.default.EXPONENCIACAO);
                    break;
                }
                this.adicionarSimbolo(egua_classico_2.default.MULTIPLICACAO);
                break;
            case '!':
                this.adicionarSimbolo(this.proximoIgualA('=') ? egua_classico_2.default.DIFERENTE : egua_classico_2.default.NEGACAO);
                break;
            case '=':
                this.adicionarSimbolo(this.proximoIgualA('=') ? egua_classico_2.default.IGUAL_IGUAL : egua_classico_2.default.IGUAL);
                break;
            case '&':
                this.adicionarSimbolo(egua_classico_2.default.BIT_AND);
                break;
            case '~':
                this.adicionarSimbolo(egua_classico_2.default.BIT_NOT);
                break;
            case '|':
                this.adicionarSimbolo(egua_classico_2.default.BIT_OR);
                break;
            case '^':
                this.adicionarSimbolo(egua_classico_2.default.BIT_XOR);
                break;
            case '<':
                if (this.proximoIgualA('=')) {
                    this.adicionarSimbolo(egua_classico_2.default.MENOR_IGUAL);
                }
                else if (this.proximoIgualA('<')) {
                    this.adicionarSimbolo(egua_classico_2.default.MENOR_MENOR);
                }
                else {
                    this.adicionarSimbolo(egua_classico_2.default.MENOR);
                }
                break;
            case '>':
                if (this.proximoIgualA('=')) {
                    this.adicionarSimbolo(egua_classico_2.default.MAIOR_IGUAL);
                }
                else if (this.proximoIgualA('>')) {
                    this.adicionarSimbolo(egua_classico_2.default.MAIOR_MAIOR);
                }
                else {
                    this.adicionarSimbolo(egua_classico_2.default.MAIOR);
                }
                break;
            case '/':
                if (this.proximoIgualA('/')) {
                    while (this.simboloAtual() != '\n' && !this.eFinalDoCodigo())
                        this.avancar();
                }
                else {
                    this.adicionarSimbolo(egua_classico_2.default.DIVISAO);
                }
                break;
            // Esta sessão ignora espaços em branco na tokenização
            case ' ':
            case '\0':
            case '\r':
            case '\t':
                break;
            // tentativa de pulhar linha com \n que ainda não funciona
            case '\n':
                this.linha += 1;
                break;
            case '"':
                this.analisarTexto('"');
                break;
            case "'":
                this.analisarTexto("'");
                break;
            default:
                if (this.eDigito(caractere))
                    this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else
                    this.erros.push({
                        linha: this.linha,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.',
                    });
        }
    }
    mapear(codigo) {
        this.erros = [];
        this.simbolos = [];
        this.inicioSimbolo = 0;
        this.atual = 0;
        this.linha = 1;
        // Por enquanto, o Lexador de Égua Clássico vai ter uma linha só.
        this.codigo = codigo.join('\n') || '';
        while (!this.eFinalDoCodigo()) {
            this.inicioSimbolo = this.atual;
            this.analisarToken();
        }
        this.simbolos.push(new simbolo_1.Simbolo(egua_classico_2.default.EOF, '', null, this.linha, -1));
        return {
            simbolos: this.simbolos,
            erros: this.erros,
        };
    }
}
exports.LexadorEguaClassico = LexadorEguaClassico;
//# sourceMappingURL=lexador-egua-classico.js.map