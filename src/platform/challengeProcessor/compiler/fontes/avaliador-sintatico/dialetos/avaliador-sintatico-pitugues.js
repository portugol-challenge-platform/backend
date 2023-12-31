"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoPitugues = void 0;
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const construtos_1 = require("../../construtos");
const declaracoes_1 = require("../../declaracoes");
const erro_avaliador_sintatico_1 = require("../erro-avaliador-sintatico");
const pitugues_1 = __importDefault(require("../../tipos-de-simbolos/pitugues"));
const lexador_1 = require("../../lexador");
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 *
 * A grande diferença entre este avaliador e os demais é a forma como são entendidos os blocos de escopo.
 * Este avaliador espera uma estrutura de pragmas, que explica quantos espaços há na frente de cada linha.
 */
class AvaliadorSintaticoPitugues {
    constructor(performance = false) {
        this.atual = 0;
        this.blocos = 0;
        this.performance = performance;
        this.escopos = [];
    }
    declaracaoDeConstantes() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeVariavel() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeVariaveis() {
        const identificadores = [];
        let retorno = [];
        do {
            identificadores.push(this.consumir(pitugues_1.default.IDENTIFICADOR, 'Esperado nome de variável.'));
        } while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VIRGULA));
        if (!this.verificarSeSimboloAtualEIgualA(pitugues_1.default.IGUAL)) {
            for (let [indice, identificador] of identificadores.entries()) {
                retorno.push(new declaracoes_1.Var(identificador, null));
            }
            this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PONTO_E_VIRGULA);
            return retorno;
        }
        //this.consumir(tiposDeSimbolos.IGUAL, "Esperado '=' após identificador em instrução 'var'.");
        const inicializadores = [];
        do {
            inicializadores.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VIRGULA));
        if (identificadores.length !== inicializadores.length) {
            throw this.erro(this.simboloAtual(), 'Quantidade de identificadores à esquerda do igual é diferente da quantidade de valores à direita.');
        }
        for (let [indice, identificador] of identificadores.entries()) {
            retorno.push(new declaracoes_1.Var(identificador, inicializadores[indice]));
        }
        this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PONTO_E_VIRGULA);
        return retorno;
    }
    sincronizar() {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            switch (this.simboloAtual().tipo) {
                case pitugues_1.default.CLASSE:
                case pitugues_1.default.FUNCAO:
                case pitugues_1.default.FUNÇÃO:
                case pitugues_1.default.VARIAVEL:
                case pitugues_1.default.PARA:
                case pitugues_1.default.SE:
                case pitugues_1.default.ENQUANTO:
                case pitugues_1.default.ESCREVA:
                case pitugues_1.default.RETORNA:
                    return;
            }
            this.avancarEDevolverAnterior();
        }
    }
    erro(simbolo, mensagemDeErro) {
        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }
    consumir(tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simboloAtual(), mensagemDeErro);
    }
    verificarTipoSimboloAtual(tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simboloAtual().tipo === tipo;
    }
    verificarTipoProximoSimbolo(tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual + 1].tipo === tipo;
    }
    simboloAtual() {
        return this.simbolos[this.atual];
    }
    simboloAnterior() {
        return this.simbolos[this.atual - 1];
    }
    simboloNaPosicao(posicao) {
        return this.simbolos[this.atual + posicao];
    }
    estaNoFinal() {
        return this.atual >= this.simbolos.length;
    }
    avancarEDevolverAnterior() {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simboloAnterior();
    }
    verificarSeSimboloAtualEIgualA(...argumentos) {
        for (let i = 0; i < argumentos.length; i++) {
            const tipoAtual = argumentos[i];
            if (this.verificarTipoSimboloAtual(tipoAtual)) {
                this.avancarEDevolverAnterior();
                return true;
            }
        }
        return false;
    }
    primario() {
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.SUPER)) {
            const simboloChave = this.simboloAnterior();
            this.consumir(pitugues_1.default.PONTO, "Esperado '.' após 'super'.");
            const metodo = this.consumir(pitugues_1.default.IDENTIFICADOR, 'Esperado nome do método da Superclasse.');
            return new construtos_1.Super(this.hashArquivo, simboloChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.COLCHETE_ESQUERDO)) {
            const valores = [];
            if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor(this.hashArquivo, 0, []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(pitugues_1.default.COLCHETE_DIREITO)) {
                const valor = this.atribuir();
                valores.push(valor);
                if (this.simboloAtual().tipo !== pitugues_1.default.COLCHETE_DIREITO) {
                    this.consumir(pitugues_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Vetor(this.hashArquivo, 0, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.CHAVE_ESQUERDA)) {
            const chaves = [];
            const valores = [];
            if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario(this.hashArquivo, 0, [], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(pitugues_1.default.CHAVE_DIREITA)) {
                const chave = this.atribuir();
                this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                const valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simboloAtual().tipo !== pitugues_1.default.CHAVE_DIREITA) {
                    this.consumir(pitugues_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Dicionario(this.hashArquivo, 0, chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.FALSO))
            return new construtos_1.Literal(this.hashArquivo, 0, false);
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VERDADEIRO))
            return new construtos_1.Literal(this.hashArquivo, 0, true);
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.NULO))
            return new construtos_1.Literal(this.hashArquivo, 0, null);
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.ISTO))
            return new construtos_1.Isto(this.hashArquivo, 0, this.simboloAnterior());
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.NUMERO, pitugues_1.default.TEXTO)) {
            const simboloAnterior = this.simboloAnterior();
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simboloAnterior());
        }
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PARENTESE_ESQUERDO)) {
            const expressao = this.expressao();
            this.consumir(pitugues_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, 0, expressao);
        }
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), 'Esperado expressão.');
    }
    finalizarChamada(entidadeChamada) {
        const argumentos = [];
        if (!this.verificarTipoSimboloAtual(pitugues_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simboloAtual(), 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VIRGULA));
        }
        const parenteseDireito = this.consumir(pitugues_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos);
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PONTO)) {
                const nome = this.consumir(pitugues_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(this.hashArquivo, expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.COLCHETE_ESQUERDO)) {
                const indice = this.expressao();
                const simboloFechamento = this.consumir(pitugues_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    unario() {
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.NEGACAO, pitugues_1.default.SUBTRACAO, pitugues_1.default.BIT_NOT)) {
            const operador = this.simboloAnterior();
            const direito = this.unario();
            return new construtos_1.Unario(this.hashArquivo, operador, direito);
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.EXPONENCIACAO)) {
            const operador = this.simboloAnterior();
            const direito = this.unario();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.DIVISAO, pitugues_1.default.DIVISAO_INTEIRA, pitugues_1.default.MULTIPLICACAO, pitugues_1.default.MODULO)) {
            const operador = this.simboloAnterior();
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    adicaoOuSubtracao() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.SUBTRACAO, pitugues_1.default.ADICAO)) {
            const operador = this.simboloAnterior();
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitShift() {
        let expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.MENOR_MENOR, pitugues_1.default.MAIOR_MAIOR)) {
            const operador = this.simboloAnterior();
            const direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitE() {
        let expressao = this.bitShift();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.BIT_AND)) {
            const operador = this.simboloAnterior();
            const direito = this.bitShift();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitOu() {
        let expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.BIT_OR, pitugues_1.default.BIT_XOR)) {
            const operador = this.simboloAnterior();
            const direito = this.bitE();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparar() {
        let expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.MAIOR, pitugues_1.default.MAIOR_IGUAL, pitugues_1.default.MENOR, pitugues_1.default.MENOR_IGUAL)) {
            const operador = this.simboloAnterior();
            const direito = this.bitOu();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.DIFERENTE, pitugues_1.default.IGUAL_IGUAL)) {
            const operador = this.simboloAnterior();
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    em() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.EM)) {
            const operador = this.simboloAnterior();
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    e() {
        let expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.E)) {
            const operador = this.simboloAnterior();
            const direito = this.em();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.OU)) {
            const operador = this.simboloAnterior();
            const direito = this.e();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    atribuir() {
        const expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.IGUAL) ||
            this.verificarSeSimboloAtualEIgualA(pitugues_1.default.MAIS_IGUAL)) {
            const igual = this.simboloAnterior();
            const valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                return new construtos_1.DefinirValor(this.hashArquivo, 0, expressao.objeto, expressao.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoPorIndice(this.hashArquivo, 0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    expressao() {
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.LEIA))
            return this.declaracaoLeia();
        return this.atribuir();
    }
    declaracaoEscreva() {
        const simboloAtual = this.simboloAtual();
        this.consumir(pitugues_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VIRGULA));
        this.consumir(pitugues_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    declaracaoExpressao() {
        const expressao = this.expressao();
        return new declaracoes_1.Expressao(expressao);
    }
    declaracaoLeia() {
        const simboloLeia = this.simbolos[this.atual];
        this.consumir(pitugues_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em leia.");
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VIRGULA));
        this.consumir(pitugues_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em leia.");
        return new declaracoes_1.Leia(simboloLeia, argumentos);
    }
    blocoEscopo() {
        let declaracoes = [];
        let simboloAtual = this.simboloAtual();
        const simboloAnterior = this.simboloAnterior();
        // Situação 1: não tem bloco de escopo.
        //
        // Exemplo: `se verdadeiro: escreva('Alguma coisa')`.
        // Neste caso, linha do símbolo atual é igual à linha do símbolo anterior.
        if (simboloAtual.linha === simboloAnterior.linha) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        else {
            // Situação 2: símbolo atual fica na próxima linha.
            //
            // Verifica-se o número de espaços à esquerda da linha através dos pragmas.
            // Se número de espaços da linha do símbolo atual é menor ou igual ao número de espaços
            // da linha anterior, e bloco ainda não começou, é uma situação de erro.
            let espacosIndentacaoLinhaAtual = this.pragmas[simboloAtual.linha].espacosIndentacao;
            const espacosIndentacaoLinhaAnterior = this.pragmas[simboloAnterior.linha].espacosIndentacao;
            if (espacosIndentacaoLinhaAtual <= espacosIndentacaoLinhaAnterior) {
                this.erro(simboloAtual, `Indentação inconsistente na linha ${simboloAtual.linha}. ` +
                    `Esperado: >= ${espacosIndentacaoLinhaAnterior}. ` +
                    `Atual: ${espacosIndentacaoLinhaAtual}`);
            }
            else {
                // Indentação ok, é um bloco de escopo.
                // Inclui todas as declarações cujas linhas tenham o mesmo número de espaços
                // de indentação do bloco.
                // Se `simboloAtual` for definido em algum momento como indefinido,
                // Significa que o código acabou, então o bloco também acabou.
                const espacosIndentacaoBloco = espacosIndentacaoLinhaAtual;
                while (espacosIndentacaoLinhaAtual === espacosIndentacaoBloco) {
                    const retornoDeclaracao = this.resolverDeclaracaoForaDeBloco();
                    if (Array.isArray(retornoDeclaracao)) {
                        declaracoes = declaracoes.concat(retornoDeclaracao);
                    }
                    else {
                        declaracoes.push(retornoDeclaracao);
                    }
                    simboloAtual = this.simboloAtual();
                    if (!simboloAtual)
                        break;
                    espacosIndentacaoLinhaAtual = this.pragmas[simboloAtual.linha].espacosIndentacao;
                }
            }
        }
        return declaracoes;
    }
    declaracaoEnquanto() {
        try {
            this.blocos += 1;
            const condicao = this.expressao();
            const bloco = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, bloco);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoEscolha() {
        try {
            this.blocos += 1;
            const condicao = this.expressao();
            this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após 'escolha'.");
            const caminhos = [];
            let caminhoPadrao = null;
            while (!this.estaNoFinal() &&
                [pitugues_1.default.CASO, pitugues_1.default.PADRAO].includes(this.simbolos[this.atual].tipo)) {
                if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.CASO)) {
                    const caminhoCondicoes = [this.expressao()];
                    this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(pitugues_1.default.CASO)) {
                        this.consumir(pitugues_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    // Como dois-pontos é um símbolo usado para conferir se há um início de bloco,
                    // não podemos simplesmente chamar `this.resolverDeclaracao()` porque o dois-pontos já
                    // foi consumido na verificação.
                    // Outro problema é que, aparentemente, o Interpretador não espera um Bloco, e sim
                    // um vetor de Declaracao, o qual obtemos com `this.blocoEscopo()`.
                    const declaracoes = this.blocoEscopo();
                    caminhos.push({
                        condicoes: caminhoCondicoes,
                        declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simboloAtual(), "Você só pode ter um caminho padrão em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    // Como dois-pontos é um símbolo usado para conferir se há um início de bloco,
                    // não podemos simplesmente chamar `this.resolverDeclaracao()` porque o dois-pontos já
                    // foi consumido na verificação.
                    // Outro problema é que, aparentemente, o Interpretador não espera um Bloco, e sim
                    // um vetor de Declaracao, o qual obtemos com `this.blocoEscopo()`.
                    const declaracoes = this.blocoEscopo();
                    caminhoPadrao = {
                        declaracoes,
                    };
                }
            }
            return new declaracoes_1.Escolha(condicao, caminhos, caminhoPadrao);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoPara() {
        try {
            const simboloPara = this.simboloAnterior();
            this.blocos += 1;
            let inicializador;
            if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariaveis();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            let condicao = null;
            if (!this.verificarTipoSimboloAtual(pitugues_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            let incrementar = null;
            if (this.simbolos[this.atual].tipo !== pitugues_1.default.DOIS_PONTOS) {
                incrementar = this.expressao();
            }
            const corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        catch (erro) {
            throw erro;
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoSe() {
        const condicao = this.expressao();
        const caminhoEntao = this.resolverDeclaracao();
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.SENAO, pitugues_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, caminhoEntao, [], caminhoSenao);
    }
    declaracaoSustar() {
        if (this.blocos < 1) {
            this.erro(this.simboloAnterior(), "'sustar' deve estar dentro de um laço de repetição.");
        }
        return new declaracoes_1.Sustar(this.simboloAtual());
    }
    declaracaoContinua() {
        if (this.blocos < 1) {
            this.erro(this.simboloAnterior(), "'continua' precisa estar em um laço de repetição.");
        }
        return new declaracoes_1.Continua(this.simboloAtual());
    }
    declaracaoRetorna() {
        const palavraChave = this.simboloAnterior();
        let valor = null;
        if (!this.verificarTipoSimboloAtual(pitugues_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(palavraChave, valor);
    }
    declaracaoImportar() {
        this.consumir(pitugues_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        const caminho = this.expressao();
        const simboloFechamento = this.consumir(pitugues_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    }
    declaracaoTente() {
        const simboloTente = this.simboloAnterior();
        this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'tente'.");
        const blocoTente = this.blocoEscopo();
        let blocoPegue = null;
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.PEGUE)) {
            this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'pegue'.");
            blocoPegue = this.blocoEscopo();
        }
        let blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.SENAO, pitugues_1.default.SENÃO)) {
            this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'senão'.");
            blocoSenao = this.blocoEscopo();
        }
        let blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.FINALMENTE)) {
            this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' após a declaração 'pegue'.");
            blocoFinalmente = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(simboloTente.hashArquivo, Number(simboloTente.linha), blocoTente, blocoPegue, blocoSenao, blocoFinalmente);
    }
    declaracaoFazer() {
        const simboloFazer = this.simboloAnterior();
        try {
            this.blocos += 1;
            const declaracaoOuBlocoFazer = this.resolverDeclaracao();
            this.consumir(pitugues_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo da declaração 'fazer'.");
            const condicaoEnquanto = this.expressao();
            return new declaracoes_1.Fazer(simboloFazer.hashArquivo, Number(simboloFazer.linha), declaracaoOuBlocoFazer, condicaoEnquanto);
        }
        finally {
            this.blocos -= 1;
        }
    }
    resolverDeclaracao() {
        switch (this.simbolos[this.atual].tipo) {
            case pitugues_1.default.CONSTANTE:
                this.avancarEDevolverAnterior();
                return this.declaracaoDeConstantes();
            case pitugues_1.default.CONTINUA:
                this.avancarEDevolverAnterior();
                return this.declaracaoContinua();
            case pitugues_1.default.DOIS_PONTOS:
                this.avancarEDevolverAnterior();
                const simboloInicioBloco = this.simboloAnterior();
                return new declaracoes_1.Bloco(simboloInicioBloco.hashArquivo, Number(simboloInicioBloco.linha), this.blocoEscopo());
            case pitugues_1.default.ENQUANTO:
                this.avancarEDevolverAnterior();
                return this.declaracaoEnquanto();
            case pitugues_1.default.ESCOLHA:
                this.avancarEDevolverAnterior();
                return this.declaracaoEscolha();
            case pitugues_1.default.ESCREVA:
                this.avancarEDevolverAnterior();
                return this.declaracaoEscreva();
            case pitugues_1.default.FALHAR:
                this.avancarEDevolverAnterior();
                return this.declaracaoFalhar();
            case pitugues_1.default.FAZER:
                this.avancarEDevolverAnterior();
                return this.declaracaoFazer();
            case pitugues_1.default.PARA:
                this.avancarEDevolverAnterior();
                return this.declaracaoPara();
            case pitugues_1.default.PAUSA:
            case pitugues_1.default.SUSTAR:
                this.avancarEDevolverAnterior();
                return this.declaracaoSustar();
            case pitugues_1.default.SE:
                this.avancarEDevolverAnterior();
                return this.declaracaoSe();
            case pitugues_1.default.RETORNA:
                this.avancarEDevolverAnterior();
                return this.declaracaoRetorna();
            case pitugues_1.default.TENTE:
                this.avancarEDevolverAnterior();
                return this.declaracaoTente();
            case pitugues_1.default.VARIAVEL:
                this.avancarEDevolverAnterior();
                return this.declaracaoDeVariaveis();
        }
        /* if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.FAZER)) return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.TENTE)) return this.declaracaoTente();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ESCOLHA)) return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.RETORNA)) return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.CONTINUA)) return this.declaracaoContinua();
        if (
            this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.SUSTAR) ||
            this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PAUSA)
        )
            return this.declaracaoSustar();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PARA)) return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ENQUANTO)) return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.SE)) return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.ESCREVA)) return this.declaracaoEscreva();
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.DOIS_PONTOS)) {
            const simboloInicioBloco: SimboloInterface = this.simboloAnterior();
            return new Bloco(simboloInicioBloco.hashArquivo, Number(simboloInicioBloco.linha), this.blocoEscopo());
        } */
        return this.declaracaoExpressao();
    }
    funcao(tipo, construtor) {
        const simbolo = !construtor
            ? this.consumir(pitugues_1.default.IDENTIFICADOR, `Esperado nome ${tipo}.`)
            : new lexador_1.Simbolo(pitugues_1.default.CONSTRUTOR, 'construtor', null, -1, -1);
        return new declaracoes_1.FuncaoDeclaracao(simbolo, this.corpoDaFuncao(tipo));
    }
    logicaComumParametros() {
        const parametros = [];
        do {
            if (parametros.length >= 255) {
                this.erro(this.simboloAtual(), 'Não pode haver mais de 255 parâmetros');
            }
            const parametro = {};
            if (this.simboloAtual().tipo === pitugues_1.default.MULTIPLICACAO) {
                this.consumir(pitugues_1.default.MULTIPLICACAO, null);
                parametro['tipo'] = 'multiplo';
            }
            else {
                parametro['tipo'] = 'padrao';
            }
            parametro['nome'] = this.consumir(pitugues_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
            if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.IGUAL)) {
                parametro['valorPadrao'] = this.primario();
            }
            parametros.push(parametro);
            if (parametro['tipo'] === 'multiplo')
                break;
        } while (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.VIRGULA));
        return parametros;
    }
    corpoDaFuncao(tipo) {
        this.consumir(pitugues_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${tipo}.`);
        let parametros = [];
        if (!this.verificarTipoSimboloAtual(pitugues_1.default.PARENTESE_DIREITO)) {
            parametros = this.logicaComumParametros();
        }
        this.consumir(pitugues_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(pitugues_1.default.DOIS_PONTOS, `Esperado ':' antes do escopo do ${tipo}.`);
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, 0, parametros, corpo);
    }
    declaracaoDeClasse() {
        const simbolo = this.consumir(pitugues_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        let superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.HERDA)) {
            this.consumir(pitugues_1.default.IDENTIFICADOR, 'Esperado nome da Superclasse.');
            superClasse = new construtos_1.Variavel(this.hashArquivo, this.simboloAnterior());
        }
        this.consumir(pitugues_1.default.DOIS_PONTOS, "Esperado ':' antes do escopo da classe.");
        const metodos = [];
        while (!this.estaNoFinal() &&
            this.verificarSeSimboloAtualEIgualA(pitugues_1.default.CONSTRUTOR, pitugues_1.default.FUNCAO, pitugues_1.default.FUNÇÃO)) {
            metodos.push(this.funcao('método', this.simbolos[this.atual - 1].tipo === pitugues_1.default.CONSTRUTOR));
        }
        return new declaracoes_1.Classe(simbolo, superClasse, metodos);
    }
    declaracaoFalhar() {
        const simboloFalha = this.simbolos[this.atual - 1];
        const textoFalha = this.consumir(pitugues_1.default.TEXTO, 'Esperado texto para explicar falha.');
        return new declaracoes_1.Falhar(simboloFalha, textoFalha.literal);
    }
    /**
     * Consome o símbolo atual, verificando se é uma declaração de função, variável, classe
     * ou uma expressão.
     * @returns Objeto do tipo `Declaracao`.
     */
    resolverDeclaracaoForaDeBloco() {
        try {
            if ((this.verificarTipoSimboloAtual(pitugues_1.default.FUNCAO) ||
                this.verificarTipoSimboloAtual(pitugues_1.default.FUNÇÃO)) &&
                this.verificarTipoProximoSimbolo(pitugues_1.default.IDENTIFICADOR)) {
                this.avancarEDevolverAnterior();
                return this.funcao('funcao');
            }
            if (this.verificarSeSimboloAtualEIgualA(pitugues_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    }
    analisar(retornoLexador, hashArquivo) {
        const inicioAnalise = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.escopos = [];
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        this.pragmas = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.pragmas) || {};
        let declaracoes = [];
        while (!this.estaNoFinal()) {
            const retornoDeclaracao = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(retornoDeclaracao)) {
                declaracoes = declaracoes.concat(retornoDeclaracao);
            }
            else {
                declaracoes.push(retornoDeclaracao);
            }
        }
        if (this.performance) {
            const deltaAnalise = (0, browser_process_hrtime_1.default)(inicioAnalise);
            console.log(`[Avaliador Sintático] Tempo para análise: ${deltaAnalise[0] * 1e9 + deltaAnalise[1]}ns`);
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoPitugues = AvaliadorSintaticoPitugues;
//# sourceMappingURL=avaliador-sintatico-pitugues.js.map