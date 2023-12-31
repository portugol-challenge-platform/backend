"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoPortugolStudio = void 0;
const construtos_1 = require("../../construtos");
const declaracoes_1 = require("../../declaracoes");
const avaliador_sintatico_base_1 = require("../avaliador-sintatico-base");
const portugol_studio_1 = __importDefault(require("../../tipos-de-simbolos/portugol-studio"));
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 */
class AvaliadorSintaticoPortugolStudio extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
    validarEscopoPrograma(declaracoes) {
        this.consumir(portugol_studio_1.default.PROGRAMA, "Esperada expressão 'programa' para inicializar programa.");
        this.consumir(portugol_studio_1.default.CHAVE_ESQUERDA, "Esperada chave esquerda após expressão 'programa' para inicializar programa.");
        while (!this.estaNoFinal()) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        if (this.simbolos[this.atual - 1].tipo !== portugol_studio_1.default.CHAVE_DIREITA) {
            throw this.erro(this.simbolos[this.atual - 1], 'Esperado chave direita final para término do programa.');
        }
        const encontrarDeclaracaoInicio = declaracoes.filter((d) => d instanceof declaracoes_1.FuncaoDeclaracao && d.simbolo.lexema === 'inicio');
        if (encontrarDeclaracaoInicio.length <= 0) {
            throw this.erro(this.simbolos[0], "Função 'inicio()' para iniciar o programa não foi definida.");
        }
        // A última declaração do programa deve ser uma chamada a inicio()
        const declaracaoInicio = encontrarDeclaracaoInicio[0];
        declaracoes.push(new declaracoes_1.Expressao(new construtos_1.Chamada(declaracaoInicio.hashArquivo, declaracaoInicio.funcao, null, [])));
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.DIFERENTE, portugol_studio_1.default.IGUAL_IGUAL)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, simboloAnterior, direito);
        }
        return expressao;
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case portugol_studio_1.default.IDENTIFICADOR:
                const simboloIdentificador = this.avancarEDevolverAnterior();
                // Se o próximo símbolo é um incremento ou um decremento,
                // aqui deve retornar um unário correspondente.
                // Caso contrário, apenas retornar um construto de variável.
                if (this.simbolos[this.atual] &&
                    [portugol_studio_1.default.INCREMENTAR, portugol_studio_1.default.DECREMENTAR].includes(this.simbolos[this.atual].tipo)) {
                    const simboloIncrementoDecremento = this.avancarEDevolverAnterior();
                    return new construtos_1.Unario(this.hashArquivo, simboloIncrementoDecremento, new construtos_1.Variavel(this.hashArquivo, simboloIdentificador), 'DEPOIS');
                }
                return new construtos_1.Variavel(this.hashArquivo, simboloIdentificador);
            case portugol_studio_1.default.PARENTESE_ESQUERDO:
                this.avancarEDevolverAnterior();
                const expressao = this.expressao();
                this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
            case portugol_studio_1.default.CADEIA:
            case portugol_studio_1.default.CARACTER:
            case portugol_studio_1.default.INTEIRO:
            case portugol_studio_1.default.REAL:
                const simboloVariavel = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloVariavel.linha), simboloVariavel.literal);
        }
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.COLCHETE_ESQUERDO)) {
                const indices = [];
                do {
                    indices.push(this.expressao());
                } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
                const indice = indices[0];
                const simboloFechamento = this.consumir(portugol_studio_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    atribuir() {
        const expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
            const setaAtribuicao = this.simbolos[this.atual - 1];
            const valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoPorIndice(this.hashArquivo, expressao.linha, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(setaAtribuicao, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    declaracaoEscreva() {
        const simboloAtual = this.avancarEDevolverAnterior();
        this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    blocoEscopo() {
        this.consumir(portugol_studio_1.default.CHAVE_ESQUERDA, "Esperado '}' antes do bloco.");
        let declaracoes = [];
        while (!this.verificarTipoSimboloAtual(portugol_studio_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            const declaracaoOuVetor = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(declaracaoOuVetor)) {
                declaracoes = declaracoes.concat(declaracaoOuVetor);
            }
            else {
                declaracoes.push(declaracaoOuVetor);
            }
        }
        this.consumir(portugol_studio_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    }
    declaracaoSe() {
        this.avancarEDevolverAnterior();
        this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        const condicao = this.expressao();
        this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        const caminhoEntao = this.resolverDeclaracaoForaDeBloco();
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.SENAO)) {
            caminhoSenao = this.resolverDeclaracaoForaDeBloco();
        }
        return new declaracoes_1.Se(condicao, caminhoEntao, [], caminhoSenao);
    }
    declaracaoEnquanto() {
        try {
            this.avancarEDevolverAnterior();
            this.blocos += 1;
            this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            const condicao = this.expressao();
            this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após condição.");
            const corpo = this.resolverDeclaracaoForaDeBloco();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoEscolha() {
        throw new Error('Método não implementado.');
    }
    /**
     * No Portugol Studio, a palavra reservada é `faca`, sem acento.
     */
    declaracaoFazer() {
        const simboloFaca = this.avancarEDevolverAnterior();
        try {
            this.blocos += 1;
            const caminhoFazer = this.resolverDeclaracaoForaDeBloco();
            this.consumir(portugol_studio_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            const condicaoEnquanto = this.expressao();
            this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(simboloFaca.hashArquivo, Number(simboloFaca.linha), caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.blocos -= 1;
        }
    }
    logicaComumParametros() {
        const parametros = [];
        do {
            if (parametros.length >= 255) {
                this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 parâmetros');
            }
            const parametro = {
                abrangencia: 'padrao',
            };
            if (!this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.CADEIA, portugol_studio_1.default.REAL, portugol_studio_1.default.INTEIRO)) {
                throw this.erro(this.simbolos[this.atual], 'Esperado tipo de parâmetro válido para declaração de função.');
            }
            parametro.nome = this.consumir(portugol_studio_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
            // Em Portugol Studio, um parâmetro múltiplo é terminado por abre e fecha colchetes.
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.COLCHETE_ESQUERDO)) {
                this.consumir(portugol_studio_1.default.COLCHETE_DIREITO, 'Esperado colchete direito após colchete esquerdo ao definir parâmetro múltiplo em função.');
                parametro.abrangencia = 'multiplo';
            }
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
                parametro.valorPadrao = this.primario();
            }
            parametros.push(parametro);
            if (parametro.abrangencia === 'multiplo')
                break;
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        return parametros;
    }
    corpoDaFuncao(tipo) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        const parenteseEsquerdo = this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${tipo}.`);
        let parametros = [];
        if (!this.verificarTipoSimboloAtual(portugol_studio_1.default.PARENTESE_DIREITO)) {
            parametros = this.logicaComumParametros();
        }
        this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(parenteseEsquerdo.linha), parametros, corpo);
    }
    /**
     * Declaração de apenas uma variável.
     * Neste caso, o símbolo que determina o tipo da variável já foi consumido,
     * e o retorno conta com apenas uma variável retornada.
     */
    declaracaoDeVariavel() {
        switch (this.simboloAnterior().tipo) {
            case portugol_studio_1.default.INTEIRO:
                const identificador = this.consumir(portugol_studio_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'inteiro'.");
                this.consumir(portugol_studio_1.default.IGUAL, 'Esperado símbolo igual para inicialização de variável.');
                const literalInicializacao = this.consumir(portugol_studio_1.default.INTEIRO, 'Esperado literal inteiro após símbolo de igual em declaração de variável.');
                const valorInicializacao = Number(literalInicializacao.literal);
                return new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(literalInicializacao.linha), valorInicializacao));
        }
    }
    declaracaoCadeiasCaracteres() {
        const simboloCadeia = this.consumir(portugol_studio_1.default.CADEIA, '');
        const inicializacoes = [];
        do {
            const identificador = this.consumir(portugol_studio_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'cadeia'.");
            // Inicializações de variáveis podem ter valores definidos.
            let valorInicializacao = 0;
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
                const literalInicializacao = this.consumir(portugol_studio_1.default.CADEIA, 'Esperado literal de cadeia de caracteres após símbolo de igual em declaração de variável.');
                valorInicializacao = Number(literalInicializacao.literal);
            }
            inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloCadeia.linha), 0)));
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        return inicializacoes;
    }
    declaracaoCaracteres() {
        const simboloCaracter = this.consumir(portugol_studio_1.default.CARACTER, '');
        const inicializacoes = [];
        do {
            const identificador = this.consumir(portugol_studio_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'caracter'.");
            // Inicializações de variáveis podem ter valores definidos.
            let valorInicializacao = 0;
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
                const literalInicializacao = this.consumir(portugol_studio_1.default.CARACTER, 'Esperado literal de caracter após símbolo de igual em declaração de variável.');
                valorInicializacao = Number(literalInicializacao.literal);
            }
            inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloCaracter.linha), 0)));
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        return inicializacoes;
    }
    declaracaoExpressao() {
        const expressao = this.expressao();
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.PONTO_E_VIRGULA);
        return new declaracoes_1.Expressao(expressao);
    }
    declaracaoVetorInteiros(simboloInteiro, identificador, posicoes) {
        let valorInicializacao = new construtos_1.Vetor(this.hashArquivo, Number(simboloInteiro.linha), []);
        if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
            this.consumir(portugol_studio_1.default.CHAVE_ESQUERDA, 'Esperado chave esquerda após sinal de igual em lado direito da atribuição de vetor.');
            const valores = [];
            do {
                valores.push(this.primario());
            } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
            this.consumir(portugol_studio_1.default.CHAVE_DIREITA, 'Esperado chave direita após valores de vetor em lado direito da atribuição de vetor.');
            if (posicoes !== valores.length) {
                throw this.erro(simboloInteiro, `Esperado ${posicoes} números, mas foram fornecidos ${valores.length} valores do lado direito da atribuição.`);
            }
            valorInicializacao.valores = valores;
        }
        return new declaracoes_1.Var(identificador, valorInicializacao);
    }
    declaracaoTrivialInteiro(simboloInteiro, identificador) {
        // Inicializações de variáveis podem ter valores definidos.
        let valorInicializacao = new construtos_1.Literal(this.hashArquivo, Number(simboloInteiro.linha), 0);
        if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
            valorInicializacao = this.expressao();
        }
        return new declaracoes_1.Var(identificador, valorInicializacao);
    }
    declaracaoInteiros() {
        const simboloInteiro = this.consumir(portugol_studio_1.default.INTEIRO, '');
        const inicializacoes = [];
        do {
            const identificador = this.consumir(portugol_studio_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'inteiro'.");
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.COLCHETE_ESQUERDO)) {
                // TODO
                const numeroPosicoes = this.consumir(portugol_studio_1.default.INTEIRO, 'Esperado número inteiro para definir quantas posições terá o vetor.');
                this.consumir(portugol_studio_1.default.COLCHETE_DIREITO, 'Esperado fechamento de identificação de número de posições de uma declaração de vetor.');
                inicializacoes.push(this.declaracaoVetorInteiros(simboloInteiro, identificador, Number(numeroPosicoes.literal)));
            }
            else {
                inicializacoes.push(this.declaracaoTrivialInteiro(simboloInteiro, identificador));
            }
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        return inicializacoes;
    }
    /**
     * Análise de uma declaração `leia()`. No VisuAlg, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia() {
        const simboloLeia = this.avancarEDevolverAnterior();
        this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes do argumento em instrução `leia`.");
        const argumentos = [];
        do {
            argumentos.push(this.resolverDeclaracaoForaDeBloco());
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após o argumento em instrução `leia`.");
        return new declaracoes_1.Leia(simboloLeia, argumentos);
    }
    declaracaoLogicos() {
        const simboloLogico = this.consumir(portugol_studio_1.default.LOGICO, '');
        const inicializacoes = [];
        do {
            const identificador = this.consumir(portugol_studio_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'logico'.");
            // Inicializações de variáveis podem ter valores definidos.
            let valorInicializacao = 0;
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
                if (![portugol_studio_1.default.VERDADEIRO, portugol_studio_1.default.FALSO].includes(this.simbolos[this.atual].tipo)) {
                    throw this.erro(this.simbolos[this.atual], 'Esperado literal verdadeiro ou falso após símbolo de igual em declaração de variável.');
                }
                const literalInicializacao = this.avancarEDevolverAnterior();
                valorInicializacao = Number(literalInicializacao.literal);
            }
            inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloLogico.linha), 0)));
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        return inicializacoes;
    }
    declaracaoPara() {
        try {
            const simboloPara = this.avancarEDevolverAnterior();
            this.blocos += 1;
            this.consumir(portugol_studio_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            let inicializador;
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.INTEIRO)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            let condicao = null;
            if (!this.verificarTipoSimboloAtual(portugol_studio_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            let incrementar = null;
            if (!this.verificarTipoSimboloAtual(portugol_studio_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
                this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.INCREMENTAR, portugol_studio_1.default.DECREMENTAR);
            }
            this.consumir(portugol_studio_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            const corpo = this.resolverDeclaracaoForaDeBloco();
            return new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoReais() {
        const simboloReal = this.consumir(portugol_studio_1.default.REAL, '');
        const inicializacoes = [];
        do {
            const identificador = this.consumir(portugol_studio_1.default.IDENTIFICADOR, "Esperado identificador após palavra reservada 'real'.");
            // Inicializações de variáveis podem ter valores definidos.
            let valorInicializacao = 0;
            if (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.IGUAL)) {
                const literalInicializacao = this.consumir(portugol_studio_1.default.REAL, 'Esperado literal real após símbolo de igual em declaração de variável.');
                valorInicializacao = Number(literalInicializacao.literal);
            }
            inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(simboloReal.linha), 0)));
        } while (this.verificarSeSimboloAtualEIgualA(portugol_studio_1.default.VIRGULA));
        return inicializacoes;
    }
    expressao() {
        // if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.LEIA)) return this.declaracaoLeia();
        return this.atribuir();
    }
    funcao(tipo) {
        const simboloFuncao = this.avancarEDevolverAnterior();
        // No Portugol Studio, se temos um símbolo de tipo após `função`,
        // teremos um retorno no corpo da função.
        if ([
            portugol_studio_1.default.REAL,
            portugol_studio_1.default.INTEIRO,
            portugol_studio_1.default.CADEIA,
            portugol_studio_1.default.CARACTER,
            portugol_studio_1.default.LOGICO,
        ].includes(this.simbolos[this.atual].tipo)) {
            // Por enquanto apenas consumimos o símbolo sem ações adicionais.
            this.avancarEDevolverAnterior();
        }
        const nomeFuncao = this.consumir(portugol_studio_1.default.IDENTIFICADOR, `Esperado nome ${tipo}.`);
        return new declaracoes_1.FuncaoDeclaracao(nomeFuncao, this.corpoDaFuncao(tipo));
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case portugol_studio_1.default.CADEIA:
                return this.declaracaoCadeiasCaracteres();
            case portugol_studio_1.default.CARACTER:
                return this.declaracaoCaracteres();
            case portugol_studio_1.default.CHAVE_ESQUERDA:
                const simboloInicioBloco = this.simbolos[this.atual];
                return new declaracoes_1.Bloco(simboloInicioBloco.hashArquivo, Number(simboloInicioBloco.linha), this.blocoEscopo());
            case portugol_studio_1.default.ENQUANTO:
                return this.declaracaoEnquanto();
            case portugol_studio_1.default.ESCREVA:
                return this.declaracaoEscreva();
            case portugol_studio_1.default.FACA:
                return this.declaracaoFazer();
            case portugol_studio_1.default.FUNCAO:
                return this.funcao('funcao');
            case portugol_studio_1.default.INTEIRO:
                return this.declaracaoInteiros();
            case portugol_studio_1.default.LEIA:
                return this.declaracaoLeia();
            case portugol_studio_1.default.LOGICO:
                return this.declaracaoLogicos();
            case portugol_studio_1.default.PARA:
                return this.declaracaoPara();
            case portugol_studio_1.default.PROGRAMA:
            case portugol_studio_1.default.CHAVE_DIREITA:
                this.avancarEDevolverAnterior();
                return null;
            case portugol_studio_1.default.REAL:
                return this.declaracaoReais();
            case portugol_studio_1.default.SE:
                return this.declaracaoSe();
            default:
                return this.declaracaoExpressao();
        }
    }
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        const declaracoes = [];
        this.validarEscopoPrograma(declaracoes);
        return {
            declaracoes: declaracoes.filter((d) => d),
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoPortugolStudio = AvaliadorSintaticoPortugolStudio;
//# sourceMappingURL=avaliador-sintatico-portugol-studio.js.map