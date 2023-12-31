"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarBibliotecaCaracteresVisuAlg = void 0;
const estruturas_1 = require("../../../estruturas");
function registrarBibliotecaCaracteresVisuAlg(interpretador, pilhaEscoposExecucao) {
    pilhaEscoposExecucao.definirVariavel('asc', new estruturas_1.FuncaoPadrao(1, function (valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return String(valorResolvido).charCodeAt(0);
    }));
    pilhaEscoposExecucao.definirVariavel('carac', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return String.fromCharCode(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('caracpnum', new estruturas_1.FuncaoPadrao(1, function (valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return Number(valorResolvido);
    }));
    pilhaEscoposExecucao.definirVariavel('compr', new estruturas_1.FuncaoPadrao(1, function (valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return String(valorResolvido).length;
    }));
    pilhaEscoposExecucao.definirVariavel('copia', new estruturas_1.FuncaoPadrao(3, function (valor, inicio, fim) {
        return valor.substring(inicio, inicio + fim);
    }));
    // Esse método não existe na biblioteca padrão. É usado para outros
    // projetos montarem lógicas de tratamento de erro.
    pilhaEscoposExecucao.definirVariavel('erro2', new estruturas_1.FuncaoPadrao(0, function () {
        throw new Error('Essa função atira erro também. É usada para testes variados.');
    }));
    pilhaEscoposExecucao.definirVariavel('limpatela', new estruturas_1.FuncaoPadrao(0, console.clear));
    pilhaEscoposExecucao.definirVariavel('maiusc', new estruturas_1.FuncaoPadrao(1, function (valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return String(valorResolvido).toUpperCase();
    }));
    pilhaEscoposExecucao.definirVariavel('minusc', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return valor.toLowerCase();
    }));
    pilhaEscoposExecucao.definirVariavel('numpcarac', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return String(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('pos', new estruturas_1.FuncaoPadrao(2, function (busca, valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return String(valorResolvido).indexOf(busca) + 1;
    }));
}
exports.registrarBibliotecaCaracteresVisuAlg = registrarBibliotecaCaracteresVisuAlg;
//# sourceMappingURL=caracteres.js.map