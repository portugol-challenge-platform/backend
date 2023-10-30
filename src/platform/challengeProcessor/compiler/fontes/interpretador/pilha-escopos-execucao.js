"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PilhaEscoposExecucao = void 0;
const estruturas_1 = require("../estruturas");
const excecoes_1 = require("../excecoes");
const lexador_1 = require("../lexador");
const inferenciador_1 = require("./inferenciador");
class PilhaEscoposExecucao {
    constructor() {
        this.pilha = [];
    }
    empilhar(item) {
        this.pilha.push(item);
    }
    eVazio() {
        return this.pilha.length === 0;
    }
    elementos() {
        return this.pilha.length;
    }
    naPosicao(posicao) {
        return this.pilha[posicao];
    }
    topoDaPilha() {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha[this.pilha.length - 1];
    }
    removerUltimo() {
        if (this.eVazio())
            throw new Error('Pilha vazia.');
        return this.pilha.pop();
    }
    converterValor(tipo, valor) {
        switch (tipo) {
            case 'inteiro':
                return parseInt(valor);
            case 'lógico':
                return Boolean(valor);
            case 'número':
                return Number(valor);
            case 'texto':
                return String(valor);
            default:
                return valor;
        }
    }
    definirConstante(nomeConstante, valor, subtipo) {
        const constante = this.pilha[this.pilha.length - 1].ambiente.valores[nomeConstante];
        let tipo;
        if (subtipo !== null && subtipo !== undefined) {
            tipo = subtipo;
        }
        else {
            tipo = constante && constante.hasOwnProperty('tipo') ? constante.tipo : (0, inferenciador_1.inferirTipoVariavel)(valor);
        }
        let elementoAlvo = {
            valor: this.converterValor(tipo, valor),
            tipo: tipo,
            subtipo: undefined,
            imutavel: true,
        };
        if (subtipo !== undefined) {
            elementoAlvo.subtipo = subtipo;
        }
        this.pilha[this.pilha.length - 1].ambiente.valores[nomeConstante] = elementoAlvo;
    }
    definirVariavel(nomeVariavel, valor, subtipo) {
        const variavel = this.pilha[this.pilha.length - 1].ambiente.valores[nomeVariavel];
        let tipo = variavel && variavel.hasOwnProperty('tipo') ? variavel.tipo : (0, inferenciador_1.inferirTipoVariavel)(valor);
        // TODO: Dois testes no VisuAlg falham por causa disso.
        /* if (subtipo !== null && subtipo !== undefined) {
            tipo = subtipo;
        } else {
            tipo = variavel && variavel.hasOwnProperty('tipo') ? variavel.tipo : inferirTipoVariavel(valor);
        } */
        let elementoAlvo = {
            valor: this.converterValor(tipo, valor),
            tipo: tipo,
            subtipo: undefined,
            imutavel: false,
        };
        if (subtipo !== undefined) {
            elementoAlvo.subtipo = subtipo;
        }
        this.pilha[this.pilha.length - 1].ambiente.valores[nomeVariavel] = elementoAlvo;
    }
    atribuirVariavelEm(distancia, simbolo, valor) {
        const ambienteAncestral = this.pilha[this.pilha.length - distancia].ambiente;
        if (ambienteAncestral.valores[simbolo.lexema].imutavel) {
            throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, `Constante '${simbolo.lexema}' não pode receber novos valores.`);
        }
        ambienteAncestral.valores[simbolo.lexema] = {
            valor,
            tipo: (0, inferenciador_1.inferirTipoVariavel)(valor),
            imutavel: false,
        };
    }
    atribuirVariavel(simbolo, valor) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                const variavel = ambiente.valores[simbolo.lexema];
                if (variavel.imutavel) {
                    throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, `Constante '${simbolo.lexema}' não pode receber novos valores.`);
                }
                const tipo = variavel && variavel.hasOwnProperty('tipo') ? variavel.tipo : (0, inferenciador_1.inferirTipoVariavel)(valor);
                const valorResolvido = this.converterValor(tipo, valor);
                ambiente.valores[simbolo.lexema] = {
                    valor: valorResolvido,
                    tipo,
                    imutavel: false,
                };
                return;
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida '" + simbolo.lexema + "'.");
    }
    obterEscopoPorTipo(tipo) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const escopoAtual = this.pilha[this.pilha.length - i];
            if (escopoAtual.tipo === tipo) {
                return escopoAtual;
            }
        }
        return undefined;
    }
    obterVariavelEm(distancia, nome) {
        const ambienteAncestral = this.pilha[this.pilha.length - distancia].ambiente;
        return ambienteAncestral.valores[nome];
    }
    obterValorVariavel(simbolo) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[simbolo.lexema] !== undefined) {
                return ambiente.valores[simbolo.lexema];
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(simbolo, "Variável não definida: '" + simbolo.lexema + "'.");
    }
    obterVariavelPorNome(nome) {
        for (let i = 1; i <= this.pilha.length; i++) {
            const ambiente = this.pilha[this.pilha.length - i].ambiente;
            if (ambiente.valores[nome] !== undefined) {
                return ambiente.valores[nome];
            }
        }
        throw new excecoes_1.ErroEmTempoDeExecucao(new lexador_1.Simbolo('especial', nome, nome, -1, -1), "Variável não definida: '" + nome + "'.");
    }
    /**
     * Método usado pelo depurador para obter todas as variáveis definidas.
     */
    obterTodasVariaveis(todasVariaveis = []) {
        for (let i = 1; i <= this.pilha.length - 1; i++) {
            const valoresAmbiente = this.pilha[this.pilha.length - i].ambiente.valores;
            const vetorObjeto = Object.entries(valoresAmbiente).map((chaveEValor, indice) => ({
                nome: chaveEValor[0],
                valor: chaveEValor[1].valor,
                tipo: chaveEValor[1].tipo,
                imutavel: chaveEValor[1].imutavel,
            }));
            todasVariaveis = todasVariaveis.concat(vetorObjeto);
        }
        return todasVariaveis;
    }
    /**
     * Obtém todas as funções declaradas ou por código-fonte, ou pelo desenvolvedor
     * em console, do último escopo.
     */
    obterTodasDeleguaFuncao() {
        const retorno = {};
        const ambiente = this.pilha[this.pilha.length - 1].ambiente;
        for (const [nome, corpo] of Object.entries(ambiente.valores)) {
            const corpoValor = corpo.hasOwnProperty('valor') ? corpo.valor : corpo;
            if (corpoValor instanceof estruturas_1.DeleguaFuncao) {
                retorno[nome] = corpoValor;
            }
        }
        return retorno;
    }
    /**
     * Obtém todas as declarações de classe do último escopo.
     * @returns
     */
    obterTodasDeclaracaoClasse() {
        const retorno = {};
        const ambiente = this.pilha[this.pilha.length - 1].ambiente;
        for (const [nome, corpo] of Object.entries(ambiente.valores)) {
            const corpoValor = corpo.hasOwnProperty('valor') ? corpo.valor : corpo;
            if (corpoValor instanceof estruturas_1.DeleguaClasse) {
                retorno[nome] = corpoValor;
            }
        }
        return retorno;
    }
}
exports.PilhaEscoposExecucao = PilhaEscoposExecucao;
//# sourceMappingURL=pilha-escopos-execucao.js.map