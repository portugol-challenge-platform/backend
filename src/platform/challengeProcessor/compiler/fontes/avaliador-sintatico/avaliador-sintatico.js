"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintatico = void 0;
const delegua_1 = __importDefault(require("../tipos-de-simbolos/delegua"));
const browser_process_hrtime_1 = __importDefault(require("browser-process-hrtime"));
const construtos_1 = require("../construtos");
const erro_avaliador_sintatico_1 = require("./erro-avaliador-sintatico");
const declaracoes_1 = require("../declaracoes");
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 * Há dois grupos de estruturas de alto nível: Construtos e Declarações.
 */
class AvaliadorSintatico {
    constructor(performance = false) {
        this.hashArquivo = 0;
        this.atual = 0;
        this.blocos = 0;
        this.erros = [];
        this.performance = performance;
    }
    declaracaoDeVariavel() {
        throw new Error('Método não implementado.');
    }
    erro(simbolo, mensagemDeErro) {
        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(simbolo, mensagemDeErro);
        this.erros.push(excecao);
        return excecao;
    }
    consumir(tipo, mensagemDeErro) {
        if (this.verificarTipoSimboloAtual(tipo))
            return this.avancarEDevolverAnterior();
        throw this.erro(this.simbolos[this.atual], mensagemDeErro);
    }
    verificarTipoSimboloAtual(tipo) {
        if (this.estaNoFinal())
            return false;
        return this.simbolos[this.atual].tipo === tipo;
    }
    verificarTipoProximoSimbolo(tipo) {
        return this.simbolos[this.atual + 1].tipo === tipo;
    }
    verificarDefinicaoTipoAtual() {
        const tipos = ['inteiro', 'qualquer', 'real', 'texto', 'vazio', 'vetor'];
        const lexema = this.simboloAtual().lexema.toLowerCase();
        const contemTipo = tipos.find((tipo) => tipo === lexema);
        if (contemTipo && this.verificarTipoProximoSimbolo(delegua_1.default.COLCHETE_ESQUERDO)) {
            const tiposVetores = ['inteiro[]', 'qualquer[]', 'real[]', 'texto[]'];
            this.avancarEDevolverAnterior();
            if (!this.verificarTipoProximoSimbolo(delegua_1.default.COLCHETE_DIREITO)) {
                throw this.erro(this.simbolos[this.atual], "Esperado símbolo de fechamento do vetor ']'.");
            }
            const contemTipoVetor = tiposVetores.find((tipo) => tipo === `${lexema}[]`);
            this.avancarEDevolverAnterior();
            return contemTipoVetor;
        }
        return contemTipo;
    }
    simboloAtual() {
        return this.simbolos[this.atual];
    }
    estaNoFinal() {
        return this.atual === this.simbolos.length;
    }
    avancarEDevolverAnterior() {
        if (!this.estaNoFinal())
            this.atual += 1;
        return this.simbolos[this.atual - 1];
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
        const simboloAtual = this.simbolos[this.atual];
        let valores = [];
        switch (simboloAtual.tipo) {
            case delegua_1.default.CHAVE_ESQUERDA:
                this.avancarEDevolverAnterior();
                const chaves = [];
                valores = [];
                if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA)) {
                    return new construtos_1.Dicionario(this.hashArquivo, Number(simboloAtual.linha), [], []);
                }
                while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA)) {
                    const chave = this.atribuir();
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                    const valor = this.atribuir();
                    chaves.push(chave);
                    valores.push(valor);
                    if (this.simbolos[this.atual].tipo !== delegua_1.default.CHAVE_DIREITA) {
                        this.consumir(delegua_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                    }
                }
                return new construtos_1.Dicionario(this.hashArquivo, Number(simboloAtual.linha), chaves, valores);
            case delegua_1.default.COLCHETE_ESQUERDO:
                this.avancarEDevolverAnterior();
                valores = [];
                if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_DIREITO)) {
                    return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), []);
                }
                while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_DIREITO)) {
                    const valor = this.atribuir();
                    valores.push(valor);
                    if (this.simbolos[this.atual].tipo !== delegua_1.default.COLCHETE_DIREITO) {
                        this.consumir(delegua_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                    }
                }
                return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), valores);
            case delegua_1.default.FALSO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), false);
            case delegua_1.default.FUNCAO:
            case delegua_1.default.FUNÇÃO:
                const simboloFuncao = this.avancarEDevolverAnterior();
                return this.corpoDaFuncao(simboloFuncao.lexema);
            case delegua_1.default.IDENTIFICADOR:
                const simboloIdentificador = this.avancarEDevolverAnterior();
                // Se o próximo símbolo é um incremento ou um decremento,
                // aqui deve retornar um unário correspondente.
                // Caso contrário, apenas retornar um construto de variável.
                if (this.simbolos[this.atual] &&
                    [delegua_1.default.INCREMENTAR, delegua_1.default.DECREMENTAR].includes(this.simbolos[this.atual].tipo)) {
                    const simboloIncrementoDecremento = this.avancarEDevolverAnterior();
                    return new construtos_1.Unario(this.hashArquivo, simboloIncrementoDecremento, new construtos_1.Variavel(this.hashArquivo, simboloIdentificador), 'DEPOIS');
                }
                return new construtos_1.Variavel(this.hashArquivo, simboloIdentificador);
            case delegua_1.default.IMPORTAR:
                this.avancarEDevolverAnterior();
                return this.declaracaoImportar();
            case delegua_1.default.ISTO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Isto(this.hashArquivo, Number(simboloAtual.linha), simboloAtual);
            case delegua_1.default.NULO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), null);
            case delegua_1.default.NUMERO:
            case delegua_1.default.TEXTO:
                const simboloNumeroTexto = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloNumeroTexto.linha), simboloNumeroTexto.literal);
            case delegua_1.default.PARENTESE_ESQUERDO:
                this.avancarEDevolverAnterior();
                const expressao = this.expressao();
                this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
            case delegua_1.default.SUPER:
                const simboloChave = this.avancarEDevolverAnterior();
                this.consumir(delegua_1.default.PONTO, "Esperado '.' após 'super'.");
                const metodo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome do método da Superclasse.');
                return new construtos_1.Super(this.hashArquivo, simboloChave, metodo);
            case delegua_1.default.VERDADEIRO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), true);
            case delegua_1.default.TIPO:
                this.avancarEDevolverAnterior();
                this.consumir(delegua_1.default.DE, "Esperado 'de' após 'tipo'.");
                const _expressao = this.expressao();
                return new construtos_1.TipoDe(this.hashArquivo, simboloAtual, _expressao instanceof construtos_1.Literal ? _expressao.valor : _expressao);
        }
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    }
    finalizarChamada(entidadeChamada) {
        const argumentos = [];
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simbolos[this.atual], 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        }
        const parenteseDireito = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos);
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO)) {
                const nome = this.consumir(delegua_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(this.hashArquivo, expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_ESQUERDO)) {
                const indice = this.expressao();
                const simboloFechamento = this.consumir(delegua_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    unario() {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.NEGACAO, delegua_1.default.SUBTRACAO, delegua_1.default.BIT_NOT, delegua_1.default.INCREMENTAR, delegua_1.default.DECREMENTAR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            return new construtos_1.Unario(this.hashArquivo, operador, direito, 'ANTES');
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EXPONENCIACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIVISAO, delegua_1.default.DIVISAO_IGUAL, delegua_1.default.DIVISAO_INTEIRA, delegua_1.default.DIVISAO_INTEIRA_IGUAL, delegua_1.default.MODULO, delegua_1.default.MODULO_IGUAL, delegua_1.default.MULTIPLICACAO, delegua_1.default.MULTIPLICACAO_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    /**
     * Se símbolo de operação é `+`, `-`, `+=` ou `-=`, monta objeto `Binario` para
     * ser avaliado pelo Interpretador.
     * @returns Um Construto, normalmente um `Binario`, ou `Unario` se houver alguma operação unária para ser avaliada.
     */
    adicaoOuSubtracao() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SUBTRACAO, delegua_1.default.ADICAO, delegua_1.default.MAIS_IGUAL, delegua_1.default.MENOS_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitShift() {
        let expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MENOR_MENOR, delegua_1.default.MAIOR_MAIOR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitE() {
        let expressao = this.bitShift();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_AND)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitShift();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitOu() {
        let expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_OR, delegua_1.default.BIT_XOR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitE();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparar() {
        let expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MAIOR, delegua_1.default.MAIOR_IGUAL, delegua_1.default.MENOR, delegua_1.default.MENOR_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitOu();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIFERENTE, delegua_1.default.IGUAL_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    em() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EM)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    e() {
        let expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.E)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.em();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.OU)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.e();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    /**
     * Método que resolve atribuições.
     * @returns Um construto do tipo `Atribuir`, `Conjunto` ou `AtribuicaoPorIndice`.
     */
    atribuir() {
        const expressao = this.ou();
        if (expressao instanceof construtos_1.Binario &&
            [
                delegua_1.default.MAIS_IGUAL,
                delegua_1.default.MENOS_IGUAL,
                delegua_1.default.MULTIPLICACAO_IGUAL,
                delegua_1.default.DIVISAO_IGUAL,
                delegua_1.default.DIVISAO_INTEIRA_IGUAL,
                delegua_1.default.MODULO_IGUAL,
            ].includes(expressao.operador.tipo)) {
            return new construtos_1.Atribuir(this.hashArquivo, expressao.esquerda.simbolo, expressao);
        }
        else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
            const igual = this.simbolos[this.atual - 1];
            const valor = this.expressao();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                const get = expressao;
                return new construtos_1.DefinirValor(this.hashArquivo, igual.linha, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoPorIndice(this.hashArquivo, expressao.linha, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    expressao() {
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.LEIA))
            return this.declaracaoLeia();
        return this.atribuir();
    }
    declaracaoEscreva() {
        const simboloAtual = this.simbolos[this.atual];
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    declaracaoExpressao() {
        const expressao = this.expressao();
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return new declaracoes_1.Expressao(expressao);
    }
    /**
     * Declaração para comando `leia`, para ler dados de entrada do usuário.
     * @returns Um objeto da classe `Leia`.
     */
    declaracaoLeia() {
        const simboloLeia = this.simbolos[this.atual];
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos argumentos em instrução `leia`.");
        const argumentos = [];
        if (this.simbolos[this.atual].tipo !== delegua_1.default.PARENTESE_DIREITO) {
            do {
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        }
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos em instrução `leia`.");
        return new declaracoes_1.Leia(simboloLeia, argumentos);
    }
    blocoEscopo() {
        let declaracoes = [];
        while (!this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            const retornoDeclaracao = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(retornoDeclaracao)) {
                declaracoes = declaracoes.concat(retornoDeclaracao);
            }
            else {
                declaracoes.push(retornoDeclaracao);
            }
        }
        this.consumir(delegua_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return declaracoes;
    }
    declaracaoSe() {
        const condicao = this.expressao();
        const caminhoEntao = this.resolverDeclaracao();
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, caminhoEntao, [], caminhoSenao);
    }
    declaracaoEnquanto() {
        try {
            this.blocos += 1;
            const condicao = this.expressao();
            const corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoParaCada(simboloPara) {
        const nomeVariavelIteracao = this.consumir(delegua_1.default.IDENTIFICADOR, "Esperado identificador de variável de iteração para instrução 'para cada'.");
        if (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.DE, delegua_1.default.EM)) {
            throw this.erro(this.simbolos[this.atual], "Esperado palavras reservadas 'em' ou 'de' após variável de iteração em instrução 'para cada'.");
        }
        const vetor = this.expressao();
        const corpo = this.resolverDeclaracao();
        return new declaracoes_1.ParaCada(this.hashArquivo, Number(simboloPara.linha), nomeVariavelIteracao.lexema, vetor, corpo);
    }
    declaracaoParaTradicional(simboloPara) {
        const comParenteses = this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO);
        let inicializador;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA)) {
            inicializador = null;
        }
        else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VARIAVEL)) {
            inicializador = this.declaracaoDeVariaveis();
        }
        else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CONSTANTE)) {
            inicializador = this.declaracaoDeConstantes();
        }
        else {
            inicializador = this.declaracaoExpressao();
        }
        let condicao = null;
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PONTO_E_VIRGULA)) {
            condicao = this.expressao();
        }
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        let incrementar = null;
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            incrementar = this.expressao();
            this.verificarSeSimboloAtualEIgualA(delegua_1.default.INCREMENTAR, delegua_1.default.DECREMENTAR);
        }
        if (comParenteses) {
            this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas de inicialização, condição e incremento.");
        }
        const corpo = this.resolverDeclaracao();
        return new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
    }
    declaracaoPara() {
        try {
            const simboloPara = this.simbolos[this.atual - 1];
            this.blocos += 1;
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CADA)) {
                return this.declaracaoParaCada(simboloPara);
            }
            return this.declaracaoParaTradicional(simboloPara);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoSustar() {
        if (this.blocos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'sustar' ou 'pausa' deve estar dentro de um laço de repetição.");
        }
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return new declaracoes_1.Sustar(this.simbolos[this.atual - 1]);
    }
    declaracaoContinua() {
        if (this.blocos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'continua' precisa estar em um laço de repetição.");
        }
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return new declaracoes_1.Continua(this.simbolos[this.atual - 1]);
    }
    declaracaoRetorna() {
        const simboloChave = this.simbolos[this.atual - 1];
        let valor = null;
        if ([
            delegua_1.default.COLCHETE_ESQUERDO,
            delegua_1.default.FALSO,
            delegua_1.default.IDENTIFICADOR,
            delegua_1.default.ISTO,
            delegua_1.default.NEGACAO,
            delegua_1.default.NUMERO,
            delegua_1.default.NULO,
            delegua_1.default.PARENTESE_ESQUERDO,
            delegua_1.default.SUPER,
            delegua_1.default.TEXTO,
            delegua_1.default.VERDADEIRO,
        ].includes(this.simbolos[this.atual].tipo)) {
            valor = this.expressao();
        }
        // Ponto-e-vírgula é opcional aqui.
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return new declaracoes_1.Retorna(simboloChave, valor);
    }
    declaracaoEscolha() {
        try {
            this.blocos += 1;
            const condicao = this.expressao();
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            const caminhos = [];
            let caminhoPadrao = null;
            while (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CASO)) {
                    const caminhoCondicoes = [this.expressao()];
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(delegua_1.default.CASO)) {
                        this.consumir(delegua_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    let declaracoes = [];
                    do {
                        const retornoDeclaracao = this.resolverDeclaracao();
                        if (Array.isArray(retornoDeclaracao)) {
                            declaracoes = declaracoes.concat(retornoDeclaracao);
                        }
                        else {
                            declaracoes.push(retornoDeclaracao);
                        }
                    } while (!this.verificarTipoSimboloAtual(delegua_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        condicoes: caminhoCondicoes,
                        declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simbolos[this.atual], "Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(delegua_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    const declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(delegua_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA));
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
    declaracaoFalhar() {
        const simboloFalha = this.simbolos[this.atual - 1];
        const textoFalha = this.consumir(delegua_1.default.TEXTO, 'Esperado texto para explicar falha.');
        return new declaracoes_1.Falhar(simboloFalha, textoFalha.literal);
    }
    declaracaoImportar() {
        this.consumir(delegua_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        const caminho = this.expressao();
        const simboloFechamento = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    }
    declaracaoTente() {
        const simboloTente = this.simbolos[this.atual - 1];
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        const blocoTente = this.blocoEscopo();
        let blocoPegue = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PEGUE)) {
            if (this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_ESQUERDO)) {
                // Caso 1: com parâmetro de erro.
                // `pegue` recebe um `FuncaoConstruto`.
                blocoPegue = this.corpoDaFuncao('bloco `pegue`');
            }
            else {
                // Caso 2: sem parâmetro de erro.
                // `pegue` recebe um bloco.
                this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
                blocoPegue = this.blocoEscopo();
            }
        }
        let blocoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SENAO, delegua_1.default.SENÃO)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'senão'.");
            blocoSenao = this.blocoEscopo();
        }
        let blocoFinalmente = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.FINALMENTE)) {
            this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'finalmente'.");
            blocoFinalmente = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(simboloTente.hashArquivo, Number(simboloTente.linha), blocoTente, blocoPegue, blocoSenao, blocoFinalmente);
    }
    declaracaoFazer() {
        const simboloFazer = this.simbolos[this.atual - 1];
        try {
            this.blocos += 1;
            const caminhoFazer = this.resolverDeclaracao();
            this.consumir(delegua_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            const condicaoEnquanto = this.expressao();
            return new declaracoes_1.Fazer(simboloFazer.hashArquivo, Number(simboloFazer.linha), caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.blocos -= 1;
        }
    }
    /**
     * Todas as resoluções triviais da linguagem, ou seja, todas as
     * resoluções que podem ocorrer dentro ou fora de um bloco.
     * @returns Normalmente uma `Declaracao`, mas há casos em que
     * outros objetos podem ser retornados.
     * @see resolverDeclaracaoForaDeBloco para as declarações que não podem
     * ocorrer em blocos de escopo elementares.
     */
    resolverDeclaracao() {
        switch (this.simbolos[this.atual].tipo) {
            case delegua_1.default.CHAVE_ESQUERDA:
                const simboloInicioBloco = this.avancarEDevolverAnterior();
                return new declaracoes_1.Bloco(simboloInicioBloco.hashArquivo, Number(simboloInicioBloco.linha), this.blocoEscopo());
            case delegua_1.default.CONSTANTE:
                this.avancarEDevolverAnterior();
                return this.declaracaoDeConstantes();
            case delegua_1.default.CONTINUA:
                this.avancarEDevolverAnterior();
                return this.declaracaoContinua();
            case delegua_1.default.ENQUANTO:
                this.avancarEDevolverAnterior();
                return this.declaracaoEnquanto();
            case delegua_1.default.ESCOLHA:
                this.avancarEDevolverAnterior();
                return this.declaracaoEscolha();
            case delegua_1.default.ESCREVA:
                this.avancarEDevolverAnterior();
                return this.declaracaoEscreva();
            case delegua_1.default.FALHAR:
                this.avancarEDevolverAnterior();
                return this.declaracaoFalhar();
            case delegua_1.default.FAZER:
                this.avancarEDevolverAnterior();
                return this.declaracaoFazer();
            case delegua_1.default.PARA:
                this.avancarEDevolverAnterior();
                return this.declaracaoPara();
            case delegua_1.default.PAUSA:
            case delegua_1.default.SUSTAR:
                this.avancarEDevolverAnterior();
                return this.declaracaoSustar();
            case delegua_1.default.SE:
                this.avancarEDevolverAnterior();
                return this.declaracaoSe();
            case delegua_1.default.RETORNA:
                this.avancarEDevolverAnterior();
                return this.declaracaoRetorna();
            case delegua_1.default.TENTE:
                this.avancarEDevolverAnterior();
                return this.declaracaoTente();
            case delegua_1.default.VARIAVEL:
                this.avancarEDevolverAnterior();
                return this.declaracaoDeVariaveis();
        }
        const simboloAtual = this.simbolos[this.atual];
        if (simboloAtual.tipo === delegua_1.default.IDENTIFICADOR) {
            // Pela gramática, a seguinte situação não pode ocorrer:
            // 1. O símbolo anterior ser um identificador; e
            // 2. O símbolo anterior estar na mesma linha do identificador atual.
            const simboloAnterior = this.simbolos[this.atual - 1];
            if (!!simboloAnterior &&
                simboloAnterior.tipo === delegua_1.default.IDENTIFICADOR &&
                simboloAnterior.linha === simboloAtual.linha) {
                this.erro(this.simbolos[this.atual], 'Não é permitido ter dois identificadores seguidos na mesma linha.');
            }
        }
        return this.declaracaoExpressao();
    }
    /**
     * Caso símbolo atual seja `var`, devolve uma declaração de variável.
     * @returns Um Construto do tipo Var.
     */
    declaracaoDeVariaveis() {
        const identificadores = [];
        let retorno = [];
        let tipo = null;
        do {
            identificadores.push(this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da variável.'));
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DOIS_PONTOS)) {
            tipo = this.verificarDefinicaoTipoAtual();
            this.avancarEDevolverAnterior();
        }
        if (!this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
            for (let [indice, identificador] of identificadores.entries()) {
                retorno.push(new declaracoes_1.Var(identificador, null, tipo));
            }
            this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
            return retorno;
        }
        const inicializadores = [];
        do {
            inicializadores.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        if (identificadores.length !== inicializadores.length) {
            throw this.erro(this.simboloAtual(), 'Quantidade de identificadores à esquerda do igual é diferente da quantidade de valores à direita.');
        }
        for (let [indice, identificador] of identificadores.entries()) {
            retorno.push(new declaracoes_1.Var(identificador, inicializadores[indice], tipo));
        }
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return retorno;
    }
    /**
     * Caso símbolo atual seja `const, constante ou fixo`, devolve uma declaração de const.
     * @returns Um Construto do tipo Const.
     */
    declaracaoDeConstantes() {
        const identificadores = [];
        let tipo = null;
        do {
            identificadores.push(this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da constante.'));
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DOIS_PONTOS)) {
            tipo = this.verificarDefinicaoTipoAtual();
            this.avancarEDevolverAnterior();
        }
        this.consumir(delegua_1.default.IGUAL, "Esperado '=' após identificador em instrução 'constante'.");
        const inicializadores = [];
        do {
            inicializadores.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        if (identificadores.length !== inicializadores.length) {
            throw this.erro(this.simboloAtual(), 'Quantidade de identificadores à esquerda do igual é diferente da quantidade de valores à direita.');
        }
        let retorno = [];
        for (let [indice, identificador] of identificadores.entries()) {
            retorno.push(new declaracoes_1.Const(identificador, inicializadores[indice], tipo));
        }
        this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO_E_VIRGULA);
        return retorno;
    }
    funcao(tipo) {
        let simbolo;
        switch (this.simbolos[this.atual].tipo) {
            case delegua_1.default.CONSTRUTOR:
                simbolo = this.avancarEDevolverAnterior();
                break;
            default:
                simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, `Esperado nome de ${tipo}.`);
                break;
        }
        return new declaracoes_1.FuncaoDeclaracao(simbolo, this.corpoDaFuncao(tipo));
    }
    logicaComumParametros() {
        const parametros = [];
        do {
            const parametro = {};
            if (this.simbolos[this.atual].tipo === delegua_1.default.MULTIPLICACAO) {
                this.consumir(delegua_1.default.MULTIPLICACAO, null);
                parametro.abrangencia = 'multiplo';
            }
            else {
                parametro.abrangencia = 'padrao';
            }
            parametro.nome = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.IGUAL)) {
                parametro.valorPadrao = this.primario();
            }
            if (parametro.abrangencia === 'multiplo')
                break;
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DOIS_PONTOS)) {
                let tipoDadoParametro = this.verificarDefinicaoTipoAtual();
                parametro.tipoDado = {
                    nome: this.simbolos[this.atual - 2].lexema,
                    tipo: tipoDadoParametro,
                    tipoInvalido: !tipoDadoParametro ? this.simboloAtual().lexema : null
                };
                this.avancarEDevolverAnterior();
            }
            parametros.push(parametro);
        } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        return parametros;
    }
    corpoDaFuncao(tipo) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        const parenteseEsquerdo = this.consumir(delegua_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${tipo}.`);
        let parametros = [];
        if (!this.verificarTipoSimboloAtual(delegua_1.default.PARENTESE_DIREITO)) {
            parametros = this.logicaComumParametros();
        }
        this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        let tipoRetorno = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DOIS_PONTOS)) {
            tipoRetorno = this.verificarDefinicaoTipoAtual();
            this.avancarEDevolverAnterior();
        }
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, `Esperado '{' antes do escopo do ${tipo}.`);
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(parenteseEsquerdo.linha), parametros, corpo, tipoRetorno);
    }
    declaracaoDeClasse() {
        const simbolo = this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        let superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.HERDA)) {
            this.consumir(delegua_1.default.IDENTIFICADOR, 'Esperado nome da Superclasse.');
            superClasse = new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        this.consumir(delegua_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        const metodos = [];
        while (!this.verificarTipoSimboloAtual(delegua_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            metodos.push(this.funcao('método'));
        }
        this.consumir(delegua_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(simbolo, superClasse, metodos);
    }
    /**
     * Declarações fora de bloco precisam ser verificadas primeiro porque
     * não é possível declarar uma classe/função dentro de um bloco `enquanto`,
     * `fazer ... enquanto`, `para`, `escolha`, etc.
     * @returns Uma função ou classe se o símbolo atual resolver aqui.
     *          O retorno de `resolverDeclaracao()` em caso contrário.
     * @see resolverDeclaracao
     */
    resolverDeclaracaoForaDeBloco() {
        try {
            if ((this.verificarTipoSimboloAtual(delegua_1.default.FUNCAO) ||
                this.verificarTipoSimboloAtual(delegua_1.default.FUNÇÃO)) &&
                this.verificarTipoProximoSimbolo(delegua_1.default.IDENTIFICADOR)) {
                this.avancarEDevolverAnterior();
                return this.funcao('funcao');
            }
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            this.erros.push(erro);
            return null;
        }
    }
    /**
     * Usado quando há erros na avaliação sintática.
     * Garante que o código não entre em loop infinito.
     * @returns Sempre retorna `void`.
     */
    sincronizar() {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            const tipoSimboloAtual = this.simbolos[this.atual - 1].tipo;
            switch (tipoSimboloAtual) {
                case delegua_1.default.CLASSE:
                case delegua_1.default.FUNCAO:
                case delegua_1.default.FUNÇÃO:
                case delegua_1.default.VARIAVEL:
                case delegua_1.default.PARA:
                case delegua_1.default.SE:
                case delegua_1.default.ENQUANTO:
                case delegua_1.default.ESCREVA:
                case delegua_1.default.RETORNA:
                    return;
            }
            this.avancarEDevolverAnterior();
        }
    }
    analisar(retornoLexador, hashArquivo) {
        const inicioAnalise = (0, browser_process_hrtime_1.default)();
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
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
exports.AvaliadorSintatico = AvaliadorSintatico;
//# sourceMappingURL=avaliador-sintatico.js.map