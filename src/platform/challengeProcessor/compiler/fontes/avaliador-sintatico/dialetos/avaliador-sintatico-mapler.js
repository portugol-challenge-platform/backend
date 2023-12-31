"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoMapler = void 0;
const avaliador_sintatico_base_1 = require("../avaliador-sintatico-base");
const declaracoes_1 = require("../../declaracoes");
const construtos_1 = require("../../construtos");
const mapler_1 = __importDefault(require("../../tipos-de-simbolos/mapler"));
class AvaliadorSintaticoMapler extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
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
            const numeroInicial = this.consumir(mapler_1.default.NUMERO, 'Esperado índice inicial para inicialização de dimensão de vetor.');
            this.consumir(mapler_1.default.PONTO, 'Esperado primeiro ponto após índice inicial para inicialização de dimensão de vetor.');
            this.consumir(mapler_1.default.PONTO, 'Esperado segundo ponto após índice inicial para inicialização de dimensão de vetor.');
            const numeroFinal = this.consumir(mapler_1.default.NUMERO, 'Esperado índice final para inicialização de dimensão de vetor.');
            dimensoes.push(Number(numeroFinal.literal) - Number(numeroInicial.literal));
        } while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.VIRGULA));
        return dimensoes;
    }
    logicaComumParametroMapler() {
        const identificadores = [];
        do {
            identificadores.push(this.consumir(mapler_1.default.IDENTIFICADOR, 'Esperado nome de variável.'));
        } while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.VIRGULA));
        this.consumir(mapler_1.default.DOIS_PONTOS, 'Esperado dois-pontos após nome de variável.');
        if (!this.verificarSeSimboloAtualEIgualA(mapler_1.default.CADEIA, mapler_1.default.CARACTERE, mapler_1.default.INTEIRO, mapler_1.default.LOGICO, mapler_1.default.REAL, mapler_1.default.VETOR)) {
            throw this.erro(this.simbolos[this.atual], 'Tipo de variável não conhecido.');
        }
        const simboloAnterior = this.simbolos[this.atual - 1];
        const tipoVariavel = simboloAnterior.tipo;
        return {
            identificadores,
            tipo: tipoVariavel,
            simbolo: simboloAnterior,
        };
    }
    /**
     * Validação do segmento de declaração de variáveis (opcional).
     * @returns Vetor de Construtos para inicialização de variáveis.
     */
    validarSegmentoVariaveis() {
        const inicializacoes = [];
        while (!this.verificarTipoSimboloAtual(mapler_1.default.INICIO)) {
            const simboloAtual = this.simbolos[this.atual];
            switch (simboloAtual.tipo) {
                // case tiposDeSimbolos.PROCEDIMENTO:
                //     const dadosProcedimento = this.declaracaoProcedimento();
                //     inicializacoes.push(dadosProcedimento);
                //     break;
                default:
                    const dadosVariaveis = this.logicaComumParametroMapler();
                    // Se chegou até aqui, variáveis são válidas.
                    // Devem ser declaradas com um valor inicial padrão.
                    for (let identificador of dadosVariaveis.identificadores) {
                        switch (dadosVariaveis.tipo) {
                            case mapler_1.default.CADEIA:
                            case mapler_1.default.CARACTERE:
                                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), '')));
                                break;
                            case mapler_1.default.INTEIRO:
                            case mapler_1.default.REAL:
                                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), 0)));
                                break;
                            case mapler_1.default.LOGICO:
                                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), false)));
                                break;
                            case mapler_1.default.VETOR:
                                // TODO: Validar vetor
                                this.consumir(mapler_1.default.COLCHETE_ESQUERDO, 'Esperado colchete esquerdo após palavra reservada "vetor".');
                                const dimensoes = this.validarDimensoesVetor();
                                this.consumir(mapler_1.default.COLCHETE_DIREITO, 'Esperado colchete direito após declaração de dimensões de vetor.');
                                this.consumir(mapler_1.default.DE, 'Esperado palavra reservada "de" após declaração de dimensões de vetor.');
                                if (!this.verificarSeSimboloAtualEIgualA(mapler_1.default.CARACTERE, mapler_1.default.INTEIRO, mapler_1.default.LOGICO, mapler_1.default.REAL, mapler_1.default.VETOR)) {
                                    throw this.erro(this.simbolos[this.atual], 'Tipo de variável não conhecido para inicialização de vetor.');
                                }
                                inicializacoes.push(new declaracoes_1.Var(identificador, new construtos_1.Literal(this.hashArquivo, Number(dadosVariaveis.simbolo.linha), this.criarVetorNDimensional(dimensoes))));
                                break;
                        }
                    }
                    break;
            }
            this.consumir(mapler_1.default.PONTO_VIRGULA, "Esperado ';' após declaração de variável.");
        }
        return inicializacoes;
    }
    estaNoFinal() {
        return this.atual === this.simbolos.length;
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.FALSO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), false);
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.VERDADEIRO))
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAtual.linha), true);
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.IDENTIFICADOR)) {
            return new construtos_1.Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        }
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.NUMERO, mapler_1.default.CADEIA, mapler_1.default.CARACTERE)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            return new construtos_1.Literal(this.hashArquivo, Number(simboloAnterior.linha), simboloAnterior.literal);
        }
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.PARENTESE_ESQUERDO)) {
            const expressao = this.expressao();
            this.consumir(mapler_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
            return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
        }
        //TODO: @Samuel
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.PONTO_VIRGULA)) {
            return null;
        }
        throw this.erro(this.simbolos[this.atual], 'Esperado expressão.');
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.DIFERENTE, mapler_1.default.IGUAL)) {
            const simboloAnterior = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, simboloAnterior, direito);
        }
        return expressao;
    }
    ou() {
        let expressao = this.e();
        while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.OU /*, tiposDeSimbolos.XOU*/)) {
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
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.SETA_ATRIBUICAO)) {
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
        if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.LER))
            return this.declaracaoLeia();
        return this.atribuir();
    }
    blocoEscopo() {
        const declaracoes = [];
        // while (![
        //         tiposDeSimbolos.FIM_FUNCAO,
        //         tiposDeSimbolos.FIM_PROCEDIMENTO
        //     ].includes(this.simbolos[this.atual].tipo) && !this.estaNoFinal())
        // {
        //     declaracoes.push(this.declaracao());
        // }
        // Se chegou até aqui, simplesmente consome o símbolo.
        this.avancarEDevolverAnterior();
        // this.consumir(tiposDeSimbolos.FIM_FUNCAO, "Esperado palavra-chave 'fimfuncao' após o bloco.");
        return declaracoes;
    }
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.PARENTESE_ESQUERDO)) {
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.COLCHETE_ESQUERDO)) {
                const indices = [];
                do {
                    indices.push(this.expressao());
                } while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.VIRGULA));
                const indice = indices[0];
                const simboloFechamento = this.consumir(mapler_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
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
        this.consumir(mapler_1.default.DOIS_PONTOS, 'Esperado dois-pontos após nome de função.');
        // this.consumir(tiposDeSimbolos.QUEBRA_LINHA, "Esperado quebra de linha após tipo retornado por 'funcao'.");
        this.validarSegmentoVariaveis();
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(simboloAnterior.linha), null, corpo);
    }
    declaracaoEnquanto() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        this.consumir(mapler_1.default.FACA, "Esperado paravra reservada 'faca' após condição de continuidade em declaracão 'enquanto'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![mapler_1.default.FIM].includes(this.simbolos[this.atual].tipo) &&
            ![mapler_1.default.ENQUANTO].includes(this.simbolos[this.atual + 1].tipo));
        this.consumir(mapler_1.default.FIM, "Esperado palavra-chave 'fim' para iniciar o fechamento de declaração 'enquanto'.");
        this.consumir(mapler_1.default.ENQUANTO, "Esperado palavra-chave 'enquanto' para o fechamento de declaração 'enquanto'.");
        this.consumir(mapler_1.default.PONTO_VIRGULA, "Esperado palavra-chave ';' para o fechamento de declaração 'enquanto'.");
        return new declaracoes_1.Enquanto(condicao, new declaracoes_1.Bloco(simboloAtual.hashArquivo, Number(simboloAtual.linha), declaracoes.filter((d) => d)));
    }
    declaracaoEscolha() {
        throw new Error('Método não implementado.');
    }
    logicaComumEscreva() {
        const simboloAtual = this.simbolos[this.atual];
        const argumentos = [];
        do {
            const valor = this.resolverDeclaracaoForaDeBloco();
            argumentos.push(new construtos_1.FormatacaoEscrita(this.hashArquivo, Number(simboloAtual.linha), valor));
        } while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.VIRGULA));
        this.consumir(mapler_1.default.PONTO_VIRGULA, "Esperado quebra de linha após fechamento de parênteses pós instrução 'escreva'.");
        return argumentos;
    }
    declaracaoEscreva() {
        throw new Error('Método não implementado.');
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
        // this.consumir(tiposDeSimbolos.QUEBRA_LINHA, "Esperado quebra de linha após instrução 'repita'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![mapler_1.default.ATE].includes(this.simbolos[this.atual].tipo));
        this.consumir(mapler_1.default.ATE, "Esperado palavra-chave 'ate' após declaração de bloco em instrução 'repita'.");
        const condicao = this.expressao();
        // this.consumir(
        //     tiposDeSimbolos.QUEBRA_LINHA,
        //     "Esperado quebra de linha após condição de continuidade em instrução 'repita'."
        // );
        return new declaracoes_1.Fazer(this.hashArquivo, Number(simboloAtual.linha), new declaracoes_1.Bloco(this.hashArquivo, Number(simboloAtual.linha), declaracoes.filter((d) => d)), condicao);
    }
    /**
     * Criação de declaração "interrompa".
     * Em Mapler, "sustar" é chamada de "interrompa".
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
     * Análise de uma declaração `leia()`. No Mapler, `leia()` aceita 1..N argumentos.
     * @returns Uma declaração `Leia`.
     */
    declaracaoLeia() {
        const simboloAtual = this.avancarEDevolverAnterior();
        // this.consumir(tiposDeSimbolos.PARENTESE_ESQUERDO, "Esperado '(' antes do argumento em instrução `leia`.");
        const argumentos = [];
        do {
            argumentos.push(this.resolverDeclaracaoForaDeBloco());
        } while (this.verificarSeSimboloAtualEIgualA(mapler_1.default.PONTO_VIRGULA));
        // this.consumir(tiposDeSimbolos.PARENTESE_DIREITO, "Esperado ')' após o argumento em instrução `leia`.");
        // this.consumir(
        //     tiposDeSimbolos.QUEBRA_LINHA,
        //     'Esperado quebra de linha após fechamento de parênteses pós instrução `leia`.'
        // );
        return new declaracoes_1.Leia(simboloAtual, argumentos);
    }
    declaracaoPara() {
        throw new Error('Método não implementado.');
        // const simboloPara: SimboloInterface = this.avancarEDevolverAnterior();
        // const variavelIteracao = this.consumir(
        //     tiposDeSimbolos.IDENTIFICADOR,
        //     "Esperado identificador de variável após 'para'."
        // );
        // this.consumir(tiposDeSimbolos.DE, "Esperado palavra reservada 'de' após variável de controle de 'para'.");
        // const numeroInicio = this.consumir(
        //     tiposDeSimbolos.NUMERO,
        //     "Esperado literal ou variável após 'de' em declaração 'para'."
        // );
        // this.consumir(
        //     tiposDeSimbolos.ATE,
        //     "Esperado palavra reservada 'ate' após valor inicial do laço de repetição 'para'."
        // );
        // const numeroFim = this.consumir(
        //     tiposDeSimbolos.NUMERO,
        //     "Esperado literal ou variável após 'de' em declaração 'para'."
        // );
        // this.consumir(
        //     tiposDeSimbolos.FACA,
        //     "Esperado palavra reservada 'faca' após valor final do laço de repetição 'para'."
        // );
        // this.consumir(
        //     tiposDeSimbolos.QUEBRA_LINHA,
        //     "Esperado quebra de linha após palavra reservada 'faca' do laço de repetição 'para'."
        // );
        // const declaracoesBlocoPara = [];
        // let simboloAtualBlocoPara: SimboloInterface = this.simbolos[this.atual];
        // while (simboloAtualBlocoPara.tipo !== tiposDeSimbolos.FIM_PARA) {
        //     declaracoesBlocoPara.push(this.declaracao());
        //     simboloAtualBlocoPara = this.simbolos[this.atual];
        // }
        // this.consumir(tiposDeSimbolos.FIM_PARA, '');
        // this.consumir(tiposDeSimbolos.QUEBRA_LINHA, "Esperado quebra de linha após palavra reservada 'fimpara'.");
        // const corpo = new Bloco(
        //     this.hashArquivo,
        //     Number(simboloPara.linha) + 1,
        //     declaracoesBlocoPara.filter((d) => d)
        // );
        // return new Para(
        //     this.hashArquivo,
        //     Number(simboloPara.linha),
        //     new Atribuir(
        //         this.hashArquivo,
        //         variavelIteracao,
        //         new Literal(this.hashArquivo, Number(simboloPara.linha), numeroInicio.literal)
        //     ),
        //     new Binario(
        //         this.hashArquivo,
        //         new Variavel(this.hashArquivo, variavelIteracao),
        //         new Simbolo(tiposDeSimbolos.MENOR_IGUAL, '', '', Number(simboloPara.linha), this.hashArquivo),
        //         new Literal(this.hashArquivo, Number(simboloPara.linha), numeroFim.literal)
        //     ),
        //     new Atribuir(
        //         this.hashArquivo,
        //         variavelIteracao,
        //         new Binario(
        //             this.hashArquivo,
        //             new Variavel(this.hashArquivo, variavelIteracao),
        //             new Simbolo(tiposDeSimbolos.ADICAO, '', null, Number(simboloPara.linha), this.hashArquivo),
        //             new Literal(this.hashArquivo, Number(simboloPara.linha), 1)
        //         )
        //     ),
        //     corpo
        // );
    }
    // logicaComumParametros(): ParametroInterface[] {
    //     const parametros: ParametroInterface[] = [];
    //     if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PARENTESE_ESQUERDO)) {
    //         while (!this.verificarTipoSimboloAtual(tiposDeSimbolos.PARENTESE_DIREITO)) {
    //             const dadosParametros = this.logicaComumParametroMapler();
    //             for (let parametro of dadosParametros.identificadores) {
    //                 parametros.push({
    //                     abrangencia: 'padrao',
    //                     nome: parametro
    //                 });
    //             }
    //         }
    //         // Consumir parêntese direito
    //         this.consumir(
    //             tiposDeSimbolos.PARENTESE_DIREITO,
    //             "Esperado parêntese direito para finalização da leitura de parâmetros."
    //         )
    //     }
    //     return parametros;
    // }
    /**
     * Procedimentos nada mais são do que funções que não retornam valor.
     */
    // declaracaoProcedimento() {
    //     const simboloProcedimento: SimboloInterface = this.avancarEDevolverAnterior();
    //     const nomeProcedimento = this.consumir(tiposDeSimbolos.IDENTIFICADOR,
    //         "Esperado nome do procedimento após palavra-chave `procedimento`.");
    //     // Parâmetros
    //     const parametros = this.logicaComumParametros();
    //     this.validarSegmentoVariaveis();
    //     this.validarSegmentoInicio('procedimento');
    //     const corpo = this.blocoEscopo();
    //     return new FuncaoDeclaracao(
    //         nomeProcedimento, new FuncaoConstruto(
    //             this.hashArquivo,
    //             Number(simboloProcedimento.linha),
    //             parametros,
    //             corpo.filter(d => d)
    //         )
    //     );
    // }
    declaracaoSe() {
        const simboloSe = this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        this.consumir(mapler_1.default.ENTAO, "Esperado palavra reservada 'entao' após condição em declaração 'se'.");
        const declaracoes = [];
        let caminhoSenao = null;
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
            if (this.verificarSeSimboloAtualEIgualA(mapler_1.default.SENAO)) {
                const simboloSenao = this.simbolos[this.atual - 1];
                const declaracoesSenao = [];
                do {
                    declaracoesSenao.push(this.resolverDeclaracaoForaDeBloco());
                } while (![mapler_1.default.FIM].includes(this.simbolos[this.atual].tipo) &&
                    ![mapler_1.default.SE].includes(this.simbolos[this.atual + 1].tipo));
                caminhoSenao = new declaracoes_1.Bloco(this.hashArquivo, Number(simboloSenao.linha), declaracoesSenao.filter((d) => d));
            }
        } while (![mapler_1.default.FIM].includes(this.simbolos[this.atual].tipo) &&
            ![mapler_1.default.SE].includes(this.simbolos[this.atual + 1].tipo));
        this.consumir(mapler_1.default.FIM, "Esperado palavra-chave 'fim' para iniciar o fechamento de declaração 'se'.");
        this.consumir(mapler_1.default.SE, "Esperado palavra-chave 'se' para o fechamento de declaração 'se'.");
        this.consumir(mapler_1.default.PONTO_VIRGULA, "Esperado palavra-chave ';' para o fechamento de declaração 'se'.");
        return new declaracoes_1.Se(condicao, new declaracoes_1.Bloco(this.hashArquivo, Number(simboloSe.linha), declaracoes.filter((d) => d)), [], caminhoSenao);
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case mapler_1.default.ENQUANTO:
                return this.declaracaoEnquanto();
            case mapler_1.default.ESCREVER:
                return this.declaracaoEscrevaMesmaLinha();
            // case tiposDeSimbolos.FUNCAO:
            //     return this.funcao('funcao');
            // case tiposDeSimbolos.INTERROMPA:
            //     return this.declaracaoInterrompa();
            case mapler_1.default.LER:
                return this.declaracaoLeia();
            case mapler_1.default.PARA:
                return this.declaracaoPara();
            // case tiposDeSimbolos.PARENTESE_DIREITO:
            //     throw new Error('Não deveria estar caindo aqui.');
            // case tiposDeSimbolos.PROCEDIMENTO:
            //     return this.declaracaoProcedimento();
            case mapler_1.default.REPITA:
                return this.declaracaoFazer();
            case mapler_1.default.SE:
                return this.declaracaoSe();
            default:
                return this.expressao();
        }
    }
    /**
     * No Mapler, há uma determinada cadência de validação de símbolos.
     * @param retornoLexador Os símbolos entendidos pelo Lexador.
     * @param hashArquivo Obrigatório por interface mas não usado aqui.
     */
    analisar(retornoLexador, hashArquivo) {
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.hashArquivo = hashArquivo || 0;
        this.simbolos = (retornoLexador === null || retornoLexador === void 0 ? void 0 : retornoLexador.simbolos) || [];
        let declaracoes = [];
        this.consumir(mapler_1.default.VARIAVEIS, "Esperado expressão 'variaveis' para inicializar programa.");
        declaracoes = declaracoes.concat(this.validarSegmentoVariaveis());
        this.consumir(mapler_1.default.INICIO, `Esperado expressão 'inicio' para marcar o inicio do programa.`);
        while (!this.estaNoFinal() && this.simbolos[this.atual].tipo !== mapler_1.default.FIM) {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        }
        return {
            declaracoes: declaracoes.filter((d) => d),
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoMapler = AvaliadorSintaticoMapler;
//# sourceMappingURL=avaliador-sintatico-mapler.js.map