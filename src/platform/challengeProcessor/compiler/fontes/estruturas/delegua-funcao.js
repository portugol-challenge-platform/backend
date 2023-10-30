"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleguaFuncao = void 0;
const chamavel_1 = require("./chamavel");
const espaco_variaveis_1 = require("../espaco-variaveis");
const quebras_1 = require("../quebras");
const inferenciador_1 = require("../interpretador/inferenciador");
/**
 * Qualquer função declarada em código é uma DeleguaFuncao.
 */
class DeleguaFuncao extends chamavel_1.Chamavel {
    constructor(nome, declaracao, instancia = undefined, eInicializador = false) {
        super();
        this.nome = nome;
        this.declaracao = declaracao;
        this.instancia = instancia;
        this.eInicializador = eInicializador;
    }
    aridade() {
        var _a, _b;
        return ((_b = (_a = this.declaracao) === null || _a === void 0 ? void 0 : _a.parametros) === null || _b === void 0 ? void 0 : _b.length) || 0;
    }
    paraTexto() {
        if (this.nome === null)
            return '<função>';
        return `<função ${this.nome}>`;
    }
    async chamar(visitante, argumentos) {
        const ambiente = new espaco_variaveis_1.EspacoVariaveis();
        const parametros = this.declaracao.parametros || [];
        for (let i = 0; i < parametros.length; i++) {
            const parametro = parametros[i];
            const nome = parametro['nome'].lexema;
            let argumento = argumentos[i];
            if (argumentos[i] === null) {
                argumento = parametro['padrao'] ? parametro['padrao'].valor : null;
            }
            ambiente.valores[nome] = argumento.hasOwnProperty('valor') ? argumento.valor : argumento;
        }
        if (this.instancia !== undefined) {
            ambiente.valores['isto'] = {
                valor: this.instancia,
                tipo: 'objeto',
                imutavel: false,
            };
            if (this.instancia.classe.dialetoRequerExpansaoPropriedadesEspacoVariaveis) {
                for (let [nomeCampo, valorCampo] of Object.entries(this.instancia.campos)) {
                    ambiente.valores[nomeCampo] = {
                        valor: valorCampo,
                        tipo: (0, inferenciador_1.inferirTipoVariavel)(valorCampo),
                        imutavel: false,
                    };
                }
            }
        }
        // TODO: Repensar essa dinâmica para análise semântica.
        const interpretador = visitante;
        interpretador.proximoEscopo = 'funcao';
        const retornoBloco = await interpretador.executarBloco(this.declaracao.corpo, ambiente);
        const referencias = this.declaracao.parametros
            .map((p, indice) => {
            if (p.referencia) {
                return {
                    indice: indice,
                    parametro: p,
                };
            }
        })
            .filter((r) => r);
        const pilha = interpretador.pilhaEscoposExecucao;
        for (let referencia of referencias) {
            let argumentoReferencia = ambiente.valores[referencia.parametro.nome.lexema];
            pilha.atribuirVariavel({
                lexema: argumentos[referencia.indice].nome,
            }, argumentoReferencia.valor);
        }
        if (retornoBloco instanceof quebras_1.RetornoQuebra) {
            return retornoBloco.valor;
        }
        if (this.eInicializador) {
            return this.instancia;
        }
        return retornoBloco;
    }
    funcaoPorMetodoDeClasse(instancia) {
        return new DeleguaFuncao(this.nome, this.declaracao, instancia, this.eInicializador);
    }
}
exports.DeleguaFuncao = DeleguaFuncao;
//# sourceMappingURL=delegua-funcao.js.map