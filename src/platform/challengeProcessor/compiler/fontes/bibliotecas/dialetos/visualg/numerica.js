"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarBibliotecaNumericaVisuAlg = void 0;
const estruturas_1 = require("../../../estruturas");
function registrarBibliotecaNumericaVisuAlg(interpretador, pilhaEscoposExecucao) {
    pilhaEscoposExecucao.definirVariavel('abs', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.abs(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('arccos', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.acos(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('arcsen', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.asin(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('arctan', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.atan(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('cos', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.cos(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('cotan', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return 1 / Math.tan(valor);
    }));
    // Esse método não existe na biblioteca padrão. É usado para outros
    // projetos montarem lógicas de tratamento de erro.
    pilhaEscoposExecucao.definirVariavel('erro', new estruturas_1.FuncaoPadrao(0, function () {
        throw new Error('Essa função atira erro. É usada para testes variados.');
    }));
    pilhaEscoposExecucao.definirVariavel('exp', new estruturas_1.FuncaoPadrao(2, function (base, expoente) {
        const baseResolvida = base.hasOwnProperty('valor') ? base.valor : base;
        const expoenteResolvido = base.hasOwnProperty('valor') ? expoente.valor : expoente;
        return Math.pow(baseResolvida, expoenteResolvido);
    }));
    pilhaEscoposExecucao.definirVariavel('grauprad', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return (valor * Math.PI) / 180;
    }));
    pilhaEscoposExecucao.definirVariavel('int', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.floor(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('log', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.log10(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('logn', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.log(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('pi', new estruturas_1.FuncaoPadrao(0, function () {
        return Math.PI;
    }));
    pilhaEscoposExecucao.definirVariavel('quad', new estruturas_1.FuncaoPadrao(1, function (valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return valorResolvido * valorResolvido;
    }));
    pilhaEscoposExecucao.definirVariavel('radpgrau', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return (valor * 180) / Math.PI;
    }));
    pilhaEscoposExecucao.definirVariavel('raizq', new estruturas_1.FuncaoPadrao(1, function (valor) {
        const valorResolvido = valor.hasOwnProperty('valor') ? valor.valor : valor;
        return Math.sqrt(valorResolvido);
    }));
    pilhaEscoposExecucao.definirVariavel('rand', new estruturas_1.FuncaoPadrao(0, function () {
        return Math.random();
    }));
    pilhaEscoposExecucao.definirVariavel('randi', new estruturas_1.FuncaoPadrao(1, function (limite) {
        return Math.floor(Math.random() * limite);
    }));
    pilhaEscoposExecucao.definirVariavel('sen', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.sin(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('tan', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.tan(valor);
    }));
}
exports.registrarBibliotecaNumericaVisuAlg = registrarBibliotecaNumericaVisuAlg;
//# sourceMappingURL=numerica.js.map