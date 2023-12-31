"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarBibliotecaGlobalPotigol = void 0;
const estruturas_1 = require("../../../estruturas");
function registrarBibliotecaGlobalPotigol(interpretador, pilhaEscoposExecucao) {
    pilhaEscoposExecucao.definirVariavel('abs', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.abs(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('aleatório', new estruturas_1.FuncaoPadrao(0, function () {
        return Math.random();
    }));
    pilhaEscoposExecucao.definirVariavel('arccos', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.acos(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('arcsen', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.asin(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('arctg', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.atan(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('cos', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.cos(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('log', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.log(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('log10', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.log10(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('pi', new estruturas_1.FuncaoPadrao(0, function () {
        return Math.PI;
    }));
    pilhaEscoposExecucao.definirVariavel('raiz', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.sqrt(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('sen', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.sin(valor);
    }));
    pilhaEscoposExecucao.definirVariavel('tg', new estruturas_1.FuncaoPadrao(1, function (valor) {
        return Math.tan(valor);
    }));
}
exports.registrarBibliotecaGlobalPotigol = registrarBibliotecaGlobalPotigol;
//# sourceMappingURL=biblioteca-global.js.map