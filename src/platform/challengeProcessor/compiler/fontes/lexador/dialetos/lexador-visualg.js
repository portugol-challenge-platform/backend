"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorVisuAlg = void 0;
const lexador_base_linha_unica_1 = require("../lexador-base-linha-unica");
const visualg_1 = __importDefault(require("../../tipos-de-simbolos/visualg"));
const visualg_2 = require("./palavras-reservadas/visualg");
const dicionarioBibliotecaGlobal = {
    int: 'inteiro',
};
/**
 * O Lexador do VisuAlg é de linha única porque não possui comentários
 * multilinha na especificação.
 */
class LexadorVisuAlg extends lexador_base_linha_unica_1.LexadorBaseLinhaUnica {
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
        this.adicionarSimbolo(visualg_1.default.NUMERO, parseFloat(numeroCompleto));
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
        this.adicionarSimbolo(visualg_1.default.CARACTERE, valor);
    }
    /**
     * Identificação de palavra-chave.
     * Palavras-chaves em VisuAlg não são sensíveis a tamanho de caixa
     * (caracteres maiúsculos e minúsculos são equivalentes).
     */
    identificarPalavraChave() {
        while (this.eAlfabetoOuDigito(this.simboloAtual())) {
            this.avancar();
        }
        const codigo = this.codigo.substring(this.inicioSimbolo, this.atual).toLowerCase();
        if (codigo in visualg_2.palavrasReservadas) {
            this.adicionarSimbolo(visualg_2.palavrasReservadas[codigo], dicionarioBibliotecaGlobal.hasOwnProperty(codigo) ? dicionarioBibliotecaGlobal[codigo] : codigo);
        }
        else {
            this.adicionarSimbolo(visualg_1.default.IDENTIFICADOR, codigo);
        }
    }
    analisarToken() {
        const caractere = this.simboloAtual();
        switch (caractere) {
            case '(':
                this.adicionarSimbolo(visualg_1.default.PARENTESE_ESQUERDO);
                this.avancar();
                break;
            case ')':
                this.adicionarSimbolo(visualg_1.default.PARENTESE_DIREITO);
                this.avancar();
                break;
            case '[':
                this.adicionarSimbolo(visualg_1.default.COLCHETE_ESQUERDO);
                this.avancar();
                break;
            case ']':
                this.adicionarSimbolo(visualg_1.default.COLCHETE_DIREITO);
                this.avancar();
                break;
            case ':':
                this.inicioSimbolo = this.atual;
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(visualg_1.default.SETA_ATRIBUICAO);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(visualg_1.default.DOIS_PONTOS);
                }
                break;
            case '<':
                this.avancar();
                switch (this.simboloAtual()) {
                    case '-':
                        this.adicionarSimbolo(visualg_1.default.SETA_ATRIBUICAO);
                        this.avancar();
                        break;
                    case '=':
                        this.adicionarSimbolo(visualg_1.default.MENOR_IGUAL);
                        this.avancar();
                        break;
                    case '>':
                        this.adicionarSimbolo(visualg_1.default.DIFERENTE);
                        this.avancar();
                        break;
                    default:
                        this.adicionarSimbolo(visualg_1.default.MENOR);
                        break;
                }
                break;
            case '>':
                this.avancar();
                if (this.simboloAtual() === '=') {
                    this.adicionarSimbolo(visualg_1.default.MAIOR_IGUAL);
                    this.avancar();
                }
                else {
                    this.adicionarSimbolo(visualg_1.default.MAIOR);
                }
                break;
            case '=':
                this.adicionarSimbolo(visualg_1.default.IGUAL);
                this.avancar();
                break;
            case ',':
                this.adicionarSimbolo(visualg_1.default.VIRGULA);
                this.avancar();
                break;
            case '.':
                this.adicionarSimbolo(visualg_1.default.PONTO);
                this.avancar();
                break;
            case '-':
                this.adicionarSimbolo(visualg_1.default.SUBTRACAO);
                this.avancar();
                break;
            case '+':
                this.adicionarSimbolo(visualg_1.default.ADICAO);
                this.avancar();
                break;
            case '%':
                this.adicionarSimbolo(visualg_1.default.MODULO);
                this.avancar();
                break;
            case '*':
                this.adicionarSimbolo(visualg_1.default.MULTIPLICACAO);
                this.avancar();
                break;
            case '^':
                this.adicionarSimbolo(visualg_1.default.EXPONENCIACAO);
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
                        this.adicionarSimbolo(visualg_1.default.DIVISAO);
                        break;
                }
                break;
            case '\\':
                this.adicionarSimbolo(visualg_1.default.DIVISAO_INTEIRA);
                this.avancar();
                break;
            // Esta sessão ignora espaços em branco na tokenização.
            // Ponto-e-vírgula é opcional em VisuAlg, então pode apenas ser ignorado.
            case ' ':
            case '\0':
            case '\r':
            case '\t':
            case ';':
                this.avancar();
                break;
            case '\n':
                this.adicionarSimbolo(visualg_1.default.QUEBRA_LINHA);
                this.linha++;
                this.avancar();
                break;
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
        // Em VisuAlg, quebras de linha são relevantes na avaliação sintática.
        // Portanto, o Lexador precisa trabalhar com uma linha só.
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
exports.LexadorVisuAlg = LexadorVisuAlg;
//# sourceMappingURL=lexador-visualg.js.map