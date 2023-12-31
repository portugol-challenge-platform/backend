"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroAvaliadorSintatico = void 0;
const construtos_1 = require("../construtos");
const erro_avaliador_sintatico_1 = require("./erro-avaliador-sintatico");
const delegua_1 = __importDefault(require("../tipos-de-simbolos/microgramaticas/delegua"));
const micro_avaliador_sintatico_base_1 = require("./micro-avaliador-sintatico-base");
/**
 * O MicroAvaliadorSintatico funciona apenas dentro de interpolações de texto.
 */
class MicroAvaliadorSintatico extends micro_avaliador_sintatico_base_1.MicroAvaliadorSintaticoBase {
    // simbolos: SimboloInterface[];
    // erros: ErroAvaliadorSintatico[];
    // atual: number;
    // linha: number;
    avancarEDevolverAnterior() {
        if (this.atual < this.simbolos.length)
            this.atual += 1;
        return this.simbolos[this.atual - 1];
    }
    verificarTipoSimboloAtual(tipo) {
        if (this.atual === this.simbolos.length)
            return false;
        return this.simbolos[this.atual].tipo === tipo;
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
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        let valores = [];
        switch (simboloAtual.tipo) {
            // TODO: Verificar se vamos usar isso.
            /* case tiposDeSimbolos.CHAVE_ESQUERDA:
                this.avancarEDevolverAnterior();
                const chaves = [];
                valores = [];

                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.CHAVE_DIREITA)) {
                    return new Dicionario(-1, Number(this.linha), [], []);
                }

                while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.CHAVE_DIREITA)) {
                    const chave = this.atribuir();
                    this.consumir(tiposDeSimbolos.DOIS_PONTOS, "Esperado ':' entre chave e valor.");
                    const valor = this.atribuir();

                    chaves.push(chave);
                    valores.push(valor);

                    if (this.simbolos[this.atual].tipo !== tiposDeSimbolos.CHAVE_DIREITA) {
                        this.consumir(tiposDeSimbolos.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                    }
                }

                return new Dicionario(-1, Number(this.linha), chaves, valores); */
            // TODO: Verificar se vamos usar isso.
            /* case tiposDeSimbolos.COLCHETE_ESQUERDO:
                this.avancarEDevolverAnterior();
                valores = [];

                if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.COLCHETE_DIREITO)) {
                    return new Vetor(-1, Number(this.linha), []);
                }

                while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.COLCHETE_DIREITO)) {
                    const valor = this.atribuir();
                    valores.push(valor);
                    if (this.simbolos[this.atual].tipo !== tiposDeSimbolos.COLCHETE_DIREITO) {
                        this.consumir(tiposDeSimbolos.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                    }
                }

                return new Vetor(-1, Number(this.linha), valores);
            */
            case delegua_1.default.FALSO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Literal(-1, Number(this.linha), false);
            case delegua_1.default.IDENTIFICADOR:
                const simboloIdentificador = this.avancarEDevolverAnterior();
                // Se o próximo símbolo é um incremento ou um decremento,
                // aqui deve retornar um unário correspondente.
                // Caso contrário, apenas retornar um construto de variável.
                if (this.simbolos[this.atual] &&
                    [delegua_1.default.INCREMENTAR, delegua_1.default.DECREMENTAR].includes(this.simbolos[this.atual].tipo)) {
                    const simboloIncrementoDecremento = this.avancarEDevolverAnterior();
                    return new construtos_1.Unario(-1, simboloIncrementoDecremento, new construtos_1.Variavel(-1, simboloIdentificador), 'DEPOIS');
                }
                return new construtos_1.Variavel(-1, simboloIdentificador);
            case delegua_1.default.NULO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Literal(-1, Number(this.linha), null);
            case delegua_1.default.NUMERO:
            case delegua_1.default.TEXTO:
                const simboloNumeroTexto = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(-1, Number(this.linha), simboloNumeroTexto.literal);
            case delegua_1.default.PARENTESE_ESQUERDO:
                this.avancarEDevolverAnterior();
                const expressao = this.ou();
                this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                return new construtos_1.Agrupamento(-1, Number(this.linha), expressao);
            case delegua_1.default.VERDADEIRO:
                this.avancarEDevolverAnterior();
                return new construtos_1.Literal(-1, Number(this.linha), true);
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
                argumentos.push(this.ou());
            } while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.VIRGULA));
        }
        const parenteseDireito = this.consumir(delegua_1.default.PARENTESE_DIREITO, "Esperado ')' após os argumentos.");
        return new construtos_1.Chamada(-1, entidadeChamada, parenteseDireito, argumentos);
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.PONTO)) {
                const nome = this.consumir(delegua_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                expressao = new construtos_1.AcessoMetodo(-1, expressao, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(delegua_1.default.COLCHETE_ESQUERDO)) {
                const indice = this.ou();
                const simboloFechamento = this.consumir(delegua_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(-1, expressao, indice, simboloFechamento);
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
            return new construtos_1.Unario(-1, operador, direito, 'ANTES');
        }
        return this.chamar();
    }
    exponenciacao() {
        let expressao = this.unario();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EXPONENCIACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.unario();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    multiplicar() {
        let expressao = this.exponenciacao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIVISAO, delegua_1.default.DIVISAO_INTEIRA, delegua_1.default.MODULO, delegua_1.default.MULTIPLICACAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.exponenciacao();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    adicaoOuSubtracao() {
        let expressao = this.multiplicar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.SUBTRACAO, delegua_1.default.ADICAO)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.multiplicar();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    bitShift() {
        let expressao = this.adicaoOuSubtracao();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MENOR_MENOR, delegua_1.default.MAIOR_MAIOR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.adicaoOuSubtracao();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    bitE() {
        let expressao = this.bitShift();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_AND)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitShift();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    bitOu() {
        let expressao = this.bitE();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.BIT_OR, delegua_1.default.BIT_XOR)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitE();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    comparar() {
        let expressao = this.bitOu();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.MAIOR, delegua_1.default.MAIOR_IGUAL, delegua_1.default.MENOR, delegua_1.default.MENOR_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.bitOu();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.DIFERENTE, delegua_1.default.IGUAL_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(-1, expressao, operador, direito);
        }
        return expressao;
    }
    em() {
        let expressao = this.comparacaoIgualdade();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.EM)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparacaoIgualdade();
            expressao = new construtos_1.Logico(-1, expressao, operador, direito);
        }
        return expressao;
    }
    e() {
        let expressao = this.em();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.E)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.em();
            expressao = new construtos_1.Logico(-1, expressao, operador, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(delegua_1.default.OU)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.e();
            expressao = new construtos_1.Logico(-1, expressao, operador, direito);
        }
        return expressao;
    }
    declaracao() {
        return this.ou();
    }
    analisar(retornoLexador, linha) {
        this.erros = [];
        this.atual = 0;
        this.linha = linha;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        const declaracoes = [];
        while (this.atual < this.simbolos.length) {
            declaracoes.push(this.declaracao());
        }
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.MicroAvaliadorSintatico = MicroAvaliadorSintatico;
//# sourceMappingURL=micro-avaliador-sintatico.js.map