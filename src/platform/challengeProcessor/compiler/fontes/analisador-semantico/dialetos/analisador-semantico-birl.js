"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalisadorSemanticoBirl = void 0;
const pilha_variaveis_1 = require("../pilha-variaveis");
class AnalisadorSemanticoBirl {
    constructor() {
        this.pilhaVariaveis = new pilha_variaveis_1.PilhaVariaveis();
        this.variaveis = {};
        this.atual = 0;
        this.erros = [];
    }
    visitarExpressaoTipoDe(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoClasse(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoConst(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoConstMultiplo(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoDeAtribuicao(expressao) {
        if (!this.variaveis.hasOwnProperty(expressao.simbolo.lexema)) {
            this.erros.push({
                simbolo: expressao.simbolo,
                mensagem: `A variável ${expressao.simbolo.lexema} não foi declarada.`,
                hashArquivo: expressao.hashArquivo,
                linha: expressao.linha,
            });
            return Promise.resolve();
        }
        if (this.variaveis[expressao.simbolo.lexema].imutavel) {
            this.erros.push({
                simbolo: expressao.simbolo,
                mensagem: `Constante ${expressao.simbolo.lexema} não pode ser modificada.`,
                hashArquivo: expressao.hashArquivo,
                linha: expressao.linha,
            });
            return Promise.resolve();
        }
    }
    visitarDeclaracaoDeExpressao(declaracao) {
        return declaracao.expressao.aceitar(this);
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoEnquanto(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoEscolha(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoEscreva(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoFazer(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoImportar(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoPara(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoParaCada(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoSe(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoTente(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoVar(declaracao) {
        this.variaveis[declaracao.simbolo.lexema] = {
            imutavel: false,
            tipo: 'número',
        };
        return Promise.resolve();
    }
    visitarDeclaracaoVarMultiplo(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoAcessoIndiceVariavel(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoAcessoMetodo(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoAgrupamento(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoAtribuicaoPorIndice(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoBinaria(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoBloco(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoContinua(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoDeChamada(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDefinirValor(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDeleguaFuncao(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDeVariavel(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDicionario(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoEscrevaMesmaLinha(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoFalhar(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoFimPara(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoFormatacaoEscrita(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoIsto(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoLeia(expressao) {
        if (!this.variaveis.hasOwnProperty(expressao.argumentos[0].simbolo.lexema)) {
            this.erros.push({
                simbolo: expressao.argumentos[0].simbolo,
                mensagem: `A variável ${expressao.argumentos[0].simbolo.lexema} não foi declarada.`,
                hashArquivo: expressao.hashArquivo,
                linha: expressao.linha,
            });
            return Promise.resolve();
        }
        const tipoVariavelExpressão = this.variaveis[expressao.argumentos[0].simbolo.lexema].tipo;
        const tipoVariavelArgumento = expressao.argumentos[1].valor;
        if (tipoVariavelExpressão !== tipoVariavelArgumento) {
            this.erros.push({
                simbolo: expressao.argumentos[0].simbolo,
                mensagem: `A variável ${expressao.argumentos[0].simbolo.lexema} não é do tipo ${tipoVariavelArgumento}.`,
                hashArquivo: expressao.hashArquivo,
                linha: expressao.linha,
            });
            return Promise.resolve();
        }
        return Promise.resolve();
    }
    visitarExpressaoLeiaMultiplo(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoLiteral(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoLogica(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoRetornar(declaracao) {
        return Promise.resolve(null);
    }
    visitarExpressaoSuper(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoSustar(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoUnaria(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoVetor(expressao) {
        return Promise.resolve();
    }
    analisar(declaracoes) {
        this.variaveis = {};
        this.atual = 0;
        this.erros = [];
        while (this.atual < declaracoes.length) {
            declaracoes[this.atual].aceitar(this);
            this.atual++;
        }
        return {
            erros: this.erros,
        };
    }
}
exports.AnalisadorSemanticoBirl = AnalisadorSemanticoBirl;
//# sourceMappingURL=analisador-semantico-birl.js.map