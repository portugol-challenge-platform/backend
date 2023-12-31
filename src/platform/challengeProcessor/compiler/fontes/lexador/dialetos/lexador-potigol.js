"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorPotigol = void 0;
const lexador_base_linha_unica_1 = require("../lexador-base-linha-unica");
const potigol_1 = require("./palavras-reservadas/potigol");
const potigol_2 = __importDefault(require("../../tipos-de-simbolos/potigol"));
/**
 * Lexador para o dialeto Potigol.
 * Este dialeto é sensível a tamanho de caixa. `Inteiro` é aceito. `inteiro` não.
 */
class LexadorPotigol extends lexador_base_linha_unica_1.LexadorBaseLinhaUnica {
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
        const valor = this.codigo.substring(this.inicioSimbolo + 1, this.atual);
        return valor;
    }
    analisarCaracter() {
        const valor = this.logicaComumCaracteres("'");
        this.adicionarSimbolo(potigol_2.default.CARACTERE, valor);
    }
    analisarTexto() {
        const valor = this.logicaComumCaracteres('"');
        this.adicionarSimbolo(potigol_2.default.TEXTO, valor);
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
        const numeroCompleto = this.codigo.substring(this.inicioSimbolo, this.atual);
        this.adicionarSimbolo(real ? potigol_2.default.REAL : potigol_2.default.INTEIRO, parseFloat(numeroCompleto));
    }
    avancarParaProximaLinha() {
        while (this.codigo[this.atual] !== '\n') {
            this.atual++;
        }
    }
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual);
        const tipo = codigo in potigol_1.palavrasReservadas ? potigol_1.palavrasReservadas[codigo] : potigol_2.default.IDENTIFICADOR;
        this.adicionarSimbolo(tipo);
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case '[':
                this.adicionarSimbolo(potigol_2.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(potigol_2.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case '(':
                this.adicionarSimbolo(potigol_2.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(potigol_2.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            // Até então encontradas apenas em interpolações de texto.
            // Por ora não necessárias.
            /* case '{':
                this.adicionarSimbolo(tiposDeSimbolos.CHAVE_ESQUERDA);
                this.avancar();
                break;
            case '}':
                this.adicionarSimbolo(tiposDeSimbolos.CHAVE_DIREITA);
                this.avancar();
                break; */
            case ':':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(potigol_2.default.REATRIBUIR);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(potigol_2.default.DOIS_PONTOS);
                }
                break;
            case ',':
                this.adicionarSimbolo(potigol_2.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(potigol_2.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.inicioSimbolo = this.atual;
                this.avancar();
                this.adicionarSimbolo(potigol_2.default.SUBTRACAO);
                /* if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tiposDeSimbolos.MENOS_IGUAL);
                    this.avancar();
                } else if (this.simboloAtual() === '-') {
                    this.adicionarSimbolo(tiposDeSimbolos.DECREMENTAR);
                    this.avancar();
                } else {
                    this.adicionarSimbolo(tiposDeSimbolos.SUBTRACAO);
                } */
                break;
            case '+':
                this.inicioSimbolo = this.atual;
                this.avancar();
                this.adicionarSimbolo(potigol_2.default.ADICAO);
                /* if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(tiposDeSimbolos.MAIS_IGUAL);
                    this.avancar();
                } else if (this.simboloAtual() === '+') {
                    this.adicionarSimbolo(tiposDeSimbolos.INCREMENTAR);
                    this.avancar();
                } else {
                    this.adicionarSimbolo(tiposDeSimbolos.ADICAO);
                } */
                break;
            case '*':
                this.inicioSimbolo = this.atual;
                this.avancar();
                this.adicionarSimbolo(potigol_2.default.MULTIPLICACAO);
                break;
            case '^':
                this.inicioSimbolo = this.atual;
                this.avancar();
                this.adicionarSimbolo(potigol_2.default.EXPONENCIACAO);
                break;
            case '=':
                this.inicioSimbolo = this.atual;
                this.avancar();
                switch (this.simboloAtual()) {
                    case '=':
                        this.adicionarSimbolo(potigol_2.default.IGUAL_IGUAL);
                        this.avancar();
                        break;
                    case '>':
                        this.adicionarSimbolo(potigol_2.default.SETA);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(potigol_2.default.IGUAL);
                        break;
                }
                break;
            case '#':
                this.avancarParaProximaLinha();
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
             */
            case '<':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '=':
                        this.adicionarSimbolo(potigol_2.default.MENOR_IGUAL);
                        this.avancar();
                        break;
                    case '>':
                        this.adicionarSimbolo(potigol_2.default.DIFERENTE);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(potigol_2.default.MENOR);
                        break;
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(potigol_2.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(potigol_2.default.MAIOR);
                }
                break;
            case '/':
                this.inicioSimbolo = this.atual;
                this.avancar();
                this.adicionarSimbolo(potigol_2.default.DIVISAO);
                /* switch (this.simboloAtual()) {
                    case '/':
                        this.avancarParaProximaLinha();
                        break;
                    case '*':
                        this.encontrarFimComentarioAsterisco();
                        break;
                    case '=':
                        this.adicionarSimbolo(tiposDeSimbolos.DIVISAO_IGUAL);
                        this.avancar();s
                        break;
                    default:
                        
                        break;
                } */
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
            case '\n':
                this.linha++;
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
            case '_':
                this.inicioSimbolo = this.atual;
                this.avancar();
                this.adicionarSimbolo(potigol_2.default.TRACO_BAIXO);
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
exports.LexadorPotigol = LexadorPotigol;
//# sourceMappingURL=lexador-potigol.js.map