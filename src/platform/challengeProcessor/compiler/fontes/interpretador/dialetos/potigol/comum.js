"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retirarInterpolacao = exports.resolverInterpolacoes = exports.visitarExpressaoAcessoMetodo = void 0;
const estruturas_1 = require("../../../estruturas");
const inferenciador_1 = require("./inferenciador");
const primitivas_numero_1 = __importDefault(require("../../../bibliotecas/dialetos/potigol/primitivas-numero"));
const primitivas_texto_1 = __importDefault(require("../../../bibliotecas/dialetos/potigol/primitivas-texto"));
const primitivas_vetor_1 = __importDefault(require("../../../bibliotecas/dialetos/potigol/primitivas-vetor"));
const excecoes_1 = require("../../../excecoes");
/**
 * Executa um acesso a método, normalmente de um objeto de classe.
 * @param expressao A expressão de acesso.
 * @returns O resultado da execução.
 */
async function visitarExpressaoAcessoMetodo(interpretador, expressao) {
    const variavelObjeto = await interpretador.avaliar(expressao.objeto);
    const objeto = variavelObjeto.hasOwnProperty('valor') ? variavelObjeto.valor : variavelObjeto;
    if (objeto instanceof estruturas_1.ObjetoDeleguaClasse) {
        return objeto.obter(expressao.simbolo) || null;
    }
    // TODO: Possivelmente depreciar esta forma.
    // Não parece funcionar em momento algum.
    if (objeto.constructor === Object) {
        return objeto[expressao.simbolo.lexema] || null;
    }
    // Função tradicional do JavaScript.
    // Normalmente executa quando uma biblioteca é importada.
    if (typeof objeto[expressao.simbolo.lexema] === 'function') {
        return objeto[expressao.simbolo.lexema];
    }
    // Objeto tradicional do JavaScript.
    // Normalmente executa quando uma biblioteca é importada.
    if (typeof objeto[expressao.simbolo.lexema] === 'object') {
        return objeto[expressao.simbolo.lexema];
    }
    if (objeto instanceof estruturas_1.DeleguaModulo) {
        return objeto.componentes[expressao.simbolo.lexema] || null;
    }
    let tipoObjeto = variavelObjeto.tipo;
    if (tipoObjeto === null || tipoObjeto === undefined) {
        tipoObjeto = (0, inferenciador_1.inferirTipoVariavel)(variavelObjeto);
    }
    switch (tipoObjeto) {
        case 'numero':
        case 'número':
            const metodoDePrimitivaNumero = primitivas_numero_1.default[expressao.simbolo.lexema];
            if (metodoDePrimitivaNumero) {
                return new estruturas_1.MetodoPrimitiva(objeto, metodoDePrimitivaNumero);
            }
            break;
        case 'texto':
            const metodoDePrimitivaTexto = primitivas_texto_1.default[expressao.simbolo.lexema];
            if (metodoDePrimitivaTexto) {
                return new estruturas_1.MetodoPrimitiva(objeto, metodoDePrimitivaTexto);
            }
            break;
        case 'vetor':
            const metodoDePrimitivaVetor = primitivas_vetor_1.default[expressao.simbolo.lexema];
            if (metodoDePrimitivaVetor) {
                return new estruturas_1.MetodoPrimitiva(objeto, metodoDePrimitivaVetor);
            }
            break;
    }
    return Promise.reject(new excecoes_1.ErroEmTempoDeExecucao(expressao.simbolo, `Método para objeto ou primitiva não encontrado: ${expressao.simbolo.lexema}.`, expressao.linha));
}
exports.visitarExpressaoAcessoMetodo = visitarExpressaoAcessoMetodo;
/**
 * Resolve todas as interpolações em um texto.
 * @param {texto} textoOriginal O texto original com as variáveis interpoladas.
 * @returns Uma lista de variáveis interpoladas.
 */
async function resolverInterpolacoes(interpretador, textoOriginal, linha) {
    const variaveis = textoOriginal.match(interpretador.regexInterpolacao);
    let resultadosAvaliacaoSintatica = variaveis.map((s) => {
        const expressao = s.replace(/[\{\}]*/gm, '');
        let microLexador = interpretador.microLexador.mapear(expressao);
        const resultadoMicroAvaliadorSintatico = interpretador.microAvaliadorSintatico.analisar(microLexador, linha);
        return {
            nomeVariavel: expressao,
            resultadoMicroAvaliadorSintatico,
        };
    });
    // TODO: Verificar erros do `resultadosAvaliacaoSintatica`.
    const resolucoesPromises = await Promise.all(resultadosAvaliacaoSintatica
        .flatMap((r) => r.resultadoMicroAvaliadorSintatico.declaracoes)
        .map((d) => interpretador.avaliar(d)));
    return resolucoesPromises.map((item, indice) => ({
        variavel: resultadosAvaliacaoSintatica[indice].nomeVariavel,
        valor: item,
    }));
}
exports.resolverInterpolacoes = resolverInterpolacoes;
/**
 * Retira a interpolação de um texto.
 * @param {texto} texto O texto
 * @param {any[]} variaveis A lista de variaveis interpoladas
 * @returns O texto com o valor das variaveis.
 */
function retirarInterpolacao(texto, variaveis) {
    let textoFinal = texto;
    variaveis.forEach((elemento) => {
        var _a, _b, _c;
        if (((_a = elemento === null || elemento === void 0 ? void 0 : elemento.valor) === null || _a === void 0 ? void 0 : _a.tipo) === 'lógico') {
            textoFinal = textoFinal.replace('{' + elemento.variavel + '}', this.paraTexto((_b = elemento === null || elemento === void 0 ? void 0 : elemento.valor) === null || _b === void 0 ? void 0 : _b.valor));
        }
        else {
            textoFinal = textoFinal.replace('{' + elemento.variavel + '}', ((_c = elemento === null || elemento === void 0 ? void 0 : elemento.valor) === null || _c === void 0 ? void 0 : _c.valor) || (elemento === null || elemento === void 0 ? void 0 : elemento.valor));
        }
    });
    return textoFinal;
}
exports.retirarInterpolacao = retirarInterpolacao;
//# sourceMappingURL=comum.js.map