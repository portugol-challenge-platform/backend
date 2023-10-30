"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorMapler = void 0;
const lexador_base_linha_unica_1 = require("../lexador-base-linha-unica");
const mapler_1 = __importDefault(require("../../tipos-de-simbolos/mapler"));
const mapler_2 = require("./palavras-reservadas/mapler");
class LexadorMapler extends lexador_base_linha_unica_1.LexadorBaseLinhaUnica {
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
        this.adicionarSimbolo(mapler_1.default.NUMERO, parseFloat(numeroCompleto));
    }
    analisarTexto(delimitador) {
        while (this.simboloAtual() !== delimitador && !this.eFinalDoCodigo()) {
            this.avancar();
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: this.linha + 1,
                caractere: this.simboloAnterior(),
                mensagem: 'Caractere não finalizado.',
            });
            return;
        }
        const valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(mapler_1.default.CARACTERE, valor);
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual).toLowerCase();
        if (codigo in mapler_2.palavrasReservadas) {
            this.adicionarSimbolo(mapler_2.palavrasReservadas[codigo], codigo);
        }
        else {
            this.adicionarSimbolo(mapler_1.default.IDENTIFICADOR, codigo);
        }
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case '(':
                this.adicionarSimbolo(mapler_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(mapler_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '[':
                this.adicionarSimbolo(mapler_1.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(mapler_1.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case ':':
                this.adicionarSimbolo(mapler_1.default.DOIS_PONTOS);
                this.avancar();
                break;
            case '<':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '-':
                        this.adicionarSimbolo(mapler_1.default.SETA_ATRIBUICAO);
                        this.avancar();
                        break;
                    case '=':
                        this.adicionarSimbolo(mapler_1.default.MENOR_IGUAL);
                        this.avancar();
                        break;
                    case '>':
                        this.adicionarSimbolo(mapler_1.default.DIFERENTE);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(mapler_1.default.MENOR);
                        break;
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(mapler_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(mapler_1.default.MAIOR);
                }
                break;
            case '=':
                this.adicionarSimbolo(mapler_1.default.IGUAL);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(mapler_1.default.VIRGULA);
                this.avancar();
                break;
            case ';':
                this.adicionarSimbolo(mapler_1.default.PONTO_VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(mapler_1.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.adicionarSimbolo(mapler_1.default.SUBTRACAO);
                this.avancar();
                break;
            case '+':
                this.adicionarSimbolo(mapler_1.default.ADICAO);
                this.avancar();
                break;
            // case '%':
            //     this.adicionarSimbolo(tiposDeSimbolos.MODULO);
            //     this.avancar();
            //     break;
            case '*':
                this.adicionarSimbolo(mapler_1.default.MULTIPLICACAO);
                this.avancar();
                break;
            case '/':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '/':
                        while (this.simboloAtual() != '\n' && !this.eFinalDoCodigo())
                            this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(mapler_1.default.DIVISAO);
                        break;
                }
                break;
            // Esta sessão ignora espaços em branco na tokenização.
            // Ponto-e-vírgula é opcional em Delégua, então pode apenas ser ignorado.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
                this.avancar();
                break;
            case '\n':
                // this.adicionarSimbolo(tiposDeSimbolos.QUEBRA_LINHA);
                this.linha++;
                this.avancar();
                break;
            // case '"':
            //     this.avancar();
            //     this.analisarTexto('"');
            //     this.avancar();
            //     break;
            case '"':
                this.avancar();
                this.analisarTexto('"');
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
        this.codigo = codigo.join('\n') || '';
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
exports.LexadorMapler = LexadorMapler;
//# sourceMappingURL=lexador-mapler.js.map