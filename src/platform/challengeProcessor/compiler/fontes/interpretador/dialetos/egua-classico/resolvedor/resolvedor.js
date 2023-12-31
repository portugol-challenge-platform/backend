"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedorEguaClassico = void 0;
const erro_resolvedor_1 = require("./erro-resolvedor");
const pilha_escopos_1 = require("./pilha-escopos");
const TipoFuncao = {
    NENHUM: 'NENHUM',
    FUNÇÃO: 'FUNÇÃO',
    CONSTRUTOR: 'CONSTRUTOR',
    METODO: 'METODO',
};
const TipoClasse = {
    NENHUM: 'NENHUM',
    CLASSE: 'CLASSE',
    SUBCLASSE: 'SUBCLASSE',
};
const LoopType = {
    NENHUM: 'NENHUM',
    ENQUANTO: 'ENQUANTO',
    ESCOLHA: 'ESCOLHA',
    PARA: 'PARA',
    FAZER: 'FAZER',
};
/**
 * O Resolvedor (Resolver) é responsável por catalogar todos os identificadores complexos, como por exemplo: funções, classes, variáveis,
 * e delimitar os escopos onde esses identificadores existem.
 *
 * Exemplo: uma classe A declara dois métodos chamados M e N. Todas as variáveis declaradas dentro de M não podem ser vistas por N, e vice-versa.
 * No entanto, todas as variáveis declaradas dentro da classe A podem ser vistas tanto por M quanto por N.
 *
 * Não faz sentido ser implementado nos outros interpretadores pelos outros optarem por uma pilha de execução que
 * espera importar qualquer coisa a qualquer momento.
 */
class ResolvedorEguaClassico {
    constructor() {
        this.interfaceEntradaSaida = null;
        this.erros = [];
        this.escopos = new pilha_escopos_1.PilhaEscopos();
        this.locais = new Map();
        this.funcaoAtual = TipoFuncao.NENHUM;
        this.classeAtual = TipoClasse.NENHUM;
        this.cicloAtual = TipoClasse.NENHUM;
    }
    visitarExpressaoTipoDe(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFalhar(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoParaCada(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoConst(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoConstMultiplo(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFimPara(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoFormatacaoEscrita(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoEscrevaMesmaLinha(declaracao) {
        throw new Error('Método não implementado.');
    }
    avaliar(expressao) {
        throw new Error('Método não implementado.');
    }
    eVerdadeiro(objeto) {
        throw new Error('Método não implementado.');
    }
    verificarOperandoNumero(operador, operando) {
        throw new Error('Método não implementado.');
    }
    eIgual(esquerda, direita) {
        throw new Error('Método não implementado.');
    }
    verificarOperandosNumeros(operador, direita, esquerda) {
        throw new Error('Método não implementado.');
    }
    procurarVariavel(nome, expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoLeia(expressao) {
        throw new Error('Método não implementado.');
    }
    visitarExpressaoLeiaMultiplo(expressao) {
        throw new Error('Método não implementado.');
    }
    executarBloco(declaracoes, ambiente) {
        throw new Error('Método não implementado.');
    }
    paraTexto(objeto) {
        throw new Error('Método não implementado.');
    }
    executar(declaracao, mostrarResultado) {
        throw new Error('Método não implementado.');
    }
    interpretar(declaracoes, manterAmbiente) {
        throw new Error('Método não implementado.');
    }
    finalizacao() {
        throw new Error('Método não implementado.');
    }
    definir(simbolo) {
        if (this.escopos.eVazio())
            return;
        this.escopos.topoDaPilha()[simbolo.lexema] = true;
    }
    declarar(simbolo) {
        if (this.escopos.eVazio())
            return;
        const escopo = this.escopos.topoDaPilha();
        if (escopo.hasOwnProperty(simbolo.lexema)) {
            const erro = new erro_resolvedor_1.ErroResolvedor(simbolo, 'Variável com esse nome já declarada neste escopo.');
            this.erros.push(erro);
        }
        escopo[simbolo.lexema] = false;
    }
    inicioDoEscopo() {
        this.escopos.empilhar({});
    }
    finalDoEscopo() {
        this.escopos.removerUltimo();
    }
    resolverLocal(expressao, simbolo) {
        for (let i = this.escopos.pilha.length - 1; i >= 0; i--) {
            if (this.escopos.pilha[i].hasOwnProperty(simbolo.lexema)) {
                this.locais.set(expressao, this.escopos.pilha.length - 1 - i);
            }
        }
    }
    visitarExpressaoBloco(declaracao) {
        this.inicioDoEscopo();
        this.resolver(declaracao.declaracoes);
        this.finalDoEscopo();
        return null;
    }
    visitarExpressaoDeVariavel(expressao) {
        if (!this.escopos.eVazio() && this.escopos.topoDaPilha()[expressao.simbolo.lexema] === false) {
            const erro = new erro_resolvedor_1.ErroResolvedor(expressao.simbolo, 'Não é possível ler a variável local em seu próprio inicializador.');
            this.erros.push(erro);
            throw erro;
        }
        this.resolverLocal(expressao, expressao.simbolo);
        return null;
    }
    visitarDeclaracaoVar(declaracao) {
        this.declarar(declaracao.simbolo);
        if (declaracao.inicializador !== null) {
            this.resolver(declaracao.inicializador);
        }
        this.definir(declaracao.simbolo);
        return null;
    }
    visitarDeclaracaoVarMultiplo(declaracao) {
        throw new Error('Método não implementado.');
    }
    visitarDeclaracaoDeAtribuicao(expressao) {
        this.resolver(expressao.valor);
        this.resolverLocal(expressao, expressao.simbolo);
        return null;
    }
    resolverFuncao(funcao, funcType) {
        const enclosingFunc = this.funcaoAtual;
        this.funcaoAtual = funcType;
        this.inicioDoEscopo();
        const parametros = funcao.parametros;
        if (parametros && parametros.length > 0) {
            for (let i = 0; i < parametros.length; i++) {
                this.declarar(parametros[i]['nome']);
                this.definir(parametros[i]['nome']);
            }
        }
        this.resolver(funcao.corpo);
        this.finalDoEscopo();
        this.funcaoAtual = enclosingFunc;
    }
    visitarDeclaracaoDefinicaoFuncao(declaracao) {
        this.declarar(declaracao.simbolo);
        this.definir(declaracao.simbolo);
        this.resolverFuncao(declaracao.funcao, TipoFuncao.FUNÇÃO);
        return null;
    }
    visitarExpressaoDeleguaFuncao(declaracao) {
        this.resolverFuncao(declaracao, TipoFuncao.FUNÇÃO);
        return null;
    }
    visitarDeclaracaoTente(declaracao) {
        this.resolver(declaracao.caminhoTente);
        if (declaracao.caminhoPegue !== null)
            this.resolver(declaracao.caminhoPegue);
        if (declaracao.caminhoSenao !== null)
            this.resolver(declaracao.caminhoSenao);
        if (declaracao.caminhoFinalmente !== null)
            this.resolver(declaracao.caminhoFinalmente);
    }
    visitarDeclaracaoClasse(declaracao) {
        const enclosingClass = this.classeAtual;
        this.classeAtual = TipoClasse.CLASSE;
        this.declarar(declaracao.simbolo);
        this.definir(declaracao.simbolo);
        if (declaracao.superClasse !== null && declaracao.simbolo.lexema === declaracao.superClasse.simbolo.lexema) {
            const erro = new erro_resolvedor_1.ErroResolvedor(declaracao.simbolo, 'Uma classe não pode herdar de si mesma.');
            this.erros.push(erro);
        }
        if (declaracao.superClasse !== null) {
            this.classeAtual = TipoClasse.SUBCLASSE;
            this.resolver(declaracao.superClasse);
        }
        if (declaracao.superClasse !== null) {
            this.inicioDoEscopo();
            this.escopos.topoDaPilha()['super'] = true;
        }
        this.inicioDoEscopo();
        this.escopos.topoDaPilha()['isto'] = true;
        const metodos = declaracao.metodos;
        for (let i = 0; i < metodos.length; i++) {
            let declaracao = TipoFuncao.METODO;
            if (metodos[i].simbolo.lexema === 'isto') {
                declaracao = TipoFuncao.CONSTRUTOR;
            }
            this.resolverFuncao(metodos[i].funcao, declaracao);
        }
        this.finalDoEscopo();
        if (declaracao.superClasse !== null)
            this.finalDoEscopo();
        this.classeAtual = enclosingClass;
        return null;
    }
    visitarExpressaoSuper(expressao) {
        if (this.classeAtual === TipoClasse.NENHUM) {
            const erro = new erro_resolvedor_1.ErroResolvedor(expressao.simboloChave, "Não pode usar 'super' fora de uma classe.");
            this.erros.push(erro);
        }
        else if (this.classeAtual !== TipoClasse.SUBCLASSE) {
            const erro = new erro_resolvedor_1.ErroResolvedor(expressao.simboloChave, "Não se usa 'super' numa classe sem SuperClasse.");
            this.erros.push(erro);
        }
        this.resolverLocal(expressao, expressao.simboloChave);
        return null;
    }
    visitarExpressaoAcessoMetodo(expressao) {
        this.resolver(expressao.objeto);
        return null;
    }
    visitarDeclaracaoDeExpressao(declaracao) {
        this.resolver(declaracao.expressao);
        return null;
    }
    visitarDeclaracaoSe(declaracao) {
        this.resolver(declaracao.condicao);
        this.resolver(declaracao.caminhoEntao);
        for (let i = 0; i < declaracao.caminhosSeSenao.length; i++) {
            this.resolver(declaracao.caminhosSeSenao[i].condicao);
            this.resolver(declaracao.caminhosSeSenao[i].branch);
        }
        if (declaracao.caminhoSenao !== null)
            this.resolver(declaracao.caminhoSenao);
        return null;
    }
    visitarDeclaracaoImportar(declaracao) {
        this.resolver(declaracao.caminho);
    }
    visitarDeclaracaoEscreva(declaracao) {
        this.resolver(declaracao.expressao);
    }
    visitarExpressaoRetornar(declaracao) {
        if (this.funcaoAtual === TipoFuncao.NENHUM) {
            const erro = new erro_resolvedor_1.ErroResolvedor(declaracao.palavraChave, 'Não é possível retornar do código do escopo superior.');
            this.erros.push(erro);
        }
        if (declaracao.valor !== null) {
            if (this.funcaoAtual === TipoFuncao.CONSTRUTOR) {
                const erro = new erro_resolvedor_1.ErroResolvedor(declaracao.palavraChave, 'Não pode retornar o valor do construtor.');
                this.erros.push(erro);
            }
            this.resolver(declaracao.valor);
        }
        return null;
    }
    visitarDeclaracaoEscolha(declaracao) {
        const enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ESCOLHA;
        const caminhos = declaracao.caminhos;
        const caminhoPadrao = declaracao.caminhoPadrao;
        for (let i = 0; i < caminhos.length; i++) {
            this.resolver(caminhos[i]['declaracoes']);
        }
        if (caminhoPadrao !== null)
            this.resolver(caminhoPadrao['declaracoes']);
        this.cicloAtual = enclosingType;
    }
    visitarDeclaracaoEnquanto(declaracao) {
        this.resolver(declaracao.condicao);
        this.resolver(declaracao.corpo);
        return null;
    }
    visitarDeclaracaoPara(declaracao) {
        if (declaracao.inicializador !== null) {
            this.resolver(declaracao.inicializador);
        }
        if (declaracao.condicao !== null) {
            this.resolver(declaracao.condicao);
        }
        if (declaracao.incrementar !== null) {
            this.resolver(declaracao.incrementar);
        }
        const enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.ENQUANTO;
        this.resolver(declaracao.corpo);
        this.cicloAtual = enclosingType;
        return null;
    }
    visitarDeclaracaoFazer(declaracao) {
        this.resolver(declaracao.condicaoEnquanto);
        const enclosingType = this.cicloAtual;
        this.cicloAtual = LoopType.FAZER;
        this.resolver(declaracao.caminhoFazer);
        this.cicloAtual = enclosingType;
        return null;
    }
    visitarExpressaoBinaria(expressao) {
        this.resolver(expressao.esquerda);
        this.resolver(expressao.direita);
        return null;
    }
    visitarExpressaoDeChamada(expressao) {
        this.resolver(expressao.entidadeChamada);
        const argumentos = expressao.argumentos;
        for (let i = 0; i < argumentos.length; i++) {
            this.resolver(argumentos[i]);
        }
        return null;
    }
    visitarExpressaoAgrupamento(expressao) {
        this.resolver(expressao.expressao);
        return null;
    }
    visitarExpressaoDicionario(expressao) {
        for (let i = 0; i < expressao.chaves.length; i++) {
            this.resolver(expressao.chaves[i]);
            this.resolver(expressao.valores[i]);
        }
        return null;
    }
    visitarExpressaoVetor(expressao) {
        for (let i = 0; i < expressao.valores.length; i++) {
            this.resolver(expressao.valores[i]);
        }
        return null;
    }
    visitarExpressaoAcessoIndiceVariavel(expressao) {
        this.resolver(expressao.entidadeChamada);
        this.resolver(expressao.indice);
        return null;
    }
    visitarExpressaoContinua(declaracao) {
        return null;
    }
    visitarExpressaoSustar(declaracao) {
        return null;
    }
    visitarExpressaoAtribuicaoPorIndice(expressao) {
        return null;
    }
    visitarExpressaoLiteral(expressao) {
        return null;
    }
    visitarExpressaoLogica(expressao) {
        this.resolver(expressao.esquerda);
        this.resolver(expressao.direita);
        return null;
    }
    visitarExpressaoUnaria(expressao) {
        this.resolver(expressao.direita);
        return null;
    }
    visitarExpressaoDefinirValor(expressao) {
        this.resolver(expressao.valor);
        this.resolver(expressao.objeto);
        return null;
    }
    visitarExpressaoIsto(expressao) {
        if (this.classeAtual == TipoClasse.NENHUM) {
            const erro = new erro_resolvedor_1.ErroResolvedor(expressao.palavraChave, "Não pode usar 'isto' fora da classe.");
            this.erros.push(erro);
        }
        this.resolverLocal(expressao, expressao.palavraChave);
        return null;
    }
    resolver(declaracoes) {
        if (Array.isArray(declaracoes)) {
            for (let i = 0; i < declaracoes.length; i++) {
                if (declaracoes[i] && declaracoes[i].aceitar) {
                    declaracoes[i].aceitar(this);
                }
            }
        }
        else if (declaracoes) {
            declaracoes.aceitar(this);
        }
        return {
            erros: this.erros,
            locais: this.locais,
        };
    }
}
exports.ResolvedorEguaClassico = ResolvedorEguaClassico;
//# sourceMappingURL=resolvedor.js.map