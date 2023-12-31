"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoEguaClassico = void 0;
const construtos_1 = require("../../construtos");
const erro_avaliador_sintatico_1 = require("../erro-avaliador-sintatico");
const declaracoes_1 = require("../../declaracoes");
const egua_classico_1 = __importDefault(require("../../tipos-de-simbolos/egua-classico"));
/**
 * O avaliador sintático (_Parser_) é responsável por transformar os símbolos do Lexador em estruturas de alto nível.
 * Essas estruturas de alto nível são as partes que executam lógica de programação de fato.
 *
 * Esta implementação tenta seguir à risca o que está atualmente em https://github.com/eguatech/egua/blob/master/src/parser.js.
 */
class AvaliadorSintaticoEguaClassico {
    constructor(simbolos) {
        this.simbolos = simbolos;
        this.atual = 0;
        this.blocos = 0;
    }
    declaracaoDeConstantes() {
        throw new Error('Método não implementado.');
    }
    declaracaoDeVariaveis() {
        throw new Error('Método não implementado.');
    }
    declaracaoLeia() {
        throw new Error('Método não implementado.');
    }
    sincronizar() {
        this.avancarEDevolverAnterior();
        while (!this.estaNoFinal()) {
            if (this.simboloAnterior().tipo === egua_classico_1.default.PONTO_E_VIRGULA)
                return;
            switch (this.simboloAtual().tipo) {
                case egua_classico_1.default.CLASSE:
                case egua_classico_1.default.FUNCAO:
                case egua_classico_1.default.VARIAVEL:
                case egua_classico_1.default.PARA:
                case egua_classico_1.default.SE:
                case egua_classico_1.default.ENQUANTO:
                case egua_classico_1.default.ESCREVA:
                case egua_classico_1.default.RETORNA:
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
        else
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
        return this.simboloAtual().tipo === egua_classico_1.default.EOF;
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
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.SUPER)) {
            const simboloChave = this.simboloAnterior();
            this.consumir(egua_classico_1.default.PONTO, "Esperado '.' após 'super'.");
            const metodo = this.consumir(egua_classico_1.default.IDENTIFICADOR, 'Esperado nome do método da Superclasse.');
            return new construtos_1.Super(this.hashArquivo, simboloChave, metodo);
        }
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.COLCHETE_ESQUERDO)) {
            const valores = [];
            if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.COLCHETE_DIREITO)) {
                return new construtos_1.Vetor(this.hashArquivo, 0, []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.COLCHETE_DIREITO)) {
                const valor = this.atribuir();
                valores.push(valor);
                if (this.simboloAtual().tipo !== egua_classico_1.default.COLCHETE_DIREITO) {
                    this.consumir(egua_classico_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Vetor(this.hashArquivo, 0, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CHAVE_ESQUERDA)) {
            const chaves = [];
            const valores = [];
            if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CHAVE_DIREITA)) {
                return new construtos_1.Dicionario(this.hashArquivo, 0, [], []);
            }
            while (!this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CHAVE_DIREITA)) {
                const chave = this.atribuir();
                this.consumir(egua_classico_1.default.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                const valor = this.atribuir();
                chaves.push(chave);
                valores.push(valor);
                if (this.simboloAtual().tipo !== egua_classico_1.default.CHAVE_DIREITA) {
                    this.consumir(egua_classico_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                }
            }
            return new construtos_1.Dicionario(this.hashArquivo, 0, chaves, valores);
        }
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.FUNCAO))
            return this.corpoDaFuncao('função');
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.FALSO))
            return new construtos_1.Literal(this.hashArquivo, 0, false);
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.VERDADEIRO))
            return new construtos_1.Literal(this.hashArquivo, 0, true);
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.NULO))
            return new construtos_1.Literal(this.hashArquivo, 0, null);
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.ISTO))
            return new construtos_1.Isto(this.hashArquivo, Number(this.simboloAnterior()));
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.NUMERO, egua_classico_1.default.TEXTO)) {
            return new construtos_1.Literal(this.hashArquivo, 0, this.simboloAnterior().literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simboloAnterior());
        }
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PARENTESE_ESQUERDO)) {
            const expressao = this.expressao();
            this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, 0, expressao);
        }
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.IMPORTAR))
            return this.declaracaoImportar();
        throw this.erro(this.simboloAtual(), 'Esperado expressão.');
    }
    finalizarChamada(entidadeChamada) {
        const argumentos = [];
        if (!this.verificarTipoSimboloAtual(egua_classico_1.default.PARENTESE_DIREITO)) {
            do {
                if (argumentos.length >= 255) {
                    throw this.erro(this.simboloAtual(), 'Não pode haver mais de 255 argumentos.');
                }
                argumentos.push(this.expressao());
            } while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.VIRGULA));
        }
        const parenteseDireito = this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos);
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PONTO)) {
                const nome = this.consumir(egua_classico_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(this.hashArquivo, expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.COLCHETE_ESQUERDO)) {
                const indice = this.expressao();
                const simboloFechamento = this.consumir(egua_classico_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    unario() {
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.NEGACAO, egua_classico_1.default.SUBTRACAO, egua_classico_1.default.BIT_NOT)) {
            const operador = this.simboloAnterior();
            const direito = this.unario();
            return new construtos_1.Unario(this.hashArquivo, operador, direito);
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.EXPONENCIACAO)) {
            const operador = this.simboloAnterior();
            const direito = this.unario();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.DIVISAO, egua_classico_1.default.MULTIPLICACAO, egua_classico_1.default.MODULO)) {
            const operador = this.simboloAnterior();
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    adicionar() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.SUBTRACAO, egua_classico_1.default.ADICAO)) {
            const operador = this.simboloAnterior();
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitShift() {
        let expressao = this.adicionar();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.MENOR_MENOR, egua_classico_1.default.MAIOR_MAIOR)) {
            const operador = this.simboloAnterior();
            const direito = this.adicionar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitE() {
        let expressao = this.bitShift();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.BIT_AND)) {
            const operador = this.simboloAnterior();
            const direito = this.bitShift();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    bitOu() {
        let expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.BIT_OR, egua_classico_1.default.BIT_XOR)) {
            const operador = this.simboloAnterior();
            const direito = this.bitE();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparar() {
        let expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.MAIOR, egua_classico_1.default.MAIOR_IGUAL, egua_classico_1.default.MENOR, egua_classico_1.default.MENOR_IGUAL)) {
            const operador = this.simboloAnterior();
            const direito = this.bitOu();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.DIFERENTE, egua_classico_1.default.IGUAL_IGUAL)) {
            const operador = this.simboloAnterior();
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    em() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.EM)) {
            const operador = this.simboloAnterior();
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    e() {
        let expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.E)) {
            const operador = this.simboloAnterior();
            const direito = this.em();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.OU)) {
            const operador = this.simboloAnterior();
            const direito = this.e();
            expressao = new construtos_1.Logico(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    atribuir() {
        const expressao = this.ou();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.IGUAL)) {
            const igual = this.simboloAnterior();
            const valor = this.atribuir();
            if (expressao instanceof construtos_1.Variavel) {
                const simbolo = expressao.simbolo;
                return new construtos_1.Atribuir(this.hashArquivo, simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoMetodo) {
                const get = expressao;
                return new construtos_1.DefinirValor(this.hashArquivo, 0, get.objeto, get.simbolo, valor);
            }
            else if (expressao instanceof construtos_1.AcessoIndiceVariavel) {
                return new construtos_1.AtribuicaoPorIndice(this.hashArquivo, 0, expressao.entidadeChamada, expressao.indice, valor);
            }
            this.erro(igual, 'Tarefa de atribuição inválida');
        }
        return expressao;
    }
    expressao() {
        return this.atribuir();
    }
    declaracaoEscreva() {
        const simboloAtual = this.simboloAtual();
        this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        const valor = this.expressao();
        this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após o valor.");
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, [valor]);
    }
    declaracaoExpressao() {
        const expressao = this.expressao();
        this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após expressão.");
        return new declaracoes_1.Expressao(expressao);
    }
    blocoEscopo() {
        const declaracoes = [];
        while (!this.verificarTipoSimboloAtual(egua_classico_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        this.consumir(egua_classico_1.default.CHAVE_DIREITA, "Esperado '}' após o bloco.");
        return declaracoes;
    }
    declaracaoSe() {
        this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'se'.");
        const condicao = this.expressao();
        this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após condição do se.");
        const caminhoEntao = this.resolverDeclaracao();
        const caminhosSeSenao = [];
        while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.SENÃOSE)) {
            this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'senãose'.");
            const condicaoSeSenao = this.expressao();
            this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' apóes codição do 'senãose.");
            const caminho = this.resolverDeclaracao();
            caminhosSeSenao.push({
                condicao: condicaoSeSenao,
                caminho: caminho,
            });
        }
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.SENÃO)) {
            caminhoSenao = this.resolverDeclaracao();
        }
        return new declaracoes_1.Se(condicao, caminhoEntao, caminhosSeSenao, caminhoSenao);
    }
    declaracaoEnquanto() {
        try {
            this.blocos += 1;
            this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'enquanto'.");
            const condicao = this.expressao();
            this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após condicional.");
            const corpo = this.resolverDeclaracao();
            return new declaracoes_1.Enquanto(condicao, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoPara() {
        try {
            const simboloPara = this.simboloAnterior();
            this.blocos += 1;
            this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' após 'para'.");
            let inicializador;
            if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PONTO_E_VIRGULA)) {
                inicializador = null;
            }
            else if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.VARIAVEL)) {
                inicializador = this.declaracaoDeVariavel();
            }
            else {
                inicializador = this.declaracaoExpressao();
            }
            let condicao = null;
            if (!this.verificarTipoSimboloAtual(egua_classico_1.default.PONTO_E_VIRGULA)) {
                condicao = this.expressao();
            }
            this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após valores da condicional");
            let incrementar = null;
            if (!this.verificarTipoSimboloAtual(egua_classico_1.default.PARENTESE_DIREITO)) {
                incrementar = this.expressao();
            }
            this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após cláusulas");
            const corpo = this.resolverDeclaracao();
            return new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), inicializador, condicao, incrementar, corpo);
        }
        finally {
            this.blocos -= 1;
        }
    }
    declaracaoSustar() {
        if (this.blocos < 1) {
            this.erro(this.simboloAnterior(), "'pausa' deve estar dentro de um loop.");
        }
        this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após 'pausa'.");
        return new declaracoes_1.Sustar(this.simboloAtual());
    }
    declaracaoContinua() {
        if (this.blocos < 1) {
            this.erro(this.simboloAnterior(), "'continua' precisa estar em um laço de repetição.");
        }
        this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após 'continua'.");
        return new declaracoes_1.Continua(this.simboloAtual());
    }
    declaracaoRetorna() {
        const palavraChave = this.simboloAnterior();
        let valor = null;
        if (!this.verificarTipoSimboloAtual(egua_classico_1.default.PONTO_E_VIRGULA)) {
            valor = this.expressao();
        }
        this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após o retorno.");
        return new declaracoes_1.Retorna(palavraChave, valor);
    }
    declaracaoEscolha() {
        try {
            this.blocos += 1;
            this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '{' após 'escolha'.");
            const condicao = this.expressao();
            this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado '}' após a condição de 'escolha'.");
            this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo do 'escolha'.");
            const caminhos = [];
            let caminhoPadrao = null;
            while (!this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
                if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CASO)) {
                    const caminhoCondicoes = [this.expressao()];
                    this.consumir(egua_classico_1.default.DOIS_PONTOS, "Esperado ':' após o 'caso'.");
                    while (this.verificarTipoSimboloAtual(egua_classico_1.default.CASO)) {
                        this.consumir(egua_classico_1.default.CASO, null);
                        caminhoCondicoes.push(this.expressao());
                        this.consumir(egua_classico_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'caso'.");
                    }
                    const declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(egua_classico_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(egua_classico_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(egua_classico_1.default.CHAVE_DIREITA));
                    caminhos.push({
                        condicoes: caminhoCondicoes,
                        declaracoes,
                    });
                }
                else if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PADRAO)) {
                    if (caminhoPadrao !== null) {
                        const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simboloAtual(), "Você só pode ter um 'padrao' em cada declaração de 'escolha'.");
                        this.erros.push(excecao);
                        throw excecao;
                    }
                    this.consumir(egua_classico_1.default.DOIS_PONTOS, "Esperado ':' após declaração do 'padrao'.");
                    const declaracoes = [];
                    do {
                        declaracoes.push(this.resolverDeclaracao());
                    } while (!this.verificarTipoSimboloAtual(egua_classico_1.default.CASO) &&
                        !this.verificarTipoSimboloAtual(egua_classico_1.default.PADRAO) &&
                        !this.verificarTipoSimboloAtual(egua_classico_1.default.CHAVE_DIREITA));
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
    declaracaoImportar() {
        this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração.");
        const caminho = this.expressao();
        const simboloFechamento = this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração.");
        return new declaracoes_1.Importar(caminho, simboloFechamento);
    }
    declaracaoTente() {
        this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'tente'.");
        const tryBlock = this.blocoEscopo();
        let catchBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PEGUE)) {
            this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            catchBlock = this.blocoEscopo();
        }
        let elseBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.SENÃO)) {
            this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            elseBlock = this.blocoEscopo();
        }
        let finallyBlock = null;
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.FINALMENTE)) {
            this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, "Esperado '{' após a declaração 'pegue'.");
            finallyBlock = this.blocoEscopo();
        }
        return new declaracoes_1.Tente(0, 0, tryBlock, catchBlock, elseBlock, finallyBlock);
    }
    declaracaoFazer() {
        try {
            this.blocos += 1;
            const caminhoFazer = this.resolverDeclaracao();
            this.consumir(egua_classico_1.default.ENQUANTO, "Esperado declaração do 'enquanto' após o escopo do 'fazer'.");
            this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, "Esperado '(' após declaração 'enquanto'.");
            const condicaoEnquanto = this.expressao();
            this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após declaração do 'enquanto'.");
            return new declaracoes_1.Fazer(0, 0, caminhoFazer, condicaoEnquanto);
        }
        finally {
            this.blocos -= 1;
        }
    }
    resolverDeclaracao() {
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.FAZER))
            return this.declaracaoFazer();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.TENTE))
            return this.declaracaoTente();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.ESCOLHA))
            return this.declaracaoEscolha();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.RETORNA))
            return this.declaracaoRetorna();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CONTINUA))
            return this.declaracaoContinua();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PAUSA))
            return this.declaracaoSustar();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.PARA))
            return this.declaracaoPara();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.ENQUANTO))
            return this.declaracaoEnquanto();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.SE))
            return this.declaracaoSe();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.ESCREVA))
            return this.declaracaoEscreva();
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CHAVE_ESQUERDA))
            return new declaracoes_1.Bloco(0, 0, this.blocoEscopo());
        return this.declaracaoExpressao();
    }
    declaracaoDeVariavel() {
        const nome = this.consumir(egua_classico_1.default.IDENTIFICADOR, 'Esperado nome de variável.');
        let inicializador = null;
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.IGUAL)) {
            inicializador = this.expressao();
        }
        this.consumir(egua_classico_1.default.PONTO_E_VIRGULA, "Esperado ';' após a declaração da variável.");
        return new declaracoes_1.Var(nome, inicializador);
    }
    funcao(kind) {
        const nome = this.consumir(egua_classico_1.default.IDENTIFICADOR, `Esperado nome ${kind}.`);
        return new declaracoes_1.FuncaoDeclaracao(nome, this.corpoDaFuncao(kind));
    }
    corpoDaFuncao(kind) {
        this.consumir(egua_classico_1.default.PARENTESE_ESQUERDO, `Esperado '(' após o nome ${kind}.`);
        const parametros = [];
        if (!this.verificarTipoSimboloAtual(egua_classico_1.default.PARENTESE_DIREITO)) {
            do {
                if (parametros.length >= 255) {
                    this.erro(this.simboloAtual(), 'Não pode haver mais de 255 parâmetros');
                }
                const parametro = {};
                if (this.simboloAtual().tipo === egua_classico_1.default.MULTIPLICACAO) {
                    this.consumir(egua_classico_1.default.MULTIPLICACAO, null);
                    parametro['tipo'] = 'multiplo';
                }
                else {
                    parametro['tipo'] = 'padrao';
                }
                parametro['nome'] = this.consumir(egua_classico_1.default.IDENTIFICADOR, 'Esperado nome do parâmetro.');
                if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.IGUAL)) {
                    parametro['padrao'] = this.primario();
                }
                parametros.push(parametro);
                if (parametro['tipo'] === 'multiplo')
                    break;
            } while (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.VIRGULA));
        }
        this.consumir(egua_classico_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, `Esperado '{' antes do escopo do ${kind}.`);
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, 0, parametros, corpo);
    }
    declaracaoDeClasse() {
        const nome = this.consumir(egua_classico_1.default.IDENTIFICADOR, 'Esperado nome da classe.');
        let superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.HERDA)) {
            this.consumir(egua_classico_1.default.IDENTIFICADOR, 'Esperado nome da Superclasse.');
            superClasse = new construtos_1.Variavel(this.hashArquivo, this.simboloAnterior());
        }
        this.consumir(egua_classico_1.default.CHAVE_ESQUERDA, "Esperado '{' antes do escopo da classe.");
        const metodos = [];
        while (!this.verificarTipoSimboloAtual(egua_classico_1.default.CHAVE_DIREITA) && !this.estaNoFinal()) {
            metodos.push(this.funcao('método'));
        }
        this.consumir(egua_classico_1.default.CHAVE_DIREITA, "Esperado '}' após o escopo da classe.");
        return new declaracoes_1.Classe(nome, superClasse, metodos);
    }
    resolverDeclaracaoForaDeBloco() {
        try {
            if (this.verificarTipoSimboloAtual(egua_classico_1.default.FUNCAO) &&
                this.verificarTipoProximoSimbolo(egua_classico_1.default.IDENTIFICADOR)) {
                this.consumir(egua_classico_1.default.FUNCAO, null);
                return this.funcao('função');
            }
            if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.VARIAVEL))
                return this.declaracaoDeVariavel();
            if (this.verificarSeSimboloAtualEIgualA(egua_classico_1.default.CLASSE))
                return this.declaracaoDeClasse();
            return this.resolverDeclaracao();
        }
        catch (erro) {
            this.sincronizar();
            return null;
        }
    }
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        const declaracoes = [];
        while (!this.estaNoFinal()) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoEguaClassico = AvaliadorSintaticoEguaClassico;
//# sourceMappingURL=avaliador-sintatico-egua-classico.js.map