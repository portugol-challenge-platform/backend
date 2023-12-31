"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitarExpressaoLogica = exports.visitarExpressaoBinaria = void 0;
const inferenciador_1 = require("../../inferenciador");
const mapler_1 = __importDefault(require("../../../tipos-de-simbolos/mapler"));
const excecoes_1 = require("../../../excecoes");
async function avaliar(visitante, expressao) {
    return await expressao.aceitar(visitante);
}
function eIgual(esquerda, direita) {
    if (esquerda === null && direita === null)
        return true;
    if (esquerda === null)
        return false;
    return esquerda === direita;
}
function eVerdadeiro(objeto) {
    if (objeto === null)
        return false;
    if (typeof objeto === 'boolean')
        return Boolean(objeto);
    if (objeto.hasOwnProperty('valor')) {
        return Boolean(objeto.valor);
    }
    return true;
}
function verificarOperandosNumeros(operador, direita, esquerda) {
    const tipoDireita = direita.tipo ? direita.tipo : typeof direita === 'number' ? 'número' : String(NaN);
    const tipoEsquerda = esquerda.tipo ? esquerda.tipo : typeof esquerda === 'number' ? 'número' : String(NaN);
    if (tipoDireita === 'número' && tipoEsquerda === 'número')
        return;
    throw new excecoes_1.ErroEmTempoDeExecucao(operador, 'Operadores precisam ser números.', operador.linha);
}
/**
 * Método de visita de expressão binária.
 * Reintroduzido pelas particularidades do VisuAlg.
 * @param expressao A expressão binária.
 * @returns O resultado da resolução da expressão.
 */
async function visitarExpressaoBinaria(visitante, expressao) {
    try {
        const esquerda = await avaliar(visitante, expressao.esquerda);
        const direita = await avaliar(visitante, expressao.direita);
        let valorEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('valor')) ? esquerda.valor : esquerda;
        let valorDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('valor')) ? direita.valor : direita;
        // No VisuAlg, uma variável pode resolver para função porque funções não precisam ter parênteses.
        // Esta parte evita o problema.
        if (valorEsquerdo && valorEsquerdo.hasOwnProperty('funcao')) {
            valorEsquerdo = valorEsquerdo.funcao();
        }
        if (valorDireito && valorDireito.hasOwnProperty('funcao')) {
            valorDireito = valorDireito.funcao();
        }
        const tipoEsquerdo = (esquerda === null || esquerda === void 0 ? void 0 : esquerda.hasOwnProperty('tipo')) ? esquerda.tipo : (0, inferenciador_1.inferirTipoVariavel)(esquerda);
        const tipoDireito = (direita === null || direita === void 0 ? void 0 : direita.hasOwnProperty('tipo')) ? direita.tipo : (0, inferenciador_1.inferirTipoVariavel)(direita);
        switch (expressao.operador.tipo) {
            // case tiposDeSimbolos.EXPONENCIACAO:
            //     verificarOperandosNumeros(expressao.operador, esquerda, direita);
            //     return Math.pow(valorEsquerdo, valorDireito);
            case mapler_1.default.MAIOR:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) > Number(valorDireito);
            case mapler_1.default.MAIOR_IGUAL:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) >= Number(valorDireito);
            case mapler_1.default.MENOR:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) < Number(valorDireito);
            case mapler_1.default.MENOR_IGUAL:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) <= Number(valorDireito);
            case mapler_1.default.SUBTRACAO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) - Number(valorDireito);
            case mapler_1.default.ADICAO:
                if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                    return Number(valorEsquerdo) + Number(valorDireito);
                }
                else {
                    return String(valorEsquerdo) + String(valorDireito);
                }
            case mapler_1.default.DIVISAO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) / Number(valorDireito);
            // case tiposDeSimbolos.DIVISAO_INTEIRA:
            //     verificarOperandosNumeros(expressao.operador, esquerda, direita);
            //     return Math.floor(Number(valorEsquerdo) / Number(valorDireito));
            case mapler_1.default.MULTIPLICACAO:
                if (tipoEsquerdo === 'texto' || tipoDireito === 'texto') {
                    // Sem ambos os valores resolvem como texto, multiplica normal.
                    // Se apenas um resolve como texto, o outro repete o
                    // texto n vezes, sendo n o valor do outro.
                    if (tipoEsquerdo === 'texto' && tipoDireito === 'texto') {
                        return Number(valorEsquerdo) * Number(valorDireito);
                    }
                    if (tipoEsquerdo === 'texto') {
                        return valorEsquerdo.repeat(Number(valorDireito));
                    }
                    return valorDireito.repeat(Number(valorEsquerdo));
                }
                return Number(valorEsquerdo) * Number(valorDireito);
            case mapler_1.default.MODULO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) % Number(valorDireito);
            case mapler_1.default.DIFERENTE:
                return !eIgual(valorEsquerdo, valorDireito);
            case mapler_1.default.IGUAL:
                return eIgual(valorEsquerdo, valorDireito);
        }
    }
    catch (erro) {
        return Promise.reject(erro);
    }
}
exports.visitarExpressaoBinaria = visitarExpressaoBinaria;
async function visitarExpressaoLogica(interpretador, expressao) {
    const esquerda = await avaliar(interpretador, expressao.esquerda);
    // se um estado for verdadeiro, retorna verdadeiro
    // if (expressao.operador.tipo === tiposDeSimbolos.OU) {
    //     if (eVerdadeiro(esquerda)) return esquerda;
    // }
    // se a primeira variável é verdadeiro, retorna a segunda invertida
    // if (expressao.operador.tipo === tiposDeSimbolos.XOU) {
    //     const valorDireito = await avaliar(interpretador, expressao.direita);
    //     return eVerdadeiro(esquerda) !== eVerdadeiro(valorDireito);
    // }
    // se um estado for falso, retorna falso
    // if (expressao.operador.tipo === tiposDeSimbolos.E) {
    //     if (!eVerdadeiro(esquerda)) return esquerda;
    // }
    return await avaliar(interpretador, expressao.direita);
}
exports.visitarExpressaoLogica = visitarExpressaoLogica;
//# sourceMappingURL=comum.js.map