"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoVisuAlg = void 0;
const avaliador_sintatico_base_1 = require("../../avaliador-sintatico-base");
const declaracoes_1 = require("../../../declaracoes");
const construtos_1 = require("../../../construtos");
const lexador_1 = require("../../../lexador");
const visualg_1 = __importDefault(require("../../../tipos-de-simbolos/visualg"));
class AvaliadorSintaticoVisuAlg extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
    constructor() {
        super();
        this.dicionarioTiposPrimitivos = {
            caracter: 'texto',
            caractere: 'texto',
            inteiro: 'número',
            logico: 'lógico',
            real: 'número',
        };
        this.blocoPrincipalIniciado = false;
    }
    validarSegmentoAlgoritmo() {
        this.consumir(visualg_1.default.ALGORITMO, "Esperada expressão 'algoritmo' para inicializar programa.");
        this.consumir(visualg_1.default.CARACTERE, "Esperada cadeia de caracteres após palavra-chave 'algoritmo'.");
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após definição do segmento 'algoritmo'.");
    }
    criarVetorNDimensional(dimensoes) {
        if (dimensoes.length > 0) {
            const dimensao = dimensoes[0] + 1;
            const resto = dimensoes.slice(1);
            const novoArray = Array(dimensao);
            for (let i = 0; i <= dimensao; i++) {
                novoArray[i] = this.criarVetorNDimensional(resto);
            }
            return novoArray;
        }
        else {
            return undefined;
        }
    }
    validarDimensoesVetor() {
        let dimensoes = [];
        do {
            const numeroInicial = this.consumir(visualg_1.default.NUMERO, 'Esperado índice inicial para inicialização de dimensão de vetor.');
            this.consumir(visualg_1.default.PONTO, 'Esperado primeiro ponto após índice inicial para inicialização de dimensão de vetor.');
            this.consumir(visualg_1.default.PONTO, 'Esperado segundo ponto após índice inicial para inicialização de dimensão de vetor.');
            const numeroFinal = this.consumir(visualg_1.default.NUMERO, 'Esperado índice final para inicialização de dimensão de vetor.');
            dimensoes.push(Number(numeroFinal.literal) - Number(numeroInicial.literal));
        } while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.VIRGULA));
        return dimensoes;
    }
    logicaComumParametroVisuAlg() {
        const identificadores = [];
        let referencia = this.verificarSeSimboloAtualEIgualA(visualg_1.default.VAR);
        do {
            identificadores.push(this.consumir(visualg_1.default.IDENTIFICADOR, 'Esperado nome de variável.'));
        } while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.VIRGULA));
        this.consumir(visualg_1.default.DOIS_PONTOS, 'Esperado dois-pontos após nome de variável.');
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.CARACTER, visualg_1.default.CARACTERE, visualg_1.default.INTEIRO, visualg_1.default.LOGICO, visualg_1.default.REAL, visualg_1.default.VETOR)) {
            throw this.erro(this.simbolos[this.atual], `Tipo de variável não conhecido: ${this.simbolos[this.atual].lexema}`);
        }
        const simboloAnterior = this.simbolos[this.atual - 1];
        const tipoVariavel = simboloAnterior.tipo;
        return {
            identificadores,
            tipo: tipoVariavel,
            simbolo: simboloAnterior,
            referencia: referencia,
        };
    }
    /**
     * Validação do segmento de declaração de variáveis (opcional).
     * @returns Vetor de Construtos para inicialização de variáveis.
     */
    validarSegmentoVar() {
        // Podem haver linhas de comentários acima de `var`, que geram
        // quebras de linha.
        while (this.simbolos[this.atual].tipo === visualg_1.default.QUEBRA_LINHA) {
            this.avancarEDevolverAnterior();
        }
        if (!this.verificarTipoSimboloAtual(visualg_1.default.VAR)) {
            return [];
        }
        const inicializacoes = [];
        this.avancarEDevolverAnterior(); // Var
        // Quebra de linha é opcional aqui.
        // this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.QUEBRA_LINHA);
        while (!this.verificarTipoSimboloAtual(visualg_1.default.INICIO)) {
            // Se ainda houver quebras de linha, volta para o começo do `while`.
            if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.QUEBRA_LINHA)) {
                continue;
            }
            const simboloAtual = this.simbolos[this.atual];
            switch (simboloAtual.tipo) {
                case visualg_1.default.FUNCAO:
                case visualg_1.default.FUNÇÃO:
                    const dadosFuncao = this.funcao('funcao');
                    inicializacoes.push(dadosFuncao);
                    break;
                case visualg_1.default.PROCEDIMENTO:
                    const dadosProcedimento = this.declaracaoProcedimento();
                    inicializacoes.push(dadosProcedimento);
                    break;
                default:
                    const dadosVariaveis = this.logicaComumParametroVisuAlg();
                    // Se chegou até aqui, variáveis são válidas.
                    // Devem ser declaradas com um valor inicial padrão.
                    if (dadosVariaveis.tipo === visualg_1.default.VETOR) {
                        this.consumir(visualg_1.default.COLCHETE_ESQUERDO, 'Esperado colchete esquerdo após palavra reservada "vetor".');
                        const dimensoes = this.validarDimensoesVetor();
                        this.consumir(visualg_1.default.COLCHETE_DIREITO, 'Esperado colchete direito após declaração de dimensões de vetor.');
                        this.consumir(visualg_1.default.DE, 'Esperado palavra reservada "de" após declaração de dimensões de vetor.');
                        const simboloTipo = this.simbolos[this.atual];
                        if (![
                            visualg_1.default.CARACTER,
                            visualg_1.default.CARACTERE,
                            visualg_1.default.INTEIRO,
                            visualg_1.default.LOGICO,
                            visualg_1.default.REAL,
                            visualg_1.default.VETOR,
                        ].includes(simboloTipo.tipo)) {
                            throw this.erro(simboloTipo, 'Tipo de variável não conhecido para inicialização de vetor.');
                        }
                        for (let identificador of dadosVariaveis.identificadores) {
                            inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), this.criarVetorNDimensional(dimensoes)), this.dicionarioTiposPrimitivos[simboloTipo.lexema.toLowerCase()]));
                        }
                        this.atual++;
                    }
                    else {
                        for (let identificador of dadosVariaveis.identificadores) {
                            switch (dadosVariaveis.tipo) {
                                case visualg_1.default.CARACTER:
                                case visualg_1.default.CARACTERE:
                                    inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), '')));
                                    break;
                                case visualg_1.default.INTEIRO:
                                case visualg_1.default.REAL:
                                    inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), 0)));
                                    break;
                                case visualg_1.default.LOGICO:
                                    inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), false)));
                                    break;
                            }
                        }
                    }
                    break;
            }
            this.consumir(visualg_1.default.QUEBRA_LINHA, 'Esperado quebra de linha após declaração de variável.');
        }
        return inicializacoes;
    }
    validarSegmentoInicio(algoritmoOuFuncao) {
        this.consumir(visualg_1.default.INICIO, `Esperada expressão 'inicio' para marcar escopo de ${algoritmoOuFuncao}.`);
    }
    estaNoFinal() {
        return this.atual === this.simbolos.length;
    }
    metodoBibliotecaGlobal() {
        const simboloAnterior = this.simbolos[this.atual - 1];
        switch (simboloAnterior.lexema) {
            case 'int':
                return new construtos_1.Chamada(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, new lexador_1.Simbolo(visualg_1.default.IDENTIFICADOR, 'inteiro', null, Number(simboloAnterior.linha), this.hashArquivo)), null, []);
            default:
                return null;
        }
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.FALSO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), false);
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.VERDADEIRO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), true);
        if (simboloAtual.lexema === 'limpatela') {
            const variavel = new construtos_1.Variavel(this.hashArquivo, simboloAtual);
            this.avancarEDevolverAnterior();
            return new construtos_1.Chamada(this.hashArquivo, variavel, null, []);
        }
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.IDENTIFICADOR, visualg_1.default.METODO_BIBLIOTECA_GLOBAL)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.NUMERO, visualg_1.default.CARACTER, visualg_1.default.CARACTERE)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.PARENTESE_ESQUERDO)) {
            const expressao = this.expressao();
            this.consumir(visualg_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
        }
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.DIFERENTE, visualg_1.default.IGUAL)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, simboloAnterior, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.OU, visualg_1.default.XOU)) {
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
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.SETA_ATRIBUICAO)) {
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
    expressao() {
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.LEIA))
            return this.declaracaoLeia();
        return this.atribuir();
    }
    blocoEscopo() {
        const declaracoes = [];
        while (![visualg_1.default.FIM_FUNCAO, visualg_1.default.FIM_FUNÇÃO, visualg_1.default.FIM_PROCEDIMENTO].includes(this.simbolos[this.atual].tipo) &&
            !this.estaNoFinal()) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        // Se chegou até aqui, simplesmente consome o símbolo.
        this.avancarEDevolverAnterior();
        // this.consumir(tiposDeSimbolos.FIM_FUNCAO, "Esperado palavra-chave 'fimfuncao' após o bloco.");
        return declaracoes;
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.COLCHETE_ESQUERDO)) {
                const indices = [];
                do {
                    indices.push(this.expressao());
                } while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.VIRGULA));
                const indice = indices[0];
                const simboloFechamento = this.consumir(visualg_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, expressao, indice, simboloFechamento);
            }
            else {
                break;
            }
        }
        return expressao;
    }
    corpoDaFuncao(tipo) {
        const simboloAnterior = this.simbolos[this.atual - 1];
        // Parâmetros
        const parametros = this.logicaComumParametros();
        this.consumir(visualg_1.default.DOIS_PONTOS, 'Esperado dois-pontos após nome de função.');
        // Tipo retornado pela função.
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.INTEIRO, visualg_1.default.CARACTER, visualg_1.default.CARACTERE, visualg_1.default.REAL, visualg_1.default.LOGICO)) {
            throw this.erro(this.simbolos[this.atual], 'Esperado um tipo válido para retorno de função');
        }
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após tipo retornado por 'funcao'.");
        const inicializacoes = this.validarSegmentoVar();
        this.validarSegmentoInicio('função');
        const corpo = inicializacoes.concat(this.blocoEscopo());
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(simboloAnterior.linha), parametros, corpo.filter((d) => d));
    }
    declaracaoEnquanto() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.FACA, visualg_1.default.FAÇA)) {
            this.consumir(this.simbolos[this.atual].tipo, "Esperado paravra reservada 'faca' ou 'faça' após condição de continuidade em declaracão 'enquanto'.");
        }
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'faca' em declaracão 'enquanto'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![visualg_1.default.FIM_ENQUANTO].includes(this.simbolos[this.atual].tipo));
        this.consumir(visualg_1.default.FIM_ENQUANTO, "Esperado palavra-chave 'fimenquanto' para fechamento de declaração 'enquanto'.");
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra-chave 'fimenquanto'.");
        return new declaracoes_1.Enquanto(condicao, new declaracoes_1.Bloco(simboloAtual.hashArquivo, Number(simboloAtual.linha), declaracoes.filter((d) => d)));
    }
    logicaCasosEscolha() {
        const literais = [];
        let simboloAtualCaso = this.simbolos[this.atual];
        while (simboloAtualCaso.tipo !== visualg_1.default.QUEBRA_LINHA) {
            literais.push(this.primario());
            this.verificarSeSimboloAtualEIgualA(visualg_1.default.VIRGULA);
            simboloAtualCaso = this.simbolos[this.atual];
        }
        return literais;
    }
    declaracaoEscolha() {
        const simboloAtual = this.avancarEDevolverAnterior();
        // Parênteses são opcionais para delimitar o identificador.
        this.verificarSeSimboloAtualEIgualA(visualg_1.default.PARENTESE_ESQUERDO);
        const identificador = this.primario();
        this.verificarSeSimboloAtualEIgualA(visualg_1.default.PARENTESE_DIREITO);
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após variável ou literal de declaração 'caso'.");
        while (this.simbolos[this.atual].tipo === visualg_1.default.QUEBRA_LINHA) {
            this.avancarEDevolverAnterior();
        }
        // Blocos de caso
        const caminhos = [];
        let simboloAtualBlocoCaso = this.avancarEDevolverAnterior();
        while (![visualg_1.default.OUTRO_CASO, visualg_1.default.FIM_ESCOLHA].includes(simboloAtualBlocoCaso.tipo)) {
            const caminhoCondicoes = this.logicaCasosEscolha();
            const declaracoes = [];
            do {
                declaracoes.push(this.resolverDeclaracaoForaDeBloco());
            } while (![visualg_1.default.CASO, visualg_1.default.OUTRO_CASO, visualg_1.default.FIM_ESCOLHA].includes(this.simbolos[this.atual].tipo));
            caminhos.push({
                condicoes: caminhoCondicoes.filter((c) => c),
                declaracoes: declaracoes.filter((d) => d),
            });
            while (this.simbolos[this.atual].tipo === visualg_1.default.QUEBRA_LINHA) {
                this.avancarEDevolverAnterior();
            }
            simboloAtualBlocoCaso = this.avancarEDevolverAnterior();
        }
        let caminhoPadrao = null;
        if (simboloAtualBlocoCaso.tipo === visualg_1.default.OUTRO_CASO) {
            const declaracoes = [];
            do {
                declaracoes.push(this.resolverDeclaracaoForaDeBloco());
            } while (!this.verificarTipoSimboloAtual(visualg_1.default.FIM_ESCOLHA));
            caminhoPadrao = {
                declaracoes: declaracoes.filter((d) => d),
            };
            simboloAtualBlocoCaso = this.avancarEDevolverAnterior();
        }
        if (simboloAtualBlocoCaso.tipo !== visualg_1.default.FIM_ESCOLHA) {
            throw this.erro(this.simbolos[this.atual], "Esperado palavra-chave 'fimescolha' para fechamento de declaração 'escolha'.");
        }
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra-chave 'fimescolha'.");
        return new declaracoes_1.Escolha(identificador, caminhos, caminhoPadrao);
    }
    logicaComumEscreva() {
        const simboloParenteses = this.consumir(visualg_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes dos valores em escreva.");
        const argumentos = [];
        // Sem não houver parâmetros, retorna vetor com literal vazio.
        if (this.simbolos[this.atual].tipo === visualg_1.default.PARENTESE_DIREITO) {
            this.avancarEDevolverAnterior();
            return [
                new construtos_1.FormatacaoEscrita(this.hashArquivo, Number(simboloParenteses.linha), new construtos_1.Literal(this.hashArquivo, Number(simboloParenteses.linha), '')),
            ];
        }
        do {
            const valor = this.resolverDeclaracaoForaDeBloco();
            let espacos = 0;
            let casasDecimais = 0;
            if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.DOIS_PONTOS)) {
                // Espaços
                const simboloEspacos = this.consumir(visualg_1.default.NUMERO, 'Esperado número após sinal de dois-pontos após identificador como argumento.');
                espacos = Number(simboloEspacos.lexema) - 1;
            }
            if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.DOIS_PONTOS)) {
                // Casas decimais
                const simboloCasasDecimais = this.consumir(visualg_1.default.NUMERO, 'Esperado número após segundo sinal de dois-pontos após identificador como argumento.');
                casasDecimais = Number(simboloCasasDecimais.lexema);
            }
            argumentos.push(new construtos_1.FormatacaoEscrita(this.hashArquivo, Number(simboloParenteses.linha), valor, espacos, casasDecimais));
        } while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.VIRGULA));
        this.consumir(visualg_1.default.PARENTESE_DIREITO, "Esperado ')' após os valores em escreva.");
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após fechamento de parênteses pós instrução 'escreva'.");
        return argumentos;
    }
    declaracaoEscreva() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const argumentos = this.logicaComumEscreva();
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), this.hashArquivo, argumentos);
    }
    declaracaoEscrevaMesmaLinha() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const argumentos = this.logicaComumEscreva();
        return new declaracoes_1.EscrevaMesmaLinha(Number(simboloAtual.linha), this.hashArquivo, argumentos);
    }
    /**
     * Criação de declaração "repita".
     * @returns Um construto do tipo Fazer
     */
    declaracaoFazer() {
        const simboloAtual = this.avancarEDevolverAnterior();
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após instrução 'repita'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![visualg_1.default.ATE, visualg_1.default.ATÉ].includes(this.simbolos[this.atual].tipo));
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.ATE, visualg_1.default.ATÉ)) {
            this.consumir(this.simbolos[this.atual].tipo, "Esperado palavra-chave 'ate' ou 'até' após declaração de bloco em instrução 'repita'.");
        }
        const condicao = this.expressao();
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após condição de continuidade em instrução 'repita'.");
        return new declaracoes_1.Fazer(this.hashArquivo, Number(simboloAtual.linha), new declaracoes_1.Bloco(this.hashArquivo, Number(simboloAtual.linha), declaracoes.filter((d) => d)), condicao);
    }
    /**
     * Criação de declaração "interrompa".
     * Em VisuAlg, "sustar" é chamada de "interrompa".
     * @returns Uma declaração do tipo Sustar.
     */
    declaracaoInterrompa() {
        const simboloAtual = this.avancarEDevolverAnterior();
        // TODO: Contar blocos para colocar esta condição de erro.
        /* if (this.blocos < 1) {
            this.erro(this.simbolos[this.atual - 1], "'interrompa' deve estar dentro de um laço de repetição.");
        } */
        return new declaracoes_1.Sustar(simboloAtual);
    }
    /**
     * Análise de uma declaração `leia()`. No VisuAlg, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia() {
        const simboloLeia = this.avancarEDevolverAnterior();
        this.consumir(visualg_1.default.PARENTESE_ESQUERDO, "Esperado '(' antes do argumento em instrução `leia`.");
        const argumentos = [];
        do {
            argumentos.push(this.resolverDeclaracaoForaDeBloco());
        } while (this.verificarSeSimboloAtualEIgualA(visualg_1.default.VIRGULA));
        this.consumir(visualg_1.default.PARENTESE_DIREITO, "Esperado ')' após o argumento em instrução `leia`.");
        this.consumir(visualg_1.default.QUEBRA_LINHA, 'Esperado quebra de linha após fechamento de parênteses pós instrução `leia`.');
        return new declaracoes_1.Leia(simboloLeia, argumentos);
    }
    declaracaoPara() {
        const simboloPara = this.avancarEDevolverAnterior();
        const variavelIteracao = this.consumir(visualg_1.default.IDENTIFICADOR, "Esperado identificador de variável após 'para'.");
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.DE, visualg_1.default.SETA_ATRIBUICAO)) {
            throw this.erro(this.simbolos[this.atual], "Esperado palavra reservada 'de' ou seta de atribuição após variável de controle de 'para'.");
        }
        const literalOuVariavelInicio = this.adicaoOuSubtracao();
        this.consumir(visualg_1.default.ATE, "Esperado palavra reservada 'ate' após valor inicial do laço de repetição 'para'.");
        const literalOuVariavelFim = this.adicaoOuSubtracao();
        let operadorCondicao = new lexador_1.Simbolo(visualg_1.default.MENOR_IGUAL, '', '', Number(simboloPara.linha), this.hashArquivo);
        let operadorCondicaoIncremento = new lexador_1.Simbolo(visualg_1.default.MENOR, '', '', Number(simboloPara.linha), this.hashArquivo);
        // Isso existe porque o laço `para` do VisuAlg pode ter o passo positivo ou negativo
        // dependendo dos operandos de início e fim, que só são possíveis de determinar
        // em tempo de execução.
        // Quando um dos operandos é uma variável, tanto a condição do laço quanto o
        // passo são considerados indefinidos aqui.
        let passo;
        let resolverIncrementoEmExecucao = false;
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.PASSO)) {
            passo = this.unario();
            if (passo.hasOwnProperty('operador') && passo.operador.tipo === visualg_1.default.SUBTRACAO) {
                operadorCondicao = new lexador_1.Simbolo(visualg_1.default.MAIOR_IGUAL, '', '', Number(simboloPara.linha), this.hashArquivo);
                operadorCondicaoIncremento = new lexador_1.Simbolo(visualg_1.default.MAIOR, '', '', Number(simboloPara.linha), this.hashArquivo);
            }
        }
        else {
            if (literalOuVariavelInicio instanceof construtos_1.Literal && literalOuVariavelFim instanceof construtos_1.Literal) {
                if (literalOuVariavelInicio.valor > literalOuVariavelFim.valor) {
                    passo = new construtos_1.Unario(this.hashArquivo, new lexador_1.Simbolo(visualg_1.default.SUBTRACAO, '-', undefined, simboloPara.linha, simboloPara.hashArquivo), new construtos_1.Literal(this.hashArquivo, Number(simboloPara.linha), 1), 'ANTES');
                    operadorCondicao = new lexador_1.Simbolo(visualg_1.default.MAIOR_IGUAL, '', '', Number(simboloPara.linha), this.hashArquivo);
                    operadorCondicaoIncremento = new lexador_1.Simbolo(visualg_1.default.MAIOR, '', '', Number(simboloPara.linha), this.hashArquivo);
                }
                else {
                    passo = new construtos_1.Literal(this.hashArquivo, Number(simboloPara.linha), 1);
                }
            }
            else {
                // Passo e operador de condição precisam ser resolvidos em tempo de execução.
                passo = undefined;
                operadorCondicao = undefined;
                operadorCondicaoIncremento = undefined;
                resolverIncrementoEmExecucao = true;
            }
        }
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.FACA, visualg_1.default.FAÇA)) {
            this.consumir(this.simbolos[this.atual].tipo, "Esperado palavra reservada 'faca' ou 'faça' após valor final do laço de repetição 'para'.");
        }
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'faca' do laço de repetição 'para'.");
        const declaracoesBlocoPara = [];
        let simboloAtualBlocoPara = this.simbolos[this.atual];
        while (simboloAtualBlocoPara.tipo !== visualg_1.default.FIM_PARA) {
            declaracoesBlocoPara.push(this.resolverDeclaracaoForaDeBloco());
            simboloAtualBlocoPara = this.simbolos[this.atual];
        }
        this.consumir(visualg_1.default.FIM_PARA, '');
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'fimpara'.");
        const corpo = new declaracoes_1.Bloco(this.hashArquivo, Number(simboloPara.linha) + 1, declaracoesBlocoPara.filter((d) => d));
        const para = new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), 
        // Inicialização.
        new construtos_1.Atribuir(this.hashArquivo, variavelIteracao, literalOuVariavelInicio), 
        // Condição.
        new construtos_1.Binario(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, variavelIteracao), operadorCondicao, literalOuVariavelFim), 
        // Incremento, feito em construto especial `FimPara`.
        new construtos_1.FimPara(this.hashArquivo, Number(simboloPara.linha), new construtos_1.Binario(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, variavelIteracao), operadorCondicaoIncremento, literalOuVariavelFim), new declaracoes_1.Expressao(new construtos_1.Atribuir(this.hashArquivo, variavelIteracao, new construtos_1.Binario(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, variavelIteracao), new lexador_1.Simbolo(visualg_1.default.ADICAO, '', null, Number(simboloPara.linha), this.hashArquivo), passo)))), corpo);
        para.blocoPosExecucao = corpo;
        para.resolverIncrementoEmExecucao = resolverIncrementoEmExecucao;
        return para;
    }
    logicaComumParametros() {
        const parametros = [];
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.PARENTESE_ESQUERDO)) {
            while (!this.verificarTipoSimboloAtual(visualg_1.default.PARENTESE_DIREITO)) {
                const dadosParametros = this.logicaComumParametroVisuAlg();
                for (let parametro of dadosParametros.identificadores) {
                    parametros.push({
                        abrangencia: 'padrao',
                        nome: parametro,
                        referencia: dadosParametros.referencia,
                    });
                }
            }
            // Consumir parêntese direito
            this.consumir(visualg_1.default.PARENTESE_DIREITO, 'Esperado parêntese direito para finalização da leitura de parâmetros.');
        }
        return parametros;
    }
    /**
     * Procedimentos nada mais são do que funções que não retornam valor.
     */
    declaracaoProcedimento() {
        const simboloProcedimento = this.avancarEDevolverAnterior();
        const nomeProcedimento = this.consumir(visualg_1.default.IDENTIFICADOR, 'Esperado nome do procedimento após palavra-chave `procedimento`.');
        // Parâmetros
        const parametros = this.logicaComumParametros();
        const inicializacoes = this.validarSegmentoVar();
        this.validarSegmentoInicio('procedimento');
        const corpo = inicializacoes.concat(this.blocoEscopo());
        return new declaracoes_1.FuncaoDeclaracao(nomeProcedimento, new construtos_1.FuncaoConstruto(this.hashArquivo, Number(simboloProcedimento.linha), parametros, corpo.filter((d) => d)));
    }
    declaracaoRetorna() {
        const simboloRetorna = this.avancarEDevolverAnterior();
        let valor = null;
        if ([
            visualg_1.default.CARACTER,
            visualg_1.default.CARACTERE,
            visualg_1.default.IDENTIFICADOR,
            visualg_1.default.NUMERO,
            visualg_1.default.VERDADEIRO,
            visualg_1.default.NEGACAO,
            visualg_1.default.FALSO,
            visualg_1.default.PARENTESE_ESQUERDO,
        ].includes(this.simbolos[this.atual].tipo)) {
            valor = this.expressao();
        }
        return new declaracoes_1.Retorna(simboloRetorna, valor);
    }
    declaracaoSe() {
        const simboloSe = this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        if (!this.verificarSeSimboloAtualEIgualA(visualg_1.default.ENTAO, visualg_1.default.ENTÃO)) {
            this.consumir(this.simbolos[this.atual].tipo, "Esperado palavra reservada 'entao' ou 'então' após condição em declaração 'se'.");
        }
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'entao' em declaração 'se'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![visualg_1.default.SENAO, visualg_1.default.SENÃO, visualg_1.default.FIM_SE].includes(this.simbolos[this.atual].tipo));
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(visualg_1.default.SENAO, visualg_1.default.SENÃO)) {
            const simboloSenao = this.simbolos[this.atual - 1];
            const declaracoesSenao = [];
            do {
                declaracoesSenao.push(this.resolverDeclaracaoForaDeBloco());
            } while (![visualg_1.default.FIM_SE].includes(this.simbolos[this.atual].tipo));
            caminhoSenao = new declaracoes_1.Bloco(this.hashArquivo, Number(simboloSenao.linha), declaracoesSenao.filter((d) => d));
        }
        this.consumir(visualg_1.default.FIM_SE, "Esperado palavra-chave 'fimse' para fechamento de declaração 'se'.");
        this.consumir(visualg_1.default.QUEBRA_LINHA, "Esperado quebra de linha após palavra-chave 'fimse'.");
        return new declaracoes_1.Se(condicao, new declaracoes_1.Bloco(this.hashArquivo, Number(simboloSe.linha), declaracoes.filter((d) => d)), [], caminhoSenao);
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case visualg_1.default.ENQUANTO:
                return this.declaracaoEnquanto();
            case visualg_1.default.ESCOLHA:
                return this.declaracaoEscolha();
            case visualg_1.default.ESCREVA:
                return this.declaracaoEscrevaMesmaLinha();
            case visualg_1.default.ESCREVA_LINHA:
                return this.declaracaoEscreva();
            case visualg_1.default.FUNCAO:
                return this.funcao('funcao');
            case visualg_1.default.INICIO:
                this.validarSegmentoInicio('algoritmo');
                return null;
            case visualg_1.default.INTERROMPA:
                return this.declaracaoInterrompa();
            case visualg_1.default.LEIA:
                return this.declaracaoLeia();
            case visualg_1.default.PARA:
                return this.declaracaoPara();
            case visualg_1.default.PARENTESE_DIREITO:
                throw new Error('Não deveria estar caindo aqui.');
            case visualg_1.default.PROCEDIMENTO:
                return this.declaracaoProcedimento();
            case visualg_1.default.QUEBRA_LINHA:
                this.avancarEDevolverAnterior();
                return null;
            case visualg_1.default.REPITA:
                return this.declaracaoFazer();
            case visualg_1.default.RETORNE:
                return this.declaracaoRetorna();
            case visualg_1.default.SE:
                return this.declaracaoSe();
            case visualg_1.default.VAR:
                if (this.blocoPrincipalIniciado) {
                    throw this.erro(this.simbolos[this.atual], 'Sintaxe incorreta: início do bloco principal já foi declarado.');
                }
                return this.validarSegmentoVar();
            default:
                return this.expressao();
        }
    }
    /**
     * No VisuAlg, há uma determinada cadência de validação de símbolos.
     * - O primeiro símbolo é `algoritmo`, seguido por um identificador e
     * uma quebra de linha.
     * - Os próximos símbolo pode `var`, que pode ser seguido por uma série de
     * declarações de variáveis e finalizado por uma quebra de linha,
     * ou ainda `funcao` ou `procedimento`, seguidos dos devidos símbolos que definem
     * os blocos.
     * - O penúltimo símbolo é `inicio`, seguido por uma quebra de linha.
     * Pode haver ou não declarações dentro do bloco.
     * - O último símbolo deve ser `fimalgoritmo`, que também é usado para
     * definir quando não existem mais construtos a serem adicionados.
     * @param retornoLexador Os símbolos entendidos pelo Lexador.
     * @param hashArquivo Obrigatório por interface mas não usado aqui.
     */
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.blocoPrincipalIniciado = false;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        while (this.verificarTipoSimboloAtual(visualg_1.default.QUEBRA_LINHA)) {
            this.avancarEDevolverAnterior();
        }
        let declaracoes = [];
        this.validarSegmentoAlgoritmo();
        while (!this.estaNoFinal() && this.simbolos[this.atual].tipo !== visualg_1.default.FIM_ALGORITMO) {
            const declaracao = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(declaracao)) {
                declaracoes = declaracoes.concat(declaracao);
            }
            else {
                declaracoes.push(declaracao);
            }
        }
        return {
            declaracoes: declaracoes.filter((d) => d),
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoVisuAlg = AvaliadorSintaticoVisuAlg;
//# sourceMappingURL=avaliador-sintatico-visualg.js.map