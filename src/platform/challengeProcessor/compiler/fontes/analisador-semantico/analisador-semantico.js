"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalisadorSemantico = void 0;
const construtos_1 = require("../construtos");
const declaracoes_1 = require("../declaracoes");
const pilha_variaveis_1 = require("./pilha-variaveis");
class AnalisadorSemantico {
    constructor() {
        this.pilhaVariaveis = new pilha_variaveis_1.PilhaVariaveis();
        this.variaveis = {};
        this.funcoes = {};
        this.atual = 0;
        this.erros = [];
    }
    erro(simbolo, mensagemDeErro) {
        this.erros.push({
            simbolo: simbolo,
            mensagem: mensagemDeErro,
            hashArquivo: simbolo.hashArquivo,
            linha: simbolo.linha,
        });
    }
    verificarTipoAtribuido(declaracao) {
        if (declaracao.tipo) {
            if (['vetor', 'qualquer[]', 'inteiro[]', 'texto[]'].includes(declaracao.tipo)) {
                if (declaracao.inicializador instanceof construtos_1.Vetor) {
                    const vetor = declaracao.inicializador;
                    if (declaracao.tipo === 'inteiro[]') {
                        const v = vetor.valores.find(v => typeof (v === null || v === void 0 ? void 0 : v.valor) !== 'number');
                        if (v) {
                            this.erro(declaracao.simbolo, `Atribuição inválida para '${declaracao.simbolo.lexema}', é esperado um vetor de 'inteiros' ou 'real'.`);
                        }
                    }
                    if (declaracao.tipo === 'texto[]') {
                        const v = vetor.valores.find(v => typeof (v === null || v === void 0 ? void 0 : v.valor) !== 'string');
                        if (v) {
                            this.erro(declaracao.simbolo, `Atribuição inválida para '${declaracao.simbolo.lexema}', é esperado um vetor de 'texto'.`);
                        }
                    }
                }
                else {
                    this.erro(declaracao.simbolo, `Atribuição inválida para '${declaracao.simbolo.lexema}', é esperado um vetor de elementos.`);
                }
            }
            if (declaracao.inicializador instanceof construtos_1.Literal) {
                const literal = declaracao.inicializador;
                if (declaracao.tipo === 'texto') {
                    if (typeof literal.valor !== 'string') {
                        this.erro(declaracao.simbolo, `Atribuição inválida para '${declaracao.simbolo.lexema}', é esperado um 'texto'.`);
                    }
                }
                if (['inteiro', 'real'].includes(declaracao.tipo)) {
                    if (typeof literal.valor !== 'number') {
                        this.erro(declaracao.simbolo, `Atribuição inválida para '${declaracao.simbolo.lexema}', é esperado um 'número'.`);
                    }
                }
            }
            if (declaracao.inicializador instanceof declaracoes_1.Leia) {
                if (declaracao.tipo !== 'texto') {
                    this.erro(declaracao.simbolo, `Atribuição inválida para '${declaracao.simbolo.lexema}', Leia só pode receber tipo 'texto'.`);
                }
            }
        }
    }
    visitarExpressaoTipoDe(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoFalhar(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoLiteral(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoAgrupamento(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoUnaria(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoBinaria(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDeChamada(expressao) {
        var _a, _b;
        if (expressao.entidadeChamada instanceof construtos_1.Variavel) {
            const variavel = expressao.entidadeChamada;
            const funcaoChamada = this.variaveis[variavel.simbolo.lexema] || this.funcoes[variavel.simbolo.lexema];
            if (!funcaoChamada) {
                this.erro(expressao.entidadeChamada.simbolo, `Chamada da função '${expressao.entidadeChamada.simbolo.lexema}' não existe.`);
                return Promise.resolve();
            }
            const funcao = funcaoChamada.valor;
            if (funcao.parametros.length !== expressao.argumentos.length) {
                this.erro(expressao.entidadeChamada.simbolo, `Função '${expressao.entidadeChamada.simbolo.lexema}' espera ${funcao.parametros.length} parametros.`);
            }
            for (let [indice, arg0] of funcao.parametros.entries()) {
                const arg1 = expressao.argumentos[indice];
                if (arg1) {
                    if (((_a = arg0.tipoDado) === null || _a === void 0 ? void 0 : _a.tipo) === 'texto' && typeof arg1.valor !== 'string') {
                        this.erro(expressao.entidadeChamada.simbolo, `O valor passado para o parâmetro '${arg0.tipoDado.nome}' é diferente do esperado pela função.`);
                    }
                    else if (['inteiro', 'real'].includes((_b = arg0.tipoDado) === null || _b === void 0 ? void 0 : _b.tipo)
                        && typeof arg1.valor !== 'number') {
                        this.erro(expressao.entidadeChamada.simbolo, `O valor passado para o parâmetro '${arg0.tipoDado.nome}' é diferente do esperado pela função.`);
                    }
                }
            }
        }
        return Promise.resolve();
    }
    visitarDeclaracaoDeAtribuicao(expressao) {
        let valor = this.variaveis[expressao.simbolo.lexema];
        if (!valor) {
            this.erro(expressao.simbolo, `Variável ${expressao.simbolo.lexema} ainda não foi declarada até este ponto.`);
            return Promise.resolve();
        }
        if (valor.tipo) {
            if (expressao.valor instanceof construtos_1.Literal && valor.tipo.includes('[]')) {
                this.erro(expressao.simbolo, `Atribuição inválida, esperado tipo '${valor.tipo}' na atribuição.`);
                return Promise.resolve();
            }
            if (expressao.valor instanceof construtos_1.Vetor && !valor.tipo.includes('[]')) {
                this.erro(expressao.simbolo, `Atribuição inválida, esperado tipo '${valor.tipo}' na atribuição.`);
                return Promise.resolve();
            }
            if (expressao.valor instanceof construtos_1.Literal) {
                let valorLiteral = typeof expressao.valor.valor;
                if (!['qualquer'].includes(valor.tipo)) {
                    if (valorLiteral === 'string') {
                        if (valor.tipo != 'texto') {
                            this.erro(expressao.simbolo, `Esperado tipo '${valor.tipo}' na atribuição.`);
                            return Promise.resolve();
                        }
                    }
                    if (valorLiteral === 'number') {
                        if (!['inteiro', 'real'].includes(valor.tipo)) {
                            this.erro(expressao.simbolo, `Esperado tipo '${valor.tipo}' na atribuição.`);
                            return Promise.resolve();
                        }
                    }
                }
            }
            if (expressao.valor instanceof construtos_1.Vetor) {
                let valores = expressao.valor.valores;
                if (!['qualquer[]'].includes(valor.tipo)) {
                    if (valor.tipo === 'texto[]') {
                        if (!valores.every((v) => typeof v.valor === 'string')) {
                            this.erro(expressao.simbolo, `Esperado tipo '${valor.tipo}' na atribuição.`);
                            return Promise.resolve();
                        }
                    }
                    if (['inteiro[]', 'numero[]'].includes(valor.tipo)) {
                        if (!valores.every((v) => typeof v.valor === 'number')) {
                            this.erro(expressao.simbolo, `Esperado tipo '${valor.tipo}' na atribuição.`);
                            return Promise.resolve();
                        }
                    }
                }
            }
        }
        if (valor.imutavel) {
            this.erro(expressao.simbolo, `Constante ${expressao.simbolo.lexema} não pode ser modificada.`);
            return Promise.resolve();
        }
    }
    visitarExpressaoDeVariavel(expressao) {
        return Promise.resolve();
    }
    visitarDeclaracaoDeExpressao(declaracao) {
        return declaracao.expressao.aceitar(this);
    }
    visitarExpressaoLeia(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoLeiaMultiplo(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoLogica(expressao) {
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
    visitarExpressaoFimPara(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoFazer(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoFormatacaoEscrita(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoEscolha(declaracao) {
        var _a, _b;
        const identificadorOuLiteral = declaracao.identificadorOuLiteral;
        const valor = (_b = this.variaveis[(_a = identificadorOuLiteral.simbolo) === null || _a === void 0 ? void 0 : _a.lexema]) === null || _b === void 0 ? void 0 : _b.valor;
        const tipo = typeof valor;
        for (let caminho of declaracao.caminhos) {
            for (let condicao of caminho.condicoes) {
                if (valor instanceof declaracoes_1.Leia && typeof (condicao === null || condicao === void 0 ? void 0 : condicao.valor) !== 'string') {
                    this.erro(condicao, `'caso ${condicao.valor}:' não é do mesmo tipo esperado em 'escolha'`);
                    continue;
                }
                if (!(valor instanceof declaracoes_1.Leia) && typeof (condicao === null || condicao === void 0 ? void 0 : condicao.valor) !== tipo) {
                    this.erro(condicao, `'caso ${condicao.valor}:' não é do mesmo tipo esperado em 'escolha'`);
                }
            }
        }
        return Promise.resolve();
    }
    visitarDeclaracaoTente(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoEnquanto(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoImportar(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoEscreva(declaracao) {
        const variaveis = declaracao.argumentos.filter(arg => arg instanceof construtos_1.Variavel);
        for (let variavel of variaveis) {
            if (!this.variaveis[variavel.simbolo.lexema]) {
                this.erro(variavel.simbolo, `Variável '${variavel.simbolo.lexema}' não existe.`);
            }
        }
        return Promise.resolve();
    }
    visitarExpressaoEscrevaMesmaLinha(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoBloco(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoConst(declaracao) {
        this.verificarTipoAtribuido(declaracao);
        if (this.variaveis.hasOwnProperty(declaracao.simbolo.lexema)) {
            this.erros.push({
                simbolo: declaracao.simbolo,
                mensagem: 'Declaração de constante já feita.',
                hashArquivo: declaracao.hashArquivo,
                linha: declaracao.linha,
            });
        }
        else {
            this.variaveis[declaracao.simbolo.lexema] = {
                imutavel: true,
                tipo: declaracao.tipo,
                valor: declaracao.inicializador.valor
            };
        }
        return Promise.resolve();
    }
    visitarDeclaracaoConstMultiplo(declaracao) {
        return Promise.resolve();
    }
    visitarDeclaracaoVar(declaracao) {
        this.verificarTipoAtribuido(declaracao);
        if (declaracao.inicializador instanceof construtos_1.FuncaoConstruto) {
            const funcao = declaracao.inicializador;
            if (funcao.parametros.length >= 255) {
                this.erro(declaracao.simbolo, 'Não pode haver mais de 255 parâmetros');
            }
        }
        this.variaveis[declaracao.simbolo.lexema] = {
            imutavel: false,
            tipo: declaracao.tipo,
            valor: declaracao.inicializador.valor || declaracao.inicializador
        };
        return Promise.resolve();
    }
    visitarDeclaracaoVarMultiplo(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoContinua(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoSustar(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoRetornar(declaracao) {
        return Promise.resolve(null);
    }
    visitarExpressaoDeleguaFuncao(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoAtribuicaoPorIndice(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoAcessoIndiceVariavel(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDefinirValor(expressao) {
        return Promise.resolve();
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        for (let parametro of declaracao.funcao.parametros) {
            if (parametro.hasOwnProperty('tipoDado') && !parametro.tipoDado.tipo) {
                this.erro(declaracao.simbolo, `O tipo '${parametro.tipoDado.tipoInvalido}' não é válido.`);
            }
        }
        if (declaracao.funcao.tipoRetorno === undefined) {
            this.erro(declaracao.simbolo, `Declaração de retorno da função é inválido.`);
        }
        if (declaracao.funcao.parametros.length >= 255) {
            this.erro(declaracao.simbolo, 'Não pode haver mais de 255 parâmetros');
        }
        let tipoRetornoFuncao = declaracao.funcao.tipoRetorno;
        if (tipoRetornoFuncao) {
            let funcaoContemRetorno = declaracao.funcao.corpo.find((c) => c instanceof declaracoes_1.Retorna);
            if (funcaoContemRetorno) {
                if (tipoRetornoFuncao === 'vazio') {
                    this.erro(declaracao.simbolo, `A função não pode ter nenhum tipo de retorno.`);
                }
                const tipoValor = typeof funcaoContemRetorno.valor.valor;
                if (!['qualquer'].includes(tipoRetornoFuncao)) {
                    if (tipoValor === 'string') {
                        if (tipoRetornoFuncao != 'texto') {
                            this.erro(declaracao.simbolo, `Esperado retorno do tipo '${tipoRetornoFuncao}' dentro da função.`);
                        }
                    }
                    if (tipoValor === 'number') {
                        if (!['inteiro', 'real'].includes(tipoRetornoFuncao)) {
                            this.erro(declaracao.simbolo, `Esperado retorno do tipo '${tipoRetornoFuncao}' dentro da função.`);
                        }
                    }
                }
            }
            else {
                if (tipoRetornoFuncao !== 'vazio') {
                    this.erro(declaracao.simbolo, `Esperado retorno do tipo '${tipoRetornoFuncao}' dentro da função.`);
                }
            }
        }
        this.funcoes[declaracao.simbolo.lexema] = {
            valor: declaracao.funcao
        };
        return Promise.resolve();
    }
    visitarDeclaracaoClasse(declaracao) {
        return Promise.resolve();
    }
    visitarExpressaoAcessoMetodo(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoIsto(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoDicionario(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoVetor(expressao) {
        return Promise.resolve();
    }
    visitarExpressaoSuper(expressao) {
        return Promise.resolve();
    }
    analisar(declaracoes) {
        // this.pilhaVariaveis = new PilhaVariaveis();
        // this.pilhaVariaveis.empilhar()
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
exports.AnalisadorSemantico = AnalisadorSemantico;
//# sourceMappingURL=analisador-semantico.js.map