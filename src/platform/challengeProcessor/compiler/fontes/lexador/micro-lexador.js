"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroLexador = void 0;
const palavras_reservadas_1 = require("./palavras-reservadas");
const simbolo_1 = require("./simbolo");
const delegua_1 = __importDefault(require("../tipos-de-simbolos/microgramaticas/delegua"));
/**
 * O MicroLexador funciona apenas dentro de interpolações de texto.
 * Portanto, seus tipos de símbolos e palavras reservadas são
 * bastante reduzidos em relação ao lexador normal.
 */
class MicroLexador {
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
        return this.codigo.length <= this.atual;
    }
    adicionarSimbolo(tipo, literal = null) {
        const texto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.simbolos.push(new simbolo_1.Simbolo(tipo, literal || texto, literal, 1, -1));
    }
    analisarTexto(delimitador = '"') {
        while (this.codigo[this.atual] !== delimitador && !this.eFinalDoCodigo()) {
            this.atual++;
        }
        if (this.eFinalDoCodigo()) {
            this.erros.push({
                linha: 1,
                caractere: this.codigo[this.atual - 1],
                mensagem: 'Texto não finalizado.',
            });
            return;
        }
        const valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual);
        this.adicionarSimbolo(delegua_1.default.TEXTO, valor);
    }
    analisarNumero() {
        while (this.eDigito(this.codigo[this.atual])) {
            this.atual++;
        }
        if (this.codigo[this.atual] == '.' && this.eDigito(this.codigo[this.atual + 1])) {
            this.atual++;
            while (this.eDigito(this.codigo[this.atual])) {
                this.atual++;
            }
        }
        const numeroCompleto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(delegua_1.default.NUMERO, parseFloat(numeroCompleto));
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.codigo[this.atual])) {
            this.atual++;
        }
        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual);
        const tipo = codigo in palavras_reservadas_1.palavrasReservadasMicroGramatica ? palavras_reservadas_1.palavrasReservadasMicroGramatica[codigo] : delegua_1.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    }
    analisarToken() {
        const caractere = this.codigo[this.atual];
        switch (caractere) {
            case '(':
                this.adicionarSimbolo(delegua_1.default.PARENTESE_ESQUERDO);
                this.atual++;
                break;
            case ')':
                this.adicionarSimbolo(delegua_1.default.PARENTESE_DIREITO);
                this.atual++;
                break;
            case ',':
                this.adicionarSimbolo(delegua_1.default.VIRGULA);
                this.atual++;
                break;
            case '+':
                this.atual++;
                if (this.codigo[this.atual] === '+') {
                    this.adicionarSimbolo(delegua_1.default.INCREMENTAR);
                    this.atual++;
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.ADICAO);
                }
                break;
            case '-':
                this.atual++;
                if (this.codigo[this.atual] === '-') {
                    this.adicionarSimbolo(delegua_1.default.DECREMENTAR);
                    this.atual++;
                }
                else {
                    this.adicionarSimbolo(delegua_1.default.SUBTRACAO);
                }
                break;
            case '*':
                this.atual++;
                switch (this.codigo[this.atual]) {
                    case '*':
                        this.atual++;
                        this.adicionarSimbolo(delegua_1.default.EXPONENCIACAO);
                        break;
                    default:
                        this.adicionarSimbolo(delegua_1.default.MULTIPLICACAO);
                        break;
                }
                break;
            case '/':
                this.atual++;
                this.adicionarSimbolo(delegua_1.default.DIVISAO);
                break;
            case '%':
                this.atual++;
                this.adicionarSimbolo(delegua_1.default.MODULO);
                break;
            case '\\':
                this.atual++;
                this.adicionarSimbolo(delegua_1.default.DIVISAO_INTEIRA);
                break;
            case ' ':
            case '\0':
            case '\r':
            case '\t':
                this.atual++;
                break;
            case '"':
                this.atual++;
                this.analisarTexto('"');
                this.atual++;
                break;
            case "'":
                this.atual++;
                this.analisarTexto("'");
                this.atual++;
                break;
            default:
                if (this.eDigito(caractere))
                    this.analisarNumero();
                else if (this.eAlfabeto(caractere))
                    this.identificarPalavraChave();
                else {
                    this.erros.push({
                        linha: 1,
                        caractere: caractere,
                        mensagem: 'Caractere inesperado.',
                    });
                    this.atual++;
                }
        }
    }
    /**
     * Lê apenas uma linha de código e a transforma em símbolos.
     * @param codigo O código
     */
    mapear(codigo) {
        this.codigo = codigo;
        this.erros = [];
        this.simbolos = [];
        this.atual = 0;
        this.inicioSimbolo = 0;
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
exports.MicroLexador = MicroLexador;
//# sourceMappingURL=micro-lexador.js.map