"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexadorJavaScript = void 0;
const esprima_1 = require("esprima");
/**
 * Este lexador existe apenas para abstrair o Esprima em
 * outras dependências, como `delegua-node`.
 */
class LexadorJavaScript {
    eDigito(caractere) {
        throw new Error('Método não implementado.');
    }
    eAlfabeto(caractere) {
        throw new Error('Método não implementado.');
    }
    eAlfabetoOuDigito(caractere) {
        throw new Error('Método não implementado.');
    }
    eFinalDoCodigo() {
        throw new Error('Método não implementado.');
    }
    avancar() {
        throw new Error('Método não implementado.');
    }
    adicionarSimbolo(tipo, literal) {
        throw new Error('Método não implementado.');
    }
    simboloAtual() {
        throw new Error('Método não implementado.');
    }
    proximoSimbolo() {
        throw new Error('Método não implementado.');
    }
    simboloAnterior() {
        throw new Error('Método não implementado.');
    }
    analisarTexto(delimitador) {
        throw new Error('Método não implementado.');
    }
    analisarNumero() {
        throw new Error('Método não implementado.');
    }
    identificarPalavraChave() {
        throw new Error('Método não implementado.');
    }
    analisarToken() {
        throw new Error('Método não implementado.');
    }
    mapear(codigo, hashArquivo) {
        const programaEsprima = (0, esprima_1.parseScript)(codigo.join('\n'));
        return {
            simbolos: programaEsprima.body,
            erros: [],
        };
    }
}
exports.LexadorJavaScript = LexadorJavaScript;
//# sourceMappingURL=lexador-javascript.js.map