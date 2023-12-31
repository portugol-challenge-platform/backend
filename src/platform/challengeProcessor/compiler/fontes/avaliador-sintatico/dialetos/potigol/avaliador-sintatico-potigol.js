"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliadorSintaticoPotigol = void 0;
const construtos_1 = require("../../../construtos");
const declaracoes_1 = require("../../../declaracoes");
const avaliador_sintatico_base_1 = require("../../avaliador-sintatico-base");
const lexador_1 = require("../../../lexador");
const erro_avaliador_sintatico_1 = require("../../erro-avaliador-sintatico");
const potigol_1 = __importDefault(require("../../../tipos-de-simbolos/potigol"));
const tuplas_1 = require("../../../construtos/tuplas");
const micro_avaliador_sintatico_potigol_1 = require("./micro-avaliador-sintatico-potigol");
/**
 * TODO: Pensar numa forma de avaliar múltiplas constantes sem
 * transformar o retorno de `primario()` em um vetor.
 */
class AvaliadorSintaticoPotigol extends avaliador_sintatico_base_1.AvaliadorSintaticoBase {
    constructor() {
        super(...arguments);
        this.tiposPotigolParaDelegua = {
            Caractere: 'texto',
            Inteiro: 'numero',
            Logico: 'lógico',
            Lógico: 'lógico',
            Real: 'numero',
            Texto: 'texto',
            undefined: undefined,
        };
    }
    /**
     * Testa se o primeiro parâmetro na lista de símbolos
     * pertence a uma declaração ou não.
     * @param simbolos Os símbolos que fazem parte da lista de argumentos
     * de uma chamada ou declaração de função.
     * @returns `true` se parâmetros são de declaração. `false` caso contrário.
     */
    testePrimeiroParametro(simbolos) {
        let atual = 0;
        // Primeiro teste: literal ou identificador
        if ([potigol_1.default.INTEIRO, potigol_1.default.LOGICO, potigol_1.default.REAL, potigol_1.default.TEXTO].includes(simbolos[atual].tipo)) {
            return false;
        }
        // Segundo teste: vírgula imediatamente após identificador,
        // ou simplesmente fim da lista de símbolos.
        atual++;
        if (atual === simbolos.length || simbolos[atual].tipo === potigol_1.default.VIRGULA) {
            return false;
        }
        // Outros casos: dois-pontos após identificador, etc.
        return true;
    }
    /**
     * Retorna uma declaração de função iniciada por igual,
     * ou seja, com apenas uma instrução.
     * @param simboloPrimario O símbolo que identifica a função (nome).
     * @param parenteseEsquerdo O parêntese esquerdo, usado para fins de pragma.
     * @param parametros A lista de parâmetros da função.
     * @param tipoRetorno O tipo de retorno da função.
     * @returns Um construto do tipo `FuncaoDeclaracao`.
     */
    declaracaoFuncaoPotigolIniciadaPorIgual(simboloPrimario, parenteseEsquerdo, parametros, tipoRetorno) {
        const corpo = new construtos_1.FuncaoConstruto(simboloPrimario.hashArquivo, simboloPrimario.linha, parametros, [
            this.expressao(),
        ]);
        return new declaracoes_1.FuncaoDeclaracao(simboloPrimario, corpo, tipoRetorno);
    }
    /**
     * Retorna uma declaração de função terminada por fim,
     * ou seja, com mais de uma instrução.
     * @param simboloPrimario O símbolo que identifica a função (nome).
     * @param parenteseEsquerdo O parêntese esquerdo, usado para fins de pragma.
     * @param parametros A lista de parâmetros da função.
     * @param tipoRetorno O tipo de retorno da função.
     * @returns Um construto do tipo `FuncaoDeclaracao`.
     */
    declaracaoFuncaoPotigolTerminadaPorFim(simboloPrimario, parenteseEsquerdo, parametros, tipoRetorno) {
        const corpo = this.corpoDaFuncao(simboloPrimario.lexema, parenteseEsquerdo, parametros);
        return new declaracoes_1.FuncaoDeclaracao(simboloPrimario, corpo, tipoRetorno);
    }
    corpoDaFuncao(nomeFuncao, simboloPragma, parametros) {
        // this.consumir(tiposDeSimbolos.IGUAL, `Esperado '=' antes do escopo da função ${nomeFuncao}.`);
        const corpo = this.blocoEscopo();
        return new construtos_1.FuncaoConstruto(this.hashArquivo, Number(simboloPragma.linha), parametros, corpo);
    }
    declaracaoDeFuncaoOuMetodo(construtoPrimario) {
        // O parêntese esquerdo é considerado o símbolo inicial para
        // fins de pragma.
        const parenteseEsquerdo = this.avancarEDevolverAnterior();
        const simbolosEntreParenteses = [];
        while (!this.verificarTipoSimboloAtual(potigol_1.default.PARENTESE_DIREITO)) {
            simbolosEntreParenteses.push(this.avancarEDevolverAnterior());
        }
        const resolucaoParametros = this.logicaComumParametrosPotigol(simbolosEntreParenteses);
        const parenteseDireito = this.consumir(potigol_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        // Pode haver uma dica do tipo de retorno ou não.
        // Se houver, é uma declaração de função (verificado mais abaixo).
        let tipoRetorno = undefined;
        if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.DOIS_PONTOS)) {
            this.verificacaoTipo(this.simbolos[this.atual], 'Esperado tipo válido após dois-pontos como retorno de função.');
            tipoRetorno = this.simbolos[this.atual - 1];
        }
        // Se houver símbolo de igual, seja após fechamento de parênteses,
        // seja após a dica de retorno, é uma declaração de função.
        if (this.simbolos[this.atual].tipo === potigol_1.default.IGUAL) {
            this.avancarEDevolverAnterior();
            this.declaracoesAnteriores[construtoPrimario.simbolo.lexema] = [];
            return this.declaracaoFuncaoPotigolIniciadaPorIgual(construtoPrimario.simbolo, parenteseEsquerdo, resolucaoParametros.parametros, tipoRetorno);
        }
        return this.declaracaoFuncaoPotigolTerminadaPorFim(construtoPrimario.simbolo, parenteseEsquerdo, resolucaoParametros.parametros, tipoRetorno);
    }
    finalizarChamada(entidadeChamada) {
        // Parêntese esquerdo
        // this.avancarEDevolverAnterior();
        const simbolosEntreParenteses = [];
        while (!this.verificarTipoSimboloAtual(potigol_1.default.PARENTESE_DIREITO)) {
            simbolosEntreParenteses.push(this.avancarEDevolverAnterior());
        }
        const parenteseDireito = this.consumir(potigol_1.default.PARENTESE_DIREITO, "Esperado ')' após parâmetros.");
        const argumentos = this.microAvaliadorSintatico.analisar({ simbolos: simbolosEntreParenteses }, entidadeChamada.linha);
        return new construtos_1.Chamada(this.hashArquivo, entidadeChamada, parenteseDireito, argumentos.declaracoes.filter((d) => d));
    }
    /**
     * Verificação comum de tipos.
     * Avança o símbolo se não houver erros.
     * @param simbolo O símbolo sendo analisado.
     * @param mensagemErro A mensagem de erro caso o símbolo atual não seja de tipo.
     */
    verificacaoTipo(simbolo, mensagemErro) {
        if (![potigol_1.default.INTEIRO, potigol_1.default.LOGICO, potigol_1.default.REAL, potigol_1.default.TEXTO].includes(simbolo.tipo)) {
            throw this.erro(simbolo, mensagemErro);
        }
    }
    logicaComumParametrosPotigol(simbolos) {
        const parametros = [];
        let indice = 0;
        let tipagemDefinida = false;
        while (indice < simbolos.length) {
            if (parametros.length >= 255) {
                this.erro(simbolos[indice], 'Não pode haver mais de 255 parâmetros');
            }
            const parametro = {};
            // TODO: verificar se Potigol trabalha com número variável de parâmetros.
            /* if (this.simbolos[this.atual].tipo === tiposDeSimbolos.MULTIPLICACAO) {
                this.consumir(tiposDeSimbolos.MULTIPLICACAO, null);
                parametro.abrangencia = 'multiplo';
            } else {
                parametro.abrangencia = 'padrao';
            } */
            parametro.abrangencia = 'padrao';
            if (simbolos[indice].tipo !== potigol_1.default.IDENTIFICADOR) {
                throw this.erro(simbolos[indice], 'Esperado nome do parâmetro.');
            }
            parametro.nome = simbolos[indice];
            indice++;
            if (simbolos[indice].tipo === potigol_1.default.DOIS_PONTOS) {
                // throw this.erro(simbolos[indice], 'Esperado dois-pontos após nome de argumento para função.');
                indice++;
                this.verificacaoTipo(simbolos[indice], 'Esperado tipo do argumento após dois-pontos, em definição de função.');
                const tipoParametro = simbolos[indice];
                const resolucaoTipo = this.tiposPotigolParaDelegua[tipoParametro.lexema];
                parametro.tipoDado = {
                    nome: simbolos[indice - 2].lexema,
                    tipo: resolucaoTipo
                };
                tipagemDefinida = true;
            }
            // TODO: Verificar se Potigol trabalha com valores padrão em argumentos.
            /* if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.IGUAL)) {
                parametro.valorPadrao = this.primario();
            } */
            parametros.push(parametro);
            // if (parametro.abrangencia === 'multiplo') break;
            indice++;
            if (indice < simbolos.length && simbolos[indice].tipo !== potigol_1.default.VIRGULA) {
                throw this.erro(simbolos[indice], 'Esperado vírgula entre parâmetros de função.');
            }
            indice++;
        }
        return {
            parametros,
            tipagemDefinida,
        };
    }
    primario() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case potigol_1.default.PARENTESE_ESQUERDO:
                this.avancarEDevolverAnterior();
                const expressao = this.expressao();
                switch (this.simbolos[this.atual].tipo) {
                    case potigol_1.default.VIRGULA:
                        // Tupla
                        const argumentos = [expressao];
                        while (this.simbolos[this.atual].tipo === potigol_1.default.VIRGULA) {
                            this.avancarEDevolverAnterior();
                            argumentos.push(this.expressao());
                        }
                        this.consumir(potigol_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                        return new tuplas_1.SeletorTuplas(...argumentos);
                    default:
                        this.consumir(potigol_1.default.PARENTESE_DIREITO, "Esperado ')' após a expressão.");
                        return new construtos_1.Agrupamento(this.hashArquivo, Number(simboloAtual.linha), expressao);
                }
            case potigol_1.default.COLCHETE_ESQUERDO:
                this.avancarEDevolverAnterior();
                let valores = [];
                if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.COLCHETE_DIREITO)) {
                    return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), []);
                }
                while (!this.verificarSeSimboloAtualEIgualA(potigol_1.default.COLCHETE_DIREITO)) {
                    const valor = this.atribuir();
                    valores.push(valor);
                    if (this.simbolos[this.atual].tipo !== potigol_1.default.COLCHETE_DIREITO) {
                        this.consumir(potigol_1.default.VIRGULA, 'Esperado vírgula antes da próxima expressão.');
                    }
                }
                return new construtos_1.Vetor(this.hashArquivo, Number(simboloAtual.linha), valores);
            case potigol_1.default.CARACTERE:
            case potigol_1.default.INTEIRO:
            case potigol_1.default.LOGICO:
            case potigol_1.default.REAL:
            case potigol_1.default.TEXTO:
                const simboloLiteral = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloLiteral.linha), simboloLiteral.literal);
            case potigol_1.default.FALSO:
            case potigol_1.default.VERDADEIRO:
                const simboloVerdadeiroFalso = this.avancarEDevolverAnterior();
                return new construtos_1.Literal(this.hashArquivo, Number(simboloVerdadeiroFalso.linha), simboloVerdadeiroFalso.tipo === potigol_1.default.VERDADEIRO);
            case potigol_1.default.LEIA_INTEIRO:
            case potigol_1.default.LEIA_REAL:
            case potigol_1.default.LEIA_TEXTO:
                const simboloLeia = this.avancarEDevolverAnterior();
                return new declaracoes_1.Leia(simboloLeia, []);
            case potigol_1.default.LEIA_INTEIROS:
            case potigol_1.default.LEIA_REAIS:
            case potigol_1.default.LEIA_TEXTOS:
                const simboloLeiaDefinido = this.avancarEDevolverAnterior();
                this.consumir(potigol_1.default.PARENTESE_ESQUERDO, `Esperado parêntese esquerdo após ${simboloLeiaDefinido.lexema}.`);
                if (!this.verificarSeSimboloAtualEIgualA(potigol_1.default.INTEIRO, potigol_1.default.REAL)) {
                    throw this.erro(this.simbolos[this.atual], `Esperado número de argumentos como inteiro ou real em ${simboloLeiaDefinido.lexema}`);
                }
                let numeroArgumentosLeia = this.simbolos[this.atual - 1];
                this.consumir(potigol_1.default.PARENTESE_DIREITO, `Esperado parêntese direito após número de parâmetros em chamada de ${simboloLeiaDefinido.lexema}.`);
                const leiaDefinido = new declaracoes_1.LeiaMultiplo(simboloLeiaDefinido, []);
                leiaDefinido.numeroArgumentosEsperados = parseInt(numeroArgumentosLeia.literal);
                return leiaDefinido;
            default:
                const simboloIdentificador = this.avancarEDevolverAnterior();
                return new construtos_1.ConstanteOuVariavel(this.hashArquivo, simboloIdentificador);
        }
    }
    /**
     * Em Potigol, só é possível determinar a diferença entre uma chamada e uma
     * declaração de função depois dos argumentos.
     *
     * Chamadas não aceitam dicas de tipos de parâmetros.
     * @returns Um construto do tipo `AcessoMetodo`, `AcessoIndiceVariavel` ou `Constante`,
     * dependendo dos símbolos encontrados.
     */
    chamar() {
        let expressao = this.primario();
        while (true) {
            if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.PARENTESE_ESQUERDO)) {
                if (expressao instanceof construtos_1.ConstanteOuVariavel) {
                    expressao = new construtos_1.Constante(expressao.hashArquivo, expressao.simbolo);
                }
                expressao = this.finalizarChamada(expressao);
            }
            else if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.PONTO)) {
                const nome = this.consumir(potigol_1.default.IDENTIFICADOR, "Esperado nome do método após '.'.");
                const variavelMetodo = new construtos_1.Variavel(expressao.hashArquivo, expressao.simbolo);
                expressao = new construtos_1.AcessoMetodo(this.hashArquivo, variavelMetodo, nome);
            }
            else if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.COLCHETE_ESQUERDO)) {
                const indice = this.expressao();
                const simboloFechamento = this.consumir(potigol_1.default.COLCHETE_DIREITO, "Esperado ']' após escrita do indice.");
                const variavelVetor = new construtos_1.Variavel(expressao.hashArquivo, expressao.simbolo);
                expressao = new construtos_1.AcessoIndiceVariavel(this.hashArquivo, variavelVetor, indice, simboloFechamento);
            }
            else {
                if (expressao instanceof construtos_1.ConstanteOuVariavel) {
                    expressao = new construtos_1.Constante(expressao.hashArquivo, expressao.simbolo);
                }
                break;
            }
        }
        return expressao;
    }
    comparacaoIgualdade() {
        let expressao = this.comparar();
        while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.DIFERENTE, potigol_1.default.IGUAL_IGUAL)) {
            const operador = this.simbolos[this.atual - 1];
            const direito = this.comparar();
            expressao = new construtos_1.Binario(this.hashArquivo, expressao, operador, direito);
        }
        return expressao;
    }
    declaracaoEscreva() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.VIRGULA));
        return new declaracoes_1.Escreva(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    declaracaoImprima() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const argumentos = [];
        do {
            argumentos.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.VIRGULA));
        return new declaracoes_1.EscrevaMesmaLinha(Number(simboloAtual.linha), simboloAtual.hashArquivo, argumentos);
    }
    /**
     * Blocos de escopo em Potigol existem quando:
     *
     * - Em uma declaração de função ou método, após fecha parênteses, o próximo
     * símbolo obrigatório não é `=` e há pelo menos um `fim` até o final do código;
     * - Em uma declaração `se`;
     * - Em uma declaração `enquanto`;
     * - Em uma declaração `para`.
     * @returns Um vetor de `Declaracao`.
     */
    blocoEscopo() {
        let declaracoes = [];
        while (!this.estaNoFinal() && !this.verificarTipoSimboloAtual(potigol_1.default.FIM)) {
            const retornoDeclaracao = this.resolverDeclaracaoForaDeBloco();
            if (Array.isArray(retornoDeclaracao)) {
                declaracoes = declaracoes.concat(retornoDeclaracao);
            }
            else {
                declaracoes.push(retornoDeclaracao);
            }
        }
        return declaracoes;
    }
    declaracaoSe() {
        const simboloSe = this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        this.consumir(potigol_1.default.ENTAO, "Esperado palavra reservada 'entao' após condição em declaração 'se'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![potigol_1.default.SENAO, potigol_1.default.FIM].includes(this.simbolos[this.atual].tipo));
        let caminhoSenao = null;
        if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.SENAO)) {
            const simboloSenao = this.simbolos[this.atual - 1];
            const declaracoesSenao = [];
            do {
                declaracoesSenao.push(this.resolverDeclaracaoForaDeBloco());
            } while (![potigol_1.default.FIM].includes(this.simbolos[this.atual].tipo));
            caminhoSenao = new declaracoes_1.Bloco(this.hashArquivo, Number(simboloSenao.linha), declaracoesSenao.filter((d) => d));
        }
        this.consumir(potigol_1.default.FIM, "Esperado palavra-chave 'fim' para fechamento de declaração 'se'.");
        return new declaracoes_1.Se(condicao, new declaracoes_1.Bloco(this.hashArquivo, Number(simboloSe.linha), declaracoes.filter((d) => d)), [], caminhoSenao);
    }
    declaracaoEnquanto() {
        const simboloAtual = this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        this.consumir(potigol_1.default.FACA, "Esperado paravra reservada 'faca' após condição de continuidade em declaracão 'enquanto'.");
        const declaracoes = [];
        do {
            declaracoes.push(this.resolverDeclaracaoForaDeBloco());
        } while (![potigol_1.default.FIM].includes(this.simbolos[this.atual].tipo));
        this.consumir(potigol_1.default.FIM, "Esperado palavra-chave 'fim' para fechamento de declaração 'enquanto'.");
        return new declaracoes_1.Enquanto(condicao, new declaracoes_1.Bloco(simboloAtual.hashArquivo, Number(simboloAtual.linha), declaracoes.filter((d) => d)));
    }
    declaracaoPara() {
        const simboloPara = this.avancarEDevolverAnterior();
        const variavelIteracao = this.consumir(potigol_1.default.IDENTIFICADOR, "Esperado identificador de variável após 'para'.");
        this.consumir(potigol_1.default.DE, "Esperado palavra reservada 'de' após variável de controle de 'para'.");
        const literalOuVariavelInicio = this.adicaoOuSubtracao();
        this.consumir(potigol_1.default.ATE, "Esperado palavra reservada 'ate' após valor inicial do laço de repetição 'para'.");
        const literalOuVariavelFim = this.adicaoOuSubtracao();
        let operadorCondicao = new lexador_1.Simbolo(potigol_1.default.MENOR_IGUAL, '', '', Number(simboloPara.linha), this.hashArquivo);
        let operadorCondicaoIncremento = new lexador_1.Simbolo(potigol_1.default.MENOR, '', '', Number(simboloPara.linha), this.hashArquivo);
        // Isso existe porque o laço `para` do Potigol pode ter o passo positivo ou negativo
        // dependendo dos operandos de início e fim, que só são possíveis de determinar
        // em tempo de execução.
        // Quando um dos operandos é uma variável, tanto a condição do laço quanto o
        // passo são considerados indefinidos aqui.
        let passo;
        let resolverIncrementoEmExecucao = false;
        if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.PASSO)) {
            passo = this.unario();
        }
        else {
            if (literalOuVariavelInicio instanceof construtos_1.Literal && literalOuVariavelFim instanceof construtos_1.Literal) {
                if (literalOuVariavelInicio.valor > literalOuVariavelFim.valor) {
                    passo = new construtos_1.Unario(this.hashArquivo, new lexador_1.Simbolo(potigol_1.default.SUBTRACAO, '-', undefined, simboloPara.linha, simboloPara.hashArquivo), new construtos_1.Literal(this.hashArquivo, Number(simboloPara.linha), 1), 'ANTES');
                    operadorCondicao = new lexador_1.Simbolo(potigol_1.default.MAIOR_IGUAL, '', '', Number(simboloPara.linha), this.hashArquivo);
                    operadorCondicaoIncremento = new lexador_1.Simbolo(potigol_1.default.MAIOR, '', '', Number(simboloPara.linha), this.hashArquivo);
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
        this.consumir(potigol_1.default.FACA, "Esperado palavra reservada 'faca' após valor final do laço de repetição 'para'.");
        const declaracoesBlocoPara = [];
        let simboloAtualBlocoPara = this.simbolos[this.atual];
        while (simboloAtualBlocoPara.tipo !== potigol_1.default.FIM) {
            declaracoesBlocoPara.push(this.resolverDeclaracaoForaDeBloco());
            simboloAtualBlocoPara = this.simbolos[this.atual];
        }
        this.consumir(potigol_1.default.FIM, '');
        const corpo = new declaracoes_1.Bloco(this.hashArquivo, Number(simboloPara.linha) + 1, declaracoesBlocoPara.filter((d) => d));
        const para = new declaracoes_1.Para(this.hashArquivo, Number(simboloPara.linha), new construtos_1.Atribuir(this.hashArquivo, variavelIteracao, literalOuVariavelInicio), new construtos_1.Binario(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, variavelIteracao), operadorCondicao, literalOuVariavelFim), new construtos_1.FimPara(this.hashArquivo, Number(simboloPara.linha), new construtos_1.Binario(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, variavelIteracao), operadorCondicaoIncremento, literalOuVariavelFim), new declaracoes_1.Expressao(new construtos_1.Atribuir(this.hashArquivo, variavelIteracao, new construtos_1.Binario(this.hashArquivo, new construtos_1.Variavel(this.hashArquivo, variavelIteracao), new lexador_1.Simbolo(potigol_1.default.ADICAO, '', null, Number(simboloPara.linha), this.hashArquivo), passo)))), corpo);
        para.blocoPosExecucao = corpo;
        para.resolverIncrementoEmExecucao = resolverIncrementoEmExecucao;
        return para;
    }
    declaracaoEscolha() {
        this.avancarEDevolverAnterior();
        const condicao = this.expressao();
        const caminhos = [];
        let caminhoPadrao = null;
        while (!this.verificarSeSimboloAtualEIgualA(potigol_1.default.FIM)) {
            this.consumir(potigol_1.default.CASO, "Esperado palavra reservada 'caso' após condição de 'escolha'.");
            if (this.verificarSeSimboloAtualEIgualA(potigol_1.default.TRACO_BAIXO)) {
                // Caso padrão
                if (caminhoPadrao !== null) {
                    const excecao = new erro_avaliador_sintatico_1.ErroAvaliadorSintatico(this.simbolos[this.atual], "Você só pode ter um caminho padrão em cada declaração de 'escolha'.");
                    this.erros.push(excecao);
                    throw excecao;
                }
                this.consumir(potigol_1.default.SETA, "Esperado '=>' após palavra reservada 'caso'.");
                const declaracoesPadrao = [this.resolverDeclaracaoForaDeBloco()];
                // TODO: Verificar se Potigol admite bloco de escopo para `escolha`.
                /* const declaracoesPadrao = [];
                do {
                    declaracoesPadrao.push(this.declaracao());
                } while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.CASO, tiposDeSimbolos.FIM)); */
                caminhoPadrao = {
                    declaracoes: declaracoesPadrao,
                };
                continue;
            }
            const caminhoCondicoes = [this.expressao()];
            this.consumir(potigol_1.default.SETA, "Esperado '=>' após palavra reservada 'caso'.");
            const declaracoes = [this.resolverDeclaracaoForaDeBloco()];
            // TODO: Verificar se Potigol admite bloco de escopo para `escolha`.
            /* const declaracoes = [];
            do {
                declaracoes.push(this.declaracao());
            } while (!this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.CASO, tiposDeSimbolos.FIM)); */
            caminhos.push({
                condicoes: caminhoCondicoes,
                declaracoes,
            });
        }
        return new declaracoes_1.Escolha(condicao, caminhos, caminhoPadrao);
    }
    declaracaoDeConstantes() {
        const identificadores = [];
        let tipo = null;
        do {
            identificadores.push(this.consumir(potigol_1.default.IDENTIFICADOR, 'Esperado nome da constante.'));
        } while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.VIRGULA));
        /* if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.DOIS_PONTOS)) {
            const tipoConstante = this.verificarDefinicaoTipoAtual();
            if (!tipoConstante) {
                throw this.erro(this.simboloAtual(), 'Tipo definido na constante não é válido.');
            }
            tipo = tipoConstante;
            this.avancarEDevolverAnterior();
        } */
        this.consumir(potigol_1.default.IGUAL, "Esperado '=' após identificador em instrução 'constante'.");
        const inicializadores = [];
        do {
            let inicializador = this.expressao();
            if (inicializador instanceof declaracoes_1.Leia && identificadores.length > 1) {
                inicializador = new declaracoes_1.LeiaMultiplo(inicializador.simbolo, inicializador.argumentos, inicializador.numeroArgumentosEsperados);
            }
            inicializadores.push(inicializador);
        } while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.VIRGULA));
        if (identificadores.length !== inicializadores.length) {
            // Pode ser que a inicialização seja feita por uma das
            // funções `leia`, que podem ler vários valores. Neste caso, não deve dar erro.
            if (!(inicializadores.length === 1 && inicializadores[0] instanceof declaracoes_1.LeiaMultiplo)) {
                throw this.erro(this.simbolos[this.atual], 'Quantidade de identificadores à esquerda do igual é diferente da quantidade de valores à direita.');
            }
            // `leia_inteiros`, `leia_reais` e `leia_textos` pedem um inteiro como argumento,
            // que pode ser usado para verificar se a expressão faz sentido ou não aqui.
            const inicializadorLeia = inicializadores[0];
            if (inicializadorLeia.numeroArgumentosEsperados > 0) {
                if (identificadores.length !== inicializadorLeia.numeroArgumentosEsperados) {
                    throw this.erro(this.simbolos[this.atual], `Quantidade de identificadores à esquerda do igual é diferente da quantidade de valores passada por parâmetro à direita em ${inicializadorLeia.simbolo.lexema}.`);
                }
            }
            let tipoConversao;
            switch (inicializadorLeia.simbolo.tipo) {
                case potigol_1.default.LEIA_INTEIROS:
                    tipoConversao = 'inteiro[]';
                    break;
                case potigol_1.default.LEIA_INTEIRO:
                    tipoConversao = 'inteiro';
                    break;
                case potigol_1.default.LEIA_REAL:
                case potigol_1.default.LEIA_REAIS:
                    tipoConversao = 'real';
                    break;
                default:
                    tipoConversao = 'texto';
                    break;
            }
            return new declaracoes_1.ConstMultiplo(identificadores, inicializadores[0], tipoConversao);
        }
        let retorno = [];
        for (let [indice, identificador] of identificadores.entries()) {
            // const inicializador = inicializadores[indice];
            // this.verificarTipoAtribuido(tipo, inicializador);
            retorno.push(new declaracoes_1.Const(identificador, inicializadores[indice], tipo));
        }
        // this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.PONTO_E_VIRGULA);
        return retorno;
    }
    declaracaoDeVariaveis() {
        const simboloVar = this.avancarEDevolverAnterior();
        const identificadores = [];
        do {
            identificadores.push(this.consumir(potigol_1.default.IDENTIFICADOR, 'Esperado nome de variável.'));
        } while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.VIRGULA));
        this.consumir(potigol_1.default.REATRIBUIR, "Esperado ':=' após identificador em instrução 'var'.");
        const inicializadores = [];
        do {
            inicializadores.push(this.expressao());
        } while (this.verificarSeSimboloAtualEIgualA(potigol_1.default.VIRGULA));
        if (identificadores.length !== inicializadores.length) {
            throw this.erro(simboloVar, 'Quantidade de identificadores à esquerda do igual é diferente da quantidade de valores à direita.');
        }
        const retorno = [];
        for (let [indice, identificador] of identificadores.entries()) {
            retorno.push(new declaracoes_1.Var(identificador, inicializadores[indice]));
        }
        return retorno;
    }
    logicaAtribuicaoComDicaDeTipo(expressao) {
        // A dica de tipo é opcional.
        // Só que, se a avaliação entra na dica, só
        // podemos ter uma constante apenas.
        this.avancarEDevolverAnterior();
        if (![
            potigol_1.default.CARACTERE,
            potigol_1.default.INTEIRO,
            potigol_1.default.LOGICO,
            potigol_1.default.REAL,
            potigol_1.default.TEXTO,
        ].includes(this.simbolos[this.atual].tipo)) {
            throw this.erro(this.simbolos[this.atual], 'Esperado tipo após dois-pontos e nome de identificador.');
        }
        const tipoVariavel = this.avancarEDevolverAnterior();
        const valorAtribuicaoConstante = this.ou();
        return new declaracoes_1.Const(expressao.simbolo, valorAtribuicaoConstante, this.tiposPotigolParaDelegua[tipoVariavel.lexema]);
    }
    declaracaoFazer() {
        throw new Error('Método não implementado.');
    }
    /**
     * Uma declaração de tipo nada mais é do que um declaração de classe.
     * Em Potigol, classe e tipo são praticamente a mesma coisa.
     *
     * @returns Um construto do tipo `Classe`.
     */
    declaracaoTipo() {
        const simboloTipo = this.avancarEDevolverAnterior();
        const construto = this.primario();
        // TODO: Verificar se Potigol trabalha com herança.
        /* let superClasse = null;
        if (this.verificarSeSimboloAtualEIgualA(tiposDeSimbolos.HERDA)) {
            this.consumir(tiposDeSimbolos.IDENTIFICADOR, 'Esperado nome da Superclasse.');
            superClasse = new Variavel(this.hashArquivo, this.simbolos[this.atual - 1]);
        } */
        const metodos = [];
        const propriedades = [];
        while (!this.verificarTipoSimboloAtual(potigol_1.default.FIM) && !this.estaNoFinal()) {
            const identificador = this.consumir(potigol_1.default.IDENTIFICADOR, 'Esperado nome de propriedade ou método.');
            if (this.simbolos[this.atual].tipo === potigol_1.default.PARENTESE_ESQUERDO) {
                // Método
                const construtoMetodo = new construtos_1.Constante(identificador.hashArquivo, identificador);
                metodos.push(this.declaracaoDeFuncaoOuMetodo(construtoMetodo));
            }
            else {
                // Propriedade
                this.consumir(potigol_1.default.DOIS_PONTOS, 'Esperado dois-pontos após nome de propriedade em declaração de tipo.');
                this.verificacaoTipo(this.simbolos[this.atual], 'Esperado tipo do argumento após dois-pontos, em definição de função.');
                const tipoPropriedade = this.avancarEDevolverAnterior();
                propriedades.push(new declaracoes_1.PropriedadeClasse(identificador, this.tiposPotigolParaDelegua[tipoPropriedade.lexema]));
            }
        }
        this.consumir(potigol_1.default.FIM, "Esperado 'fim' após o escopo do tipo.");
        // Depois de verificadas todas as propriedades anotadas com tipo,
        // Precisamos gerar um construtor com todas elas na ordem em que
        // foram lidas.
        const instrucoesConstrutor = [];
        for (let propriedade of propriedades) {
            instrucoesConstrutor.push(new declaracoes_1.Expressao(new construtos_1.DefinirValor(propriedade.hashArquivo, propriedade.linha, new construtos_1.Isto(propriedade.hashArquivo, propriedade.linha, new lexador_1.Simbolo(potigol_1.default.ISTO, 'isto', undefined, simboloTipo.linha, simboloTipo.hashArquivo)), propriedade.nome, new construtos_1.Variavel(propriedade.hashArquivo, propriedade.nome))));
        }
        const construtorConstruto = new construtos_1.FuncaoConstruto(simboloTipo.hashArquivo, simboloTipo.linha, propriedades.map((p) => ({
            abrangencia: 'padrao',
            nome: p.nome,
        })), instrucoesConstrutor);
        const construtor = new declaracoes_1.FuncaoDeclaracao(new lexador_1.Simbolo(potigol_1.default.CONSTRUTOR, 'construtor', undefined, simboloTipo.hashArquivo, simboloTipo.linha), construtorConstruto, undefined);
        metodos.unshift(construtor);
        return new declaracoes_1.Classe(construto.simbolo, undefined, metodos, propriedades);
    }
    atribuir() {
        const expressao = this.ou();
        if (!this.estaNoFinal() && expressao instanceof construtos_1.Constante) {
            // Atribuição constante.
            switch (this.simbolos[this.atual].tipo) {
                case potigol_1.default.DOIS_PONTOS:
                    return this.logicaAtribuicaoComDicaDeTipo(expressao);
                case potigol_1.default.VIRGULA:
                    this.atual--;
                    return this.declaracaoDeConstantes();
                case potigol_1.default.IGUAL:
                    this.avancarEDevolverAnterior();
                    const valorAtribuicao = this.ou();
                    return new declaracoes_1.Const(expressao.simbolo, valorAtribuicao);
            }
        }
        return expressao;
    }
    /**
     * Em Potigol, uma definição de função normalmente começa com um
     * identificador - que não é uma palavra reservada - seguido de parênteses.
     * Este ponto de entrada verifica o símbolo atual e o próximo.
     *
     * Diferentemente dos demais dialetos, verificamos logo de cara se
     * temos uma definição ou chamada de função, isto porque definições
     * nunca aparecem do lado direito de uma atribuição, a não ser que
     * estejam entre parênteses (_currying_).
     *
     * Se o próximo símbolo for parênteses, ou é uma definiçao de função,
     * ou uma chamada de função.
     */
    expressaoOuDefinicaoFuncao() {
        if (!this.estaNoFinal() && this.simbolos[this.atual].tipo === potigol_1.default.IDENTIFICADOR) {
            if (this.atual + 1 < this.simbolos.length) {
                switch (this.simbolos[this.atual + 1].tipo) {
                    case potigol_1.default.PARENTESE_ESQUERDO:
                        const construtoPrimario = this.primario();
                        return this.declaracaoDeFuncaoOuMetodo(construtoPrimario);
                }
            }
        }
        return this.atribuir();
    }
    resolverDeclaracaoForaDeBloco() {
        const simboloAtual = this.simbolos[this.atual];
        switch (simboloAtual.tipo) {
            case potigol_1.default.ENQUANTO:
                return this.declaracaoEnquanto();
            case potigol_1.default.ESCOLHA:
                return this.declaracaoEscolha();
            case potigol_1.default.ESCREVA:
                return this.declaracaoEscreva();
            case potigol_1.default.IMPRIMA:
                return this.declaracaoImprima();
            case potigol_1.default.PARA:
                return this.declaracaoPara();
            case potigol_1.default.SE:
                return this.declaracaoSe();
            case potigol_1.default.TIPO:
                return this.declaracaoTipo();
            case potigol_1.default.VARIAVEL:
                return this.declaracaoDeVariaveis();
            default:
                return this.expressaoOuDefinicaoFuncao();
        }
    }
    analisar(retornoLexador, hashArquivo) {
        this.microAvaliadorSintatico = new micro_avaliador_sintatico_potigol_1.MicroAvaliadorSintaticoPotigol(hashArquivo);
        this.erros = [];
        this.atual = 0;
        this.blocos = 0;
        this.declaracoesAnteriores = {};
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
        return {
            declaracoes: declaracoes,
            erros: this.erros,
        };
    }
}
exports.AvaliadorSintaticoPotigol = AvaliadorSintaticoPotigol;
//# sourceMappingURL=avaliador-sintatico-potigol.js.map