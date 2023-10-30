"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolverIncrementoPara = exports.visitarExpressaoLogica = exports.visitarExpressaoBinaria = exports.atribuirVariavel = void 0;
const construtos_1 = require("../../../construtos");
const lexador_1 = require("../../../lexador");
const inferenciador_1 = require("../../inferenciador");
const visualg_1 = __importDefault(require("../../../tipos-de-simbolos/visualg"));
const excecoes_1 = require("../../../excecoes");
async function atribuirVariavel(interpretador, expressao, valor) {
    if (expressao instanceof construtos_1.Variavel) {
        interpretador.pilhaEscoposExecucao.atribuirVariavel(expressao.simbolo, valor);
        return;
    }
    if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
        const promises = await Promise.all([
            interpretador.avaliar(expressao.entidadeChamada),
            interpretador.avaliar(expressao.indice),
        ]);
        let alvo = promises[0];
        let indice = promises[1];
        const subtipo = alvo.hasOwnProperty('subtipo') ? alvo.subtipo : undefined;
        if (alvo.hasOwnProperty('valor')) {
            alvo = alvo.valor;
        }
        if (indice.hasOwnProperty('valor')) {
            indice = indice.valor;
        }
        let valorResolvido;
        switch (subtipo) {
            case 'texto':
                valorResolvido = String(valor);
                break;
            case 'número':
                valorResolvido = Number(valor);
                break;
            case 'lógico':
                valorResolvido = Boolean(valor);
                break;
            default:
                valorResolvido = valor;
                break;
        }
        alvo[indice] = valorResolvido;
    }
}
exports.atribuirVariavel = atribuirVariavel;
async function avaliar(interpretador, expressao) {
    return await expressao.aceitar(interpretador);
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
async function visitarExpressaoBinaria(interpretador, expressao) {
    try {
        const promises = await Promise.all([
            avaliar(interpretador, expressao.esquerda),
            avaliar(interpretador, expressao.direita),
        ]);
        const esquerda = promises[0];
        const direita = promises[1];
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
            case visualg_1.default.EXPONENCIACAO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Math.pow(valorEsquerdo, valorDireito);
            case visualg_1.default.MAIOR:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) > Number(valorDireito);
            case visualg_1.default.MAIOR_IGUAL:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) >= Number(valorDireito);
            case visualg_1.default.MENOR:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) < Number(valorDireito);
            case visualg_1.default.MENOR_IGUAL:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) <= Number(valorDireito);
            case visualg_1.default.SUBTRACAO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) - Number(valorDireito);
            case visualg_1.default.ADICAO:
                if (tipoEsquerdo === 'número' && tipoDireito === 'número') {
                    return Number(valorEsquerdo) + Number(valorDireito);
                }
                else {
                    return String(valorEsquerdo) + String(valorDireito);
                }
            case visualg_1.default.DIVISAO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) / Number(valorDireito);
            case visualg_1.default.DIVISAO_INTEIRA:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Math.floor(Number(valorEsquerdo) / Number(valorDireito));
            case visualg_1.default.MULTIPLICACAO:
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
            case visualg_1.default.MODULO:
                verificarOperandosNumeros(expressao.operador, esquerda, direita);
                return Number(valorEsquerdo) % Number(valorDireito);
            case visualg_1.default.DIFERENTE:
                return !eIgual(valorEsquerdo, valorDireito);
            case visualg_1.default.IGUAL:
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
    if (expressao.operador.tipo === visualg_1.default.OU) {
        if (eVerdadeiro(esquerda))
            return esquerda;
    }
    // se a primeira variável é verdadeiro, retorna a segunda invertida
    if (expressao.operador.tipo === visualg_1.default.XOU) {
        const valorDireito = await avaliar(interpretador, expressao.direita);
        return eVerdadeiro(esquerda) !== eVerdadeiro(valorDireito);
    }
    // se um estado for falso, retorna falso
    if (expressao.operador.tipo === visualg_1.default.E) {
        if (!eVerdadeiro(esquerda))
            return esquerda;
    }
    return await avaliar(interpretador, expressao.direita);
}
exports.visitarExpressaoLogica = visitarExpressaoLogica;
/* Isso existe porque o laço `para` do VisuAlg pode ter o passo positivo ou negativo
 * dependendo dos operandos de início e fim, que só são possíveis de determinar
 * em tempo de execução.
 * Quando um dos operandos é uma variável, tanto a condição do laço quanto o
 * passo são considerados indefinidos aqui.
 */
async function resolverIncrementoPara(interpretador, declaracao) {
    if (declaracao.resolverIncrementoEmExecucao) {
        const promises = await Promise.all([
            avaliar(interpretador, declaracao.condicao.esquerda),
            avaliar(interpretador, declaracao.condicao.direita),
        ]);
        const operandoEsquerdo = promises[0];
        const operandoDireito = promises[1];
        const valorAtualEsquerdo = operandoEsquerdo.hasOwnProperty('valor') ? operandoEsquerdo.valor : operandoEsquerdo;
        const valorAtualDireito = operandoDireito.hasOwnProperty('valor') ? operandoDireito.valor : operandoDireito;
        if (valorAtualEsquerdo < valorAtualDireito) {
            declaracao.condicao.operador = new lexador_1.Simbolo(visualg_1.default.MENOR_IGUAL, '', '', Number(declaracao.linha), declaracao.hashArquivo);
            declaracao.incrementar.condicaoPara.operador = new lexador_1.Simbolo(visualg_1.default.MENOR, '', '', Number(declaracao.linha), declaracao.hashArquivo);
            declaracao.incrementar.incremento.expressao.valor.direita = new construtos_1.Literal(declaracao.hashArquivo, Number(declaracao.linha), 1);
        }
        else {
            declaracao.condicao.operador = new lexador_1.Simbolo(visualg_1.default.MAIOR_IGUAL, '', '', Number(declaracao.linha), declaracao.hashArquivo);
            declaracao.incrementar.condicaoPara.operador = new lexador_1.Simbolo(visualg_1.default.MAIOR, '', '', Number(declaracao.linha), declaracao.hashArquivo);
            declaracao.incrementar.incremento.expressao.valor.direita = new construtos_1.Unario(declaracao.hashArquivo, new lexador_1.Simbolo(visualg_1.default.SUBTRACAO, '-', undefined, declaracao.linha, declaracao.hashArquivo), new construtos_1.Literal(declaracao.hashArquivo, Number(declaracao.linha), 1), 'ANTES');
        }
    }
}
exports.resolverIncrementoPara = resolverIncrementoPara;
//# sourceMappingURL=comum.js.map